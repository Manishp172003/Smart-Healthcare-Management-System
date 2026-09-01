package com.smarthealth.service;

import com.smarthealth.entity.EmergencyAlert;
import com.smarthealth.entity.EmergencyStatus;
import com.smarthealth.entity.Patient;
import com.smarthealth.repository.EmergencyAlertRepository;
import com.smarthealth.repository.PatientRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@Service
public class EmergencyService {

    private final EmergencyAlertRepository emergencyAlertRepository;
    private final PatientRepository patientRepository;
    
    // Thread-safe collection to hold active SSE connections
    private final List<SseEmitter> emitters = new CopyOnWriteArrayList<>();

    public EmergencyService(EmergencyAlertRepository emergencyAlertRepository, PatientRepository patientRepository) {
        this.emergencyAlertRepository = emergencyAlertRepository;
        this.patientRepository = patientRepository;
    }

    /**
     * Subscribe an admin to live emergency notifications
     */
    public SseEmitter subscribe() {
        SseEmitter emitter = new SseEmitter(24 * 60 * 60 * 1000L); // 24 Hours timeout
        this.emitters.add(emitter);

        emitter.onCompletion(() -> this.emitters.remove(emitter));
        emitter.onTimeout(() -> this.emitters.remove(emitter));
        emitter.onError((e) -> this.emitters.remove(emitter));

        // Send dummy connection established event
        try {
            emitter.send(SseEmitter.event().name("INIT").data("Connected to SmartHealth Live Emergency Channel"));
        } catch (IOException e) {
            this.emitters.remove(emitter);
        }

        return emitter;
    }

    /**
     * Trigger a new patient emergency, fetch medical profile summary, save and broadcast.
     */
    @Transactional
    public EmergencyAlert triggerEmergency(Long userId, Double latitude, Double longitude) {
        Patient patient = patientRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Patient profile not found for user ID: " + userId));

        // Compile quick summary of critical medical parameters
        StringBuilder summary = new StringBuilder();
        summary.append("Emergency Contact: ").append(patient.getEmergencyContact() != null ? patient.getEmergencyContact() : "N/A");
        summary.append(" | Blood Group: ").append(patient.getBloodGroup() != null ? patient.getBloodGroup() : "Unknown");
        summary.append(" | Phone: ").append(patient.getPhone() != null ? patient.getPhone() : "N/A");
        summary.append(" | Address: ").append(patient.getAddress() != null ? patient.getAddress() : "Unknown Location");

        EmergencyAlert alert = new EmergencyAlert(
                patient,
                latitude,
                longitude,
                EmergencyStatus.TRIGGERED,
                summary.toString(),
                LocalDateTime.now()
        );

        EmergencyAlert saved = emergencyAlertRepository.save(alert);
        
        // Broadcast event in real-time
        broadcast(saved);
        
        return saved;
    }

    /**
     * Update status, set resolution timestamp if RESOLVED, save and broadcast.
     */
    @Transactional
    public EmergencyAlert updateAlertStatus(Long alertId, EmergencyStatus status) {
        EmergencyAlert alert = emergencyAlertRepository.findById(alertId)
                .orElseThrow(() -> new RuntimeException("Emergency alert not found with ID: " + alertId));

        alert.setStatus(status);
        if (status == EmergencyStatus.RESOLVED) {
            alert.setResolvedAt(LocalDateTime.now());
        }

        EmergencyAlert saved = emergencyAlertRepository.save(alert);
        
        // Broadcast status update
        broadcast(saved);
        
        return saved;
    }

    /**
     * Fetch all active/unresolved emergencies
     */
    public List<EmergencyAlert> getActiveAlerts() {
        return emergencyAlertRepository.findActiveAlerts();
    }

    /**
     * Fetch patient specific alert logs
     */
    public List<EmergencyAlert> getPatientAlerts(Long userId) {
        return emergencyAlertRepository.findAlertsByPatientUserId(userId);
    }

    /**
     * Helper to push live events to all connected clients
     */
    private void broadcast(Object event) {
        List<SseEmitter> deadEmitters = new ArrayList<>();
        for (SseEmitter emitter : emitters) {
            try {
                emitter.send(SseEmitter.event()
                        .name("emergency-alert")
                        .data(event));
            } catch (Exception e) {
                deadEmitters.add(emitter);
            }
        }
        emitters.removeAll(deadEmitters);
    }
}
