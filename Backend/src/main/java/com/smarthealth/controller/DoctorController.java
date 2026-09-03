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
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
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
            List<Doctor> doctors = doctorRepository.findBySpecializationContaining(specialty);
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
            // Simple symptom-to-specialty mapping
            Map<String, String> symptomMapping = new HashMap<>();
            symptomMapping.put("headache", "Neurology");
            symptomMapping.put("fever", "General Practice");
            symptomMapping.put("skin", "Dermatology");
            symptomMapping.put("heart", "Cardiology");
            symptomMapping.put("chest pain", "Cardiology");
            symptomMapping.put("rash", "Dermatology");
            symptomMapping.put("child", "Pediatrics");
            symptomMapping.put("nerve", "Neurology");

            String symptomsLower = symptoms.toLowerCase();
            String recommendedSpecialty = "General Practice"; // default

            for (Map.Entry<String, String> entry : symptomMapping.entrySet()) {
                if (symptomsLower.contains(entry.getKey())) {
                    recommendedSpecialty = entry.getValue();
                    break;
                }
            }

            List<Doctor> recommendedDoctors = doctorRepository.findBySpecializationContaining(recommendedSpecialty);

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
}