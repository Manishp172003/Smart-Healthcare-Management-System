package com.smarthealth.controller;

import com.smarthealth.entity.Doctor;
import com.smarthealth.entity.Patient;
import com.smarthealth.entity.PatientFavoriteDoctor;
import com.smarthealth.repository.DoctorRepository;
import com.smarthealth.repository.PatientFavoriteDoctorRepository;
import com.smarthealth.repository.PatientRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/patient")
public class PatientController {

    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final PatientFavoriteDoctorRepository favoriteDoctorRepository;

    public PatientController(
            PatientRepository patientRepository,
            DoctorRepository doctorRepository,
            PatientFavoriteDoctorRepository favoriteDoctorRepository
    ) {
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
        this.favoriteDoctorRepository = favoriteDoctorRepository;
    }

    @GetMapping("/insurance")
    public ResponseEntity<?> getPatientInsurance(@RequestHeader("Authorization") String authHeader) {
        try {
            // Extract user ID from JWT token (simplified - in production, use proper JWT validation)
            // For now, we'll use a hardcoded user ID for demonstration
            Long userId = 1L; // This should come from JWT token

            Patient patient = patientRepository.findByUserId(userId)
                    .orElseThrow(() -> new RuntimeException("Patient not found"));

            Map<String, Object> insuranceData = new HashMap<>();
            insuranceData.put("provider", patient.getInsuranceProvider() != null ? patient.getInsuranceProvider() : "Not provided");
            insuranceData.put("policyNumber", patient.getInsurancePolicyNumber() != null ? patient.getInsurancePolicyNumber() : "Not provided");
            insuranceData.put("coveragePercentage", patient.getInsuranceCoveragePercentage() != null ? patient.getInsuranceCoveragePercentage() : 0);
            insuranceData.put("validUntil", patient.getInsuranceValidUntil() != null ? patient.getInsuranceValidUntil().toString() : "Not provided");

            return ResponseEntity.ok(insuranceData);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/favorites/{doctorId}")
    public ResponseEntity<?> toggleFavoriteDoctor(@PathVariable Long doctorId, @RequestHeader("Authorization") String authHeader) {
        try {
            // Extract user ID from JWT token (simplified)
            Long userId = 1L; // This should come from JWT token

            Patient patient = patientRepository.findByUserId(userId)
                    .orElseThrow(() -> new RuntimeException("Patient not found"));

            Doctor doctor = doctorRepository.findById(doctorId)
                    .orElseThrow(() -> new RuntimeException("Doctor not found"));

            Optional<PatientFavoriteDoctor> existingFavorite = favoriteDoctorRepository
                    .findByPatientIdAndDoctorId(patient.getId(), doctorId);

            if (existingFavorite.isPresent()) {
                // Remove from favorites
                favoriteDoctorRepository.delete(existingFavorite.get());
                Map<String, String> response = new HashMap<>();
                response.put("message", "Doctor removed from favorites");
                response.put("action", "removed");
                return ResponseEntity.ok(response);
            } else {
                // Add to favorites
                PatientFavoriteDoctor favorite = PatientFavoriteDoctor.builder()
                        .patient(patient)
                        .doctor(doctor)
                        .build();
                favoriteDoctorRepository.save(favorite);

                Map<String, String> response = new HashMap<>();
                response.put("message", "Doctor added to favorites");
                response.put("action", "added");
                return ResponseEntity.ok(response);
            }
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/favorites")
    public ResponseEntity<?> getFavoriteDoctors(@RequestHeader("Authorization") String authHeader) {
        try {
            // Extract user ID from JWT token (simplified)
            Long userId = 1L; // This should come from JWT token

            Patient patient = patientRepository.findByUserId(userId)
                    .orElseThrow(() -> new RuntimeException("Patient not found"));

            List<PatientFavoriteDoctor> favorites = favoriteDoctorRepository.findByPatientId(patient.getId());

            // Extract doctors from favorites
            List<Doctor> favoriteDoctors = favorites.stream()
                    .map(PatientFavoriteDoctor::getDoctor)
                    .toList();

            return ResponseEntity.ok(favoriteDoctors);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
}