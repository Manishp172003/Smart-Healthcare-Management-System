package com.smarthealth.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "doctors")
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String specialization;

    @Column(name = "license_number", unique = true, nullable = false)
    private String licenseNumber;

    @Column(columnDefinition = "TEXT")
    private String bio;

    @Column(name = "slot_duration_minutes")
    private Integer slotDurationMinutes = 30;

    // Constructors
    public Doctor() {
    }

    public Doctor(Long id, User user, String specialization, String licenseNumber, String bio, Integer slotDurationMinutes) {
        this.id = id;
        this.user = user;
        this.specialization = specialization;
        this.licenseNumber = licenseNumber;
        this.bio = bio;
        this.slotDurationMinutes = slotDurationMinutes;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getSpecialization() { return specialization; }
    public void setSpecialization(String specialization) { this.specialization = specialization; }

    public String getLicenseNumber() { return licenseNumber; }
    public void setLicenseNumber(String licenseNumber) { this.licenseNumber = licenseNumber; }

    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }

    public Integer getSlotDurationMinutes() { return slotDurationMinutes; }
    public void setSlotDurationMinutes(Integer slotDurationMinutes) { this.slotDurationMinutes = slotDurationMinutes; }

    // Custom Builder
    public static DoctorBuilder builder() {
        return new DoctorBuilder();
    }

    public static class DoctorBuilder {
        private User user;
        private String specialization;
        private String licenseNumber;
        private String bio;
        private Integer slotDurationMinutes = 30;

        public DoctorBuilder user(User user) { this.user = user; return this; }
        public DoctorBuilder specialization(String specialization) { this.specialization = specialization; return this; }
        public DoctorBuilder licenseNumber(String licenseNumber) { this.licenseNumber = licenseNumber; return this; }
        public DoctorBuilder bio(String bio) { this.bio = bio; return this; }
        public DoctorBuilder slotDurationMinutes(Integer slotDurationMinutes) { this.slotDurationMinutes = slotDurationMinutes; return this; }

        public Doctor build() {
            return new Doctor(null, user, specialization, licenseNumber, bio, slotDurationMinutes);
        }
    }
}
