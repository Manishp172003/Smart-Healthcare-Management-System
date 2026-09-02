package com.smarthealth.dto;

import java.time.LocalDate;
import java.time.LocalTime;

public class AppointmentRequest {
    private Long patientUserId;
    private Long doctorId;
    private LocalDate appointmentDate;
    private LocalTime startTime;
    private String reason;
    private String appointmentType; // "in-person" or "telehealth"

    public AppointmentRequest() {
    }

    public AppointmentRequest(Long patientUserId, Long doctorId, LocalDate appointmentDate, LocalTime startTime, String reason, String appointmentType) {
        this.patientUserId = patientUserId;
        this.doctorId = doctorId;
        this.appointmentDate = appointmentDate;
        this.startTime = startTime;
        this.reason = reason;
        this.appointmentType = appointmentType;
    }

    public Long getPatientUserId() { return patientUserId; }
    public void setPatientUserId(Long patientUserId) { this.patientUserId = patientUserId; }

    public Long getDoctorId() { return doctorId; }
    public void setDoctorId(Long doctorId) { this.doctorId = doctorId; }

    public LocalDate getAppointmentDate() { return appointmentDate; }
    public void setAppointmentDate(LocalDate appointmentDate) { this.appointmentDate = appointmentDate; }

    public LocalTime getStartTime() { return startTime; }
    public void setStartTime(LocalTime startTime) { this.startTime = startTime; }

    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }

    public String getAppointmentType() { return appointmentType; }
    public void setAppointmentType(String appointmentType) { this.appointmentType = appointmentType; }
}
