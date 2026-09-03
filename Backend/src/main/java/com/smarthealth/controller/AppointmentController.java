package com.smarthealth.controller;

import com.smarthealth.dto.AppointmentRequest;
import com.smarthealth.entity.Appointment;
import com.smarthealth.entity.AppointmentStatus;
import com.smarthealth.service.AppointmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class AppointmentController {

    private final AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @GetMapping
    public ResponseEntity<?> getAllAppointments() {
        try {
            List<Appointment> list = appointmentService.getAllAppointments();
            return ResponseEntity.ok(list);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/book")
    public ResponseEntity<?> bookAppointment(@RequestBody AppointmentRequest request) {
        try {
            Appointment appointment = appointmentService.bookAppointment(request);
            return ResponseEntity.ok(appointment);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", e.getMessage());
            if (e.getMessage() != null && e.getMessage().contains("Conflict Error")) {
                return ResponseEntity.status(409).body(response); // 409 Conflict
            }
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/patient/{userId}")
    public ResponseEntity<?> getPatientAppointments(@PathVariable Long userId) {
        try {
            List<Appointment> list = appointmentService.getPatientAppointments(userId);
            return ResponseEntity.ok(list);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/doctor/{userId}")
    public ResponseEntity<?> getDoctorAppointments(@PathVariable Long userId) {
        try {
            List<Appointment> list = appointmentService.getDoctorAppointments(userId);
            return ResponseEntity.ok(list);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/doctor-id/{doctorId}")
    public ResponseEntity<?> getAppointmentsByDoctorId(@PathVariable Long doctorId) {
        try {
            List<Appointment> list = appointmentService.getAppointmentsByDoctorId(doctorId);
            return ResponseEntity.ok(list);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestParam AppointmentStatus status) {
        try {
            Appointment appointment = appointmentService.updateAppointmentStatus(id, status);
            return ResponseEntity.ok(appointment);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PutMapping("/{id}/reschedule")
    public ResponseEntity<?> rescheduleAppointment(
            @PathVariable Long id,
            @RequestParam @org.springframework.format.annotation.DateTimeFormat(iso = org.springframework.format.annotation.DateTimeFormat.ISO.DATE) java.time.LocalDate newDate,
            @RequestParam @org.springframework.format.annotation.DateTimeFormat(iso = org.springframework.format.annotation.DateTimeFormat.ISO.TIME) java.time.LocalTime newTime
    ) {
        try {
            Appointment appointment = appointmentService.rescheduleAppointment(id, newDate, newTime);
            return ResponseEntity.ok(appointment);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
}
