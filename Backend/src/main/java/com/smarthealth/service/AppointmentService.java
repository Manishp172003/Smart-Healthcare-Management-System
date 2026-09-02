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

    public AppointmentService(
            AppointmentRepository appointmentRepository,
            PatientRepository patientRepository,
            DoctorRepository doctorRepository
    ) {
        this.appointmentRepository = appointmentRepository;
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
    }

    @Transactional
    public Appointment bookAppointment(AppointmentRequest request) {
        // 1. Fetch Patient details
        Patient patient = patientRepository.findByUserId(request.getPatientUserId())
                .orElseThrow(() -> new RuntimeException("Error: Patient details not found for User ID: " + request.getPatientUserId()));

        // 2. Fetch Doctor details
        Doctor doctor = doctorRepository.findById(request.getDoctorId())
                .orElseThrow(() -> new RuntimeException("Error: Doctor not found with ID: " + request.getDoctorId()));

        // 3. Validate appointment type against doctor's capabilities
        if ("telehealth".equalsIgnoreCase(request.getAppointmentType()) && !Boolean.TRUE.equals(doctor.getSupportsTelehealth())) {
            throw new RuntimeException("Error: This doctor does not support telehealth appointments.");
        }

        // 4. Acquire Pessimistic Write Lock & Check for conflicting bookings
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

        // 6. Build and save the appointment
        Appointment appointment = Appointment.builder()
                .patient(patient)
                .doctor(doctor)
                .appointmentDate(request.getAppointmentDate())
                .startTime(request.getStartTime())
                .endTime(endTime)
                .status(AppointmentStatus.PENDING)
                .reason(request.getReason())
                .appointmentType(request.getAppointmentType())
                .build();

        return appointmentRepository.save(appointment);
    }

    @Transactional(readOnly = true)
    public List<Appointment> getPatientAppointments(Long userId) {
        Patient patient = patientRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Error: Patient not found!"));
        return appointmentRepository.findByPatientId(patient.getId());
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
}
