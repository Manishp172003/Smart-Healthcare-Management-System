package com.smarthealth.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "patients")
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String phone;
    
    @Column(name = "dob")
    private LocalDate dob;
    
    @Column(name = "blood_group")
    private String bloodGroup;
    
    @Column(name = "emergency_contact")
    private String emergencyContact;
    
    private String address;

    // Constructors
    public Patient() {
    }

    public Patient(Long id, User user, String phone, LocalDate dob, String bloodGroup, String emergencyContact, String address) {
        this.id = id;
        this.user = user;
        this.phone = phone;
        this.dob = dob;
        this.bloodGroup = bloodGroup;
        this.emergencyContact = emergencyContact;
        this.address = address;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public LocalDate getDob() { return dob; }
    public void setDob(LocalDate dob) { this.dob = dob; }

    public String getBloodGroup() { return bloodGroup; }
    public void setBloodGroup(String bloodGroup) { this.bloodGroup = bloodGroup; }

    public String getEmergencyContact() { return emergencyContact; }
    public void setEmergencyContact(String emergencyContact) { this.emergencyContact = emergencyContact; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    // Custom Builder
    public static PatientBuilder builder() {
        return new PatientBuilder();
    }

    public static class PatientBuilder {
        private User user;
        private String phone;
        private LocalDate dob;
        private String bloodGroup;
        private String emergencyContact;
        private String address;

        public PatientBuilder user(User user) { this.user = user; return this; }
        public PatientBuilder phone(String phone) { this.phone = phone; return this; }
        public PatientBuilder dob(LocalDate dob) { this.dob = dob; return this; }
        public PatientBuilder bloodGroup(String bloodGroup) { this.bloodGroup = bloodGroup; return this; }
        public PatientBuilder emergencyContact(String emergencyContact) { this.emergencyContact = emergencyContact; return this; }
        public PatientBuilder address(String address) { this.address = address; return this; }

        public Patient build() {
            return new Patient(null, user, phone, dob, bloodGroup, emergencyContact, address);
        }
    }
}
