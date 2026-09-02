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

    @Column(name = "consultation_fee")
    private Integer consultationFee = 500;

    @Column(name = "rating")
    private Double rating = 4.5;

    @Column(name = "avatar")
    private String avatar;

    @Column(name = "supports_telehealth")
    private Boolean supportsTelehealth = true;

    @Column(name = "education", columnDefinition = "VARCHAR(255)")
    private String education;

    @Column(name = "experience", columnDefinition = "VARCHAR(100)")
    private String experience;

    // Constructors
    public Doctor() {
    }

    public Doctor(Long id, User user, String specialization, String licenseNumber, String bio, Integer slotDurationMinutes, Integer consultationFee, Double rating, String avatar, Boolean supportsTelehealth, String education, String experience) {
        this.id = id;
        this.user = user;
        this.specialization = specialization;
        this.licenseNumber = licenseNumber;
        this.bio = bio;
        this.slotDurationMinutes = slotDurationMinutes;
        this.consultationFee = consultationFee;
        this.rating = rating;
        this.avatar = avatar;
        this.supportsTelehealth = supportsTelehealth;
        this.education = education;
        this.experience = experience;
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

    public Integer getConsultationFee() { return consultationFee; }
    public void setConsultationFee(Integer consultationFee) { this.consultationFee = consultationFee; }

    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }

    public String getAvatar() { return avatar; }
    public void setAvatar(String avatar) { this.avatar = avatar; }

    public Boolean getSupportsTelehealth() { return supportsTelehealth; }
    public void setSupportsTelehealth(Boolean supportsTelehealth) { this.supportsTelehealth = supportsTelehealth; }

    public String getEducation() { return education; }
    public void setEducation(String education) { this.education = education; }

    public String getExperience() { return experience; }
    public void setExperience(String experience) { this.experience = experience; }

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
        private Integer consultationFee = 500;
        private Double rating = 4.5;
        private String avatar;
        private Boolean supportsTelehealth = true;
        private String education;
        private String experience;

        public DoctorBuilder user(User user) { this.user = user; return this; }
        public DoctorBuilder specialization(String specialization) { this.specialization = specialization; return this; }
        public DoctorBuilder licenseNumber(String licenseNumber) { this.licenseNumber = licenseNumber; return this; }
        public DoctorBuilder bio(String bio) { this.bio = bio; return this; }
        public DoctorBuilder slotDurationMinutes(Integer slotDurationMinutes) { this.slotDurationMinutes = slotDurationMinutes; return this; }
        public DoctorBuilder consultationFee(Integer consultationFee) { this.consultationFee = consultationFee; return this; }
        public DoctorBuilder rating(Double rating) { this.rating = rating; return this; }
        public DoctorBuilder avatar(String avatar) { this.avatar = avatar; return this; }
        public DoctorBuilder supportsTelehealth(Boolean supportsTelehealth) { this.supportsTelehealth = supportsTelehealth; return this; }
        public DoctorBuilder education(String education) { this.education = education; return this; }
        public DoctorBuilder experience(String experience) { this.experience = experience; return this; }

        public Doctor build() {
            return new Doctor(null, user, specialization, licenseNumber, bio, slotDurationMinutes, consultationFee, rating, avatar, supportsTelehealth, education, experience);
        }
    }
}
