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

    public DoctorController(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
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