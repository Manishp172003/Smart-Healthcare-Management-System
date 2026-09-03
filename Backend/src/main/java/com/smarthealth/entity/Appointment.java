package com.smarthealth.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.LocalDateTime;

@Entity
@Table(
    name = "appointments",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = {"doctor_id", "appointment_date", "start_time"})
    }
)
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id", nullable = false)
    private Doctor doctor;

    @Column(name = "appointment_date", nullable = false)
    private LocalDate appointmentDate;

    @Column(name = "start_time", nullable = false)
    private LocalTime startTime;

    @Column(name = "end_time", nullable = false)
    private LocalTime endTime;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AppointmentStatus status = AppointmentStatus.PENDING;

    @Column(name = "reason", columnDefinition = "TEXT")
    private String reason;

    @Column(name = "appointment_type", columnDefinition = "VARCHAR(20)")
    private String appointmentType;

    @Column(name = "payment_method", columnDefinition = "VARCHAR(30)")
    private String paymentMethod; // "UPI", "CARD", "NET_BANKING", "PAY_AT_CLINIC"

    @Column(name = "payment_status", columnDefinition = "VARCHAR(30)")
    private String paymentStatus; // "PAID", "PAY_ON_ARRIVAL"

    @Column(name = "amount_paid")
    private Double amountPaid;

    @Column(name = "transaction_id", columnDefinition = "VARCHAR(80)")
    private String transactionId;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Constructors
    public Appointment() {
    }

    public Appointment(Long id, Patient patient, Doctor doctor, LocalDate appointmentDate, LocalTime startTime, LocalTime endTime, AppointmentStatus status, String reason, String appointmentType, String paymentMethod, String paymentStatus, Double amountPaid, String transactionId, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.patient = patient;
        this.doctor = doctor;
        this.appointmentDate = appointmentDate;
        this.startTime = startTime;
        this.endTime = endTime;
        this.status = status;
        this.reason = reason;
        this.appointmentType = appointmentType;
        this.paymentMethod = paymentMethod;
        this.paymentStatus = paymentStatus;
        this.amountPaid = amountPaid;
        this.transactionId = transactionId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Patient getPatient() { return patient; }
    public void setPatient(Patient patient) { this.patient = patient; }

    public Doctor getDoctor() { return doctor; }
    public void setDoctor(Doctor doctor) { this.doctor = doctor; }

    public LocalDate getAppointmentDate() { return appointmentDate; }
    public void setAppointmentDate(LocalDate appointmentDate) { this.appointmentDate = appointmentDate; }

    public LocalTime getStartTime() { return startTime; }
    public void setStartTime(LocalTime startTime) { this.startTime = startTime; }

    public LocalTime getEndTime() { return endTime; }
    public void setEndTime(LocalTime endTime) { this.endTime = endTime; }

    public AppointmentStatus getStatus() { return status; }
    public void setStatus(AppointmentStatus status) { this.status = status; }

    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }

    public String getAppointmentType() { return appointmentType; }
    public void setAppointmentType(String appointmentType) { this.appointmentType = appointmentType; }

    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }

    public String getPaymentStatus() { return paymentStatus; }
    public void setPaymentStatus(String paymentStatus) { this.paymentStatus = paymentStatus; }

    public Double getAmountPaid() { return amountPaid; }
    public void setAmountPaid(Double amountPaid) { this.amountPaid = amountPaid; }

    public String getTransactionId() { return transactionId; }
    public void setTransactionId(String transactionId) { this.transactionId = transactionId; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    // Custom Builder
    public static AppointmentBuilder builder() {
        return new AppointmentBuilder();
    }

    public static class AppointmentBuilder {
        private Patient patient;
        private Doctor doctor;
        private LocalDate appointmentDate;
        private LocalTime startTime;
        private LocalTime endTime;
        private AppointmentStatus status = AppointmentStatus.PENDING;
        private String reason;
        private String appointmentType;
        private String paymentMethod = "PAY_AT_CLINIC";
        private String paymentStatus = "PAY_ON_ARRIVAL";
        private Double amountPaid = 0.0;
        private String transactionId;

        public AppointmentBuilder patient(Patient patient) { this.patient = patient; return this; }
        public AppointmentBuilder doctor(Doctor doctor) { this.doctor = doctor; return this; }
        public AppointmentBuilder appointmentDate(LocalDate appointmentDate) { this.appointmentDate = appointmentDate; return this; }
        public AppointmentBuilder startTime(LocalTime startTime) { this.startTime = startTime; return this; }
        public AppointmentBuilder endTime(LocalTime endTime) { this.endTime = endTime; return this; }
        public AppointmentBuilder status(AppointmentStatus status) { this.status = status; return this; }
        public AppointmentBuilder reason(String reason) { this.reason = reason; return this; }
        public AppointmentBuilder appointmentType(String appointmentType) { this.appointmentType = appointmentType; return this; }
        public AppointmentBuilder paymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; return this; }
        public AppointmentBuilder paymentStatus(String paymentStatus) { this.paymentStatus = paymentStatus; return this; }
        public AppointmentBuilder amountPaid(Double amountPaid) { this.amountPaid = amountPaid; return this; }
        public AppointmentBuilder transactionId(String transactionId) { this.transactionId = transactionId; return this; }

        public Appointment build() {
            return new Appointment(null, patient, doctor, appointmentDate, startTime, endTime, status, reason, appointmentType, paymentMethod, paymentStatus, amountPaid, transactionId, null, null);
        }
    }
}
