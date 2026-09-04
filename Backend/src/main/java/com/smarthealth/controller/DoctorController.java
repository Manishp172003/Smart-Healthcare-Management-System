package com.smarthealth.controller;

import com.smarthealth.entity.Doctor;
import com.smarthealth.repository.DoctorRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/doctors")
public class DoctorController {

    private final DoctorRepository doctorRepository;
    private final com.smarthealth.repository.UserRepository userRepository;
    private final org.springframework.security.crypto.password.PasswordEncoder passwordEncoder;

    public DoctorController(
            DoctorRepository doctorRepository,
            com.smarthealth.repository.UserRepository userRepository,
            org.springframework.security.crypto.password.PasswordEncoder passwordEncoder
    ) {
        this.doctorRepository = doctorRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping
    public ResponseEntity<?> createDoctor(@RequestBody Map<String, Object> request) {
        try {
            String name = (String) request.get("name");
            String email = (String) request.get("email");
            String password = (String) request.getOrDefault("password", "Doctor@123");
            String specialization = (String) request.get("specialization");
            String licenseNumber = (String) request.get("licenseNumber");
            String bio = (String) request.getOrDefault("bio", "Certified Clinical Specialist");
            Integer fee = request.get("consultationFee") != null ? Integer.parseInt(request.get("consultationFee").toString()) : 1500;
            String education = (String) request.getOrDefault("education", "MBBS, MD");
            String experience = (String) request.getOrDefault("experience", "8+ Years");

            if (userRepository.existsByEmail(email)) {
                Map<String, String> err = new HashMap<>();
                err.put("error", "Email is already registered in the system!");
                return ResponseEntity.badRequest().body(err);
            }

            com.smarthealth.entity.User user = com.smarthealth.entity.User.builder()
                    .name(name)
                    .email(email)
                    .password(passwordEncoder.encode(password))
                    .role(com.smarthealth.entity.Role.ROLE_DOCTOR)
                    .status(com.smarthealth.entity.UserStatus.ACTIVE)
                    .build();

            com.smarthealth.entity.User savedUser = userRepository.save(user);

            String avatar = (String) request.get("avatar");

            Doctor doctor = new Doctor();
            doctor.setUser(savedUser);
            doctor.setSpecialization(specialization != null ? specialization : "General Medicine");
            doctor.setLicenseNumber(licenseNumber != null ? licenseNumber : "MED-" + (System.currentTimeMillis() % 100000));
            doctor.setBio(bio);
            doctor.setConsultationFee(fee);
            doctor.setEducation(education);
            doctor.setExperience(experience);
            doctor.setSlotDurationMinutes(30);
            doctor.setRating(4.9);
            doctor.setSupportsTelehealth(true);
            doctor.setAvatar(avatar);

            Doctor savedDoctor = doctorRepository.save(doctor);
            return ResponseEntity.ok(savedDoctor);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateDoctorStatus(@PathVariable Long id, @RequestParam String status) {
        try {
            Doctor doctor = doctorRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Doctor not found with ID: " + id));

            com.smarthealth.entity.User user = doctor.getUser();
            com.smarthealth.entity.UserStatus newStatus = com.smarthealth.entity.UserStatus.valueOf(status.toUpperCase());
            user.setStatus(newStatus);
            userRepository.save(user);

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Doctor status updated to " + newStatus);
            response.put("doctor", doctor);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDoctor(@PathVariable Long id) {
        try {
            Doctor doctor = doctorRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Doctor not found with ID: " + id));
            doctorRepository.delete(doctor);
            Map<String, String> res = new HashMap<>();
            res.put("message", "Doctor removed successfully.");
            return ResponseEntity.ok(res);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/specialty/{specialty}")
    public ResponseEntity<?> getDoctorsBySpecialty(@PathVariable String specialty) {
        try {
            String searchPattern = mapSpecialtyToPattern(specialty);
            List<Doctor> doctors = doctorRepository.findBySpecializationContaining(searchPattern);
            if (doctors.isEmpty()) {
                doctors = doctorRepository.findBySpecializationContaining(specialty);
            }
            return ResponseEntity.ok(doctors);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getDoctorById(@PathVariable Long id) {
        try {
            Doctor doctor = doctorRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Doctor not found with ID: " + id));
            return ResponseEntity.ok(doctor);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllDoctors() {
        try {
            List<Doctor> doctors = doctorRepository.findAll();
            return ResponseEntity.ok(doctors);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/{id}/availability")
    public ResponseEntity<?> getDoctorAvailability(@PathVariable Long id, @RequestParam String date) {
        try {
            Doctor doctor = doctorRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Doctor not found with ID: " + id));

            // In a real implementation, this would check the database for existing appointments
            // For now, return default time slots
            String[] defaultSlots = {"09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:30 PM"};

            Map<String, Object> response = new HashMap<>();
            response.put("doctorName", doctor.getUser().getName());
            response.put("specialization", doctor.getSpecialization());
            response.put("availableSlots", defaultSlots);
            response.put("slotDuration", doctor.getSlotDurationMinutes());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchDoctors(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) String specialty,
            @RequestParam(required = false) Double minRating,
            @RequestParam(required = false) Integer maxFee
    ) {
        try {
            List<Doctor> doctors;

            if (query != null && !query.isEmpty()) {
                // Search by name or specialization
                doctors = doctorRepository.findByUser_NameContainingIgnoreCaseOrSpecializationContainingIgnoreCase(query, query);
            } else if (specialty != null && !specialty.isEmpty()) {
                doctors = doctorRepository.findBySpecializationContaining(specialty);
            } else {
                doctors = doctorRepository.findAll();
            }

            // Apply filters
            if (minRating != null) {
                doctors = doctors.stream()
                        .filter(doc -> doc.getRating() != null && doc.getRating() >= minRating)
                        .toList();
            }

            if (maxFee != null) {
                doctors = doctors.stream()
                        .filter(doc -> doc.getConsultationFee() != null && doc.getConsultationFee() <= maxFee)
                        .toList();
            }

            return ResponseEntity.ok(doctors);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/recommend")
    public ResponseEntity<?> recommendDoctors(@RequestParam String symptoms) {
        try {
            String symptomsLower = (symptoms != null) ? symptoms.toLowerCase().trim() : "";
            String recommendedSpecialty = "General Medicine";
            String searchPrefix = "General";

            if (symptomsLower.matches(".*(chest|heart|cardiac|palpitat|bp|hypertension|angina|breathless).*")) {
                recommendedSpecialty = "Cardiology";
                searchPrefix = "Cardio";
            } else if (symptomsLower.matches(".*(headache|migraine|dizzi|nerve|stroke|seizur|numb|brain).*")) {
                recommendedSpecialty = "Neurology";
                searchPrefix = "Neuro";
            } else if (symptomsLower.matches(".*(skin|rash|acne|itch|eczema|hair|pimple|allerg).*")) {
                recommendedSpecialty = "Dermatology";
                searchPrefix = "Dermat";
            } else if (symptomsLower.matches(".*(bone|joint|knee|back|spine|fractur|shoulder|ortho|sprain|leg).*")) {
                recommendedSpecialty = "Orthopedics";
                searchPrefix = "Ortho";
            } else if (symptomsLower.matches(".*(child|baby|infant|newborn|kid|vaccin|pediatr).*")) {
                recommendedSpecialty = "Pediatrics";
                searchPrefix = "Pediatr";
            } else if (symptomsLower.matches(".*(period|menstru|pregnant|pregnan|cramp|pcod|pcos|gynec|pelvic).*")) {
                recommendedSpecialty = "Gynecology";
                searchPrefix = "Gynec";
            }

            List<Doctor> recommendedDoctors = doctorRepository.findBySpecializationContaining(searchPrefix);
            if (recommendedDoctors.isEmpty()) {
                recommendedDoctors = doctorRepository.findBySpecializationContaining("General");
            }

            Map<String, Object> response = new HashMap<>();
            response.put("recommendedSpecialty", recommendedSpecialty);
            response.put("doctors", recommendedDoctors);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    private String mapSpecialtyToPattern(String specialty) {
        if (specialty == null) return "";
        String s = specialty.toLowerCase().trim();
        if (s.contains("cardio") || s.contains("heart")) return "Cardio";
        if (s.contains("derma") || s.contains("skin")) return "Dermat";
        if (s.contains("pediatr") || s.contains("child")) return "Pediatr";
        if (s.contains("neuro") || s.contains("brain")) return "Neuro";
        if (s.contains("ortho") || s.contains("bone") || s.contains("joint")) return "Ortho";
        if (s.contains("gynec") || s.contains("obgyn") || s.contains("women")) return "Gynec";
        if (s.contains("general") || s.contains("physician") || s.contains("medicine") || s.contains("practice")) return "General";
        if (s.contains("eye") || s.contains("ophthalm")) return "Ophthal";
        if (s.contains("dent")) return "Dent";
        return specialty;
    }
}