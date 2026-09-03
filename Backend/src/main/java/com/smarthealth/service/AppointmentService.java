package com.smarthealth.service;

import com.smarthealth.dto.AppointmentRequest;
import com.smarthealth.entity.Appointment;
import com.smarthealth.entity.AppointmentStatus;
import com.smarthealth.entity.Doctor;
import com.smarthealth.entity.Patient;
import com.smarthealth.repository.AppointmentRepository;
import com.smarthealth.repository.DoctorRepository;
import com.smarthealth.repository.PatientRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final com.smarthealth.repository.UserRepository userRepository;

    public AppointmentService(
            AppointmentRepository appointmentRepository,
            PatientRepository patientRepository,
            DoctorRepository doctorRepository,
            com.smarthealth.repository.UserRepository userRepository
    ) {
        this.appointmentRepository = appointmentRepository;
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public Appointment bookAppointment(AppointmentRequest request) {
        // 1. Fetch Patient details (or auto-create if patient record does not exist yet)
        Patient patient = patientRepository.findByUserId(request.getPatientUserId())
                .orElseGet(() -> {
                    com.smarthealth.entity.User user = userRepository.findById(request.getPatientUserId())
                            .orElseThrow(() -> new RuntimeException("Error: User not found for ID: " + request.getPatientUserId()));
                    Patient newPatient = new Patient();
                    newPatient.setUser(user);
                    return patientRepository.save(newPatient);
                });

        // 2. Fetch Doctor details
        Doctor doctor = doctorRepository.findById(request.getDoctorId())
                .orElseThrow(() -> new RuntimeException("Error: Doctor not found with ID: " + request.getDoctorId()));

        // 3. Validate appointment type against doctor's capabilities
        if ("telehealth".equalsIgnoreCase(request.getAppointmentType()) && !Boolean.TRUE.equals(doctor.getSupportsTelehealth())) {
            throw new RuntimeException("Error: This doctor does not support telehealth appointments.");
        }

        // 4. Validate Clinical Operating Hours: 08:30 AM to 08:00 PM (Prevent night 2:00 AM bookings)
        LocalTime openingTime = LocalTime.of(8, 30);
        LocalTime closingTime = LocalTime.of(20, 0);
        if (request.getStartTime().isBefore(openingTime) || request.getStartTime().isAfter(closingTime)) {
            throw new RuntimeException("Error: Appointments can only be booked during clinical operating hours (08:30 AM to 08:00 PM). Night hours (08:00 PM to 08:30 AM) are strictly reserved for Emergency SOS.");
        }

        // 5. Acquire Pessimistic Write Lock & Check for conflicting bookings
        Optional<Appointment> conflicting = appointmentRepository.findConflictingAppointmentWithLock(
                request.getDoctorId(),
                request.getAppointmentDate(),
                request.getStartTime()
        );

        if (conflicting.isPresent()) {
            throw new RuntimeException("Conflict Error: This doctor slot is already booked. Please choose another time!");
        }

        // 5. Compute end time based on doctor's slot duration
        LocalTime endTime = request.getStartTime().plusMinutes(doctor.getSlotDurationMinutes());

        // 6. Build and save the appointment with payment details
        String paymentMethod = request.getPaymentMethod() != null ? request.getPaymentMethod() : "PAY_AT_CLINIC";
        String paymentStatus = "PAY_AT_CLINIC".equalsIgnoreCase(paymentMethod) ? "PAY_ON_ARRIVAL" : "PAID";
        Double amount = request.getAmountPaid() != null ? request.getAmountPaid() : (doctor.getConsultationFee() != null ? doctor.getConsultationFee().doubleValue() : 1500.0);
        String txnId = request.getTransactionId() != null ? request.getTransactionId() : ("TXN-" + System.currentTimeMillis());

        Appointment appointment = Appointment.builder()
                .patient(patient)
                .doctor(doctor)
                .appointmentDate(request.getAppointmentDate())
                .startTime(request.getStartTime())
                .endTime(endTime)
                .status(AppointmentStatus.PENDING)
                .reason(request.getReason())
                .appointmentType(request.getAppointmentType())
                .paymentMethod(paymentMethod)
                .paymentStatus(paymentStatus)
                .amountPaid(amount)
                .transactionId(txnId)
                .build();

        return appointmentRepository.save(appointment);
    }

    @Transactional(readOnly = true)
    public List<Appointment> getPatientAppointments(Long userId) {
        Optional<Patient> patient = patientRepository.findByUserId(userId);
        if (patient.isEmpty()) {
            return java.util.Collections.emptyList();
        }
        return appointmentRepository.findByPatientId(patient.get().getId());
    }

    @Transactional(readOnly = true)
    public List<Appointment> getDoctorAppointments(Long userId) {
        Doctor doctor = doctorRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Error: Doctor not found!"));
        return appointmentRepository.findByDoctorId(doctor.getId());
    }

    @Transactional(readOnly = true)
    public List<Appointment> getAppointmentsByDoctorId(Long doctorId) {
        return appointmentRepository.findByDoctorId(doctorId);
    }

    @Transactional
    public Appointment updateAppointmentStatus(Long appointmentId, AppointmentStatus status) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Error: Appointment not found!"));
        appointment.setStatus(status);
        return appointmentRepository.save(appointment);
    }

    @Transactional
    public Appointment rescheduleAppointment(Long id, java.time.LocalDate newDate, java.time.LocalTime newTime) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found with ID: " + id));

        // Clinical Operating Hours Validation: 08:30 AM to 08:00 PM
        LocalTime openingTime = LocalTime.of(8, 30);
        LocalTime closingTime = LocalTime.of(20, 0);
        if (newTime.isBefore(openingTime) || newTime.isAfter(closingTime)) {
            throw new RuntimeException("Error: Appointments can only be scheduled during clinical operating hours (08:30 AM to 08:00 PM). Night hours (08:00 PM to 08:30 AM) are strictly reserved for Emergency SOS.");
        }

        // Conflict check
        Optional<Appointment> conflicting = appointmentRepository.findConflictingAppointmentWithLock(
                appointment.getDoctor().getId(),
                newDate,
                newTime
        );
        if (conflicting.isPresent() && !conflicting.get().getId().equals(id)) {
            throw new RuntimeException("Conflict Error: This doctor slot is already booked for " + newTime + ". Please choose another slot.");
        }

        appointment.setAppointmentDate(newDate);
        appointment.setStartTime(newTime);
        appointment.setEndTime(newTime.plusMinutes(appointment.getDoctor().getSlotDurationMinutes()));
        appointment.setStatus(AppointmentStatus.PENDING); // Reset to pending for doctor review

        return appointmentRepository.save(appointment);
    }

    @Transactional(readOnly = true)
    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }
}
