package com.smarthealth.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "patient_favorite_doctors")
public class PatientFavoriteDoctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id", nullable = false)
    private Doctor doctor;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    // Constructors
    public PatientFavoriteDoctor() {
    }

    public PatientFavoriteDoctor(Long id, Patient patient, Doctor doctor, LocalDateTime createdAt) {
        this.id = id;
        this.patient = patient;
        this.doctor = doctor;
        this.createdAt = createdAt;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Patient getPatient() { return patient; }
    public void setPatient(Patient patient) { this.patient = patient; }

    public Doctor getDoctor() { return doctor; }
    public void setDoctor(Doctor doctor) { this.doctor = doctor; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    // Custom Builder
    public static PatientFavoriteDoctorBuilder builder() {
        return new PatientFavoriteDoctorBuilder();
    }

    public static class PatientFavoriteDoctorBuilder {
        private Patient patient;
        private Doctor doctor;

        public PatientFavoriteDoctorBuilder patient(Patient patient) { this.patient = patient; return this; }
        public PatientFavoriteDoctorBuilder doctor(Doctor doctor) { this.doctor = doctor; return this; }

        public PatientFavoriteDoctor build() {
            return new PatientFavoriteDoctor(null, patient, doctor, null);
        }
    }
}