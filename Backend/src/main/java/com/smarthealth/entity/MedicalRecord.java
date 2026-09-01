package com.smarthealth.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "medical_records")
public class MedicalRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id", nullable = false)
    private Doctor doctor;

    @Column(name = "record_date", nullable = false)
    private LocalDate recordDate;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String diagnosis;

    @Column(columnDefinition = "TEXT")
    private String prescription;

    @Column(name = "file_url")
    private String fileUrl;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    // Constructors
    public MedicalRecord() {
    }

    public MedicalRecord(Long id, Patient patient, Doctor doctor, LocalDate recordDate, String diagnosis, String prescription, String fileUrl, LocalDateTime createdAt) {
        this.id = id;
        this.patient = patient;
        this.doctor = doctor;
        this.recordDate = recordDate;
        this.diagnosis = diagnosis;
        this.prescription = prescription;
        this.fileUrl = fileUrl;
        this.createdAt = createdAt;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Patient getPatient() { return patient; }
    public void setPatient(Patient patient) { this.patient = patient; }

    public Doctor getDoctor() { return doctor; }
    public void setDoctor(Doctor doctor) { this.doctor = doctor; }

    public LocalDate getRecordDate() { return recordDate; }
    public void setRecordDate(LocalDate recordDate) { this.recordDate = recordDate; }

    public String getDiagnosis() { return diagnosis; }
    public void setDiagnosis(String diagnosis) { this.diagnosis = diagnosis; }

    public String getPrescription() { return prescription; }
    public void setPrescription(String prescription) { this.prescription = prescription; }

    public String getFileUrl() { return fileUrl; }
    public void setFileUrl(String fileUrl) { this.fileUrl = fileUrl; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    // Custom Builder
    public static MedicalRecordBuilder builder() {
        return new MedicalRecordBuilder();
    }

    public static class MedicalRecordBuilder {
        private Patient patient;
        private Doctor doctor;
        private LocalDate recordDate;
        private String diagnosis;
        private String prescription;
        private String fileUrl;

        public MedicalRecordBuilder patient(Patient patient) { this.patient = patient; return this; }
        public MedicalRecordBuilder doctor(Doctor doctor) { this.doctor = doctor; return this; }
        public MedicalRecordBuilder recordDate(LocalDate recordDate) { this.recordDate = recordDate; return this; }
        public MedicalRecordBuilder diagnosis(String diagnosis) { this.diagnosis = diagnosis; return this; }
        public MedicalRecordBuilder prescription(String prescription) { this.prescription = prescription; return this; }
        public MedicalRecordBuilder fileUrl(String fileUrl) { this.fileUrl = fileUrl; return this; }

        public MedicalRecord build() {
            return new MedicalRecord(null, patient, doctor, recordDate, diagnosis, prescription, fileUrl, null);
        }
    }
}
