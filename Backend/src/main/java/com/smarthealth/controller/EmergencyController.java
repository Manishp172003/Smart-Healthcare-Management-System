package com.smarthealth.controller;

import com.smarthealth.entity.EmergencyAlert;
import com.smarthealth.entity.EmergencyStatus;
import com.smarthealth.service.EmergencyService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/emergencies")
public class EmergencyController {

    private final EmergencyService emergencyService;

    public EmergencyController(EmergencyService emergencyService) {
        this.emergencyService = emergencyService;
    }

    /**
     * Client SSE Subscription Endpoint. Keep connection open for real-time broadcasts.
     */
    @GetMapping(value = "/subscribe", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter subscribe() {
        return emergencyService.subscribe();
    }

    /**
     * Trigger a new patient emergency alert
     */
    @PostMapping("/trigger")
    public ResponseEntity<?> triggerEmergency(@RequestBody Map<String, Object> payload) {
        try {
            Long userId = Long.valueOf(payload.get("userId").toString());
            Double latitude = Double.valueOf(payload.get("latitude").toString());
            Double longitude = Double.valueOf(payload.get("longitude").toString());

            EmergencyAlert alert = emergencyService.triggerEmergency(userId, latitude, longitude);
            return ResponseEntity.ok(alert);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    /**
     * Retrieve all unresolved emergency alerts
     */
    @GetMapping("/active")
    public ResponseEntity<?> getActiveAlerts() {
        try {
            List<EmergencyAlert> list = emergencyService.getActiveAlerts();
            return ResponseEntity.ok(list);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    /**
     * Get patient specific emergency logs
     */
    @GetMapping("/patient/{userId}")
    public ResponseEntity<?> getPatientAlerts(@PathVariable Long userId) {
        try {
            List<EmergencyAlert> list = emergencyService.getPatientAlerts(userId);
            return ResponseEntity.ok(list);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    /**
     * Update status (e.g. DISPATCHED, RESOLVED)
     */
    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestParam EmergencyStatus status) {
        try {
            EmergencyAlert alert = emergencyService.updateAlertStatus(id, status);
            return ResponseEntity.ok(alert);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
}
