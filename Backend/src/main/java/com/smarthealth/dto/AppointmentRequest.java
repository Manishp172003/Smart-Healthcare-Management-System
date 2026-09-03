package com.smarthealth.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonSetter;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

public class AppointmentRequest {
    private Long patientUserId;
    private Long doctorId;
    
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate appointmentDate;
    private LocalTime startTime;
    private String reason;
    private String appointmentType; // "in-person" or "telehealth"
    private String paymentMethod;   // "UPI", "CARD", "NET_BANKING", "PAY_AT_CLINIC"
    private String paymentStatus;   // "PAID", "PAY_ON_ARRIVAL"
    private Double amountPaid;
    private String transactionId;

    public AppointmentRequest() {
    }

    public AppointmentRequest(Long patientUserId, Long doctorId, LocalDate appointmentDate, LocalTime startTime, String reason, String appointmentType, String paymentMethod, String paymentStatus, Double amountPaid, String transactionId) {
        this.patientUserId = patientUserId;
        this.doctorId = doctorId;
        this.appointmentDate = appointmentDate;
        this.startTime = startTime;
        this.reason = reason;
        this.appointmentType = appointmentType;
        this.paymentMethod = paymentMethod;
        this.paymentStatus = paymentStatus;
        this.amountPaid = amountPaid;
        this.transactionId = transactionId;
    }

    public Long getPatientUserId() { return patientUserId; }
    public void setPatientUserId(Long patientUserId) { this.patientUserId = patientUserId; }

    public Long getDoctorId() { return doctorId; }
    public void setDoctorId(Long doctorId) { this.doctorId = doctorId; }

    public LocalDate getAppointmentDate() { return appointmentDate; }
    public void setAppointmentDate(LocalDate appointmentDate) { this.appointmentDate = appointmentDate; }

    @JsonSetter("appointmentDate")
    public void setAppointmentDateFromJson(Object rawDate) {
        if (rawDate == null) return;
        if (rawDate instanceof LocalDate) {
            this.appointmentDate = (LocalDate) rawDate;
            return;
        }
        String str = rawDate.toString().trim();
        try {
            this.appointmentDate = LocalDate.parse(str, DateTimeFormatter.ISO_LOCAL_DATE);
        } catch (Exception e1) {
            try {
                this.appointmentDate = LocalDate.parse(str, DateTimeFormatter.ofPattern("MMM d, yyyy", Locale.ENGLISH));
            } catch (Exception e2) {
                try {
                    this.appointmentDate = LocalDate.parse(str, DateTimeFormatter.ofPattern("MMMM d, yyyy", Locale.ENGLISH));
                } catch (Exception e3) {
                    try {
                        this.appointmentDate = LocalDate.parse(str, DateTimeFormatter.ofPattern("d MMM yyyy", Locale.ENGLISH));
                    } catch (Exception e4) {
                        this.appointmentDate = LocalDate.now();
                    }
                }
            }
        }
    }

    public LocalTime getStartTime() { return startTime; }
    public void setStartTime(LocalTime startTime) { this.startTime = startTime; }

    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }

    public String getAppointmentType() { return appointmentType; }
    public void setAppointmentType(String appointmentType) { this.appointmentType = appointmentType; }

    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }

    public String getPaymentStatus() { return paymentStatus; }
    public void setPaymentStatus(String paymentStatus) { this.paymentStatus = paymentStatus; }

    public Double getAmountPaid() { return amountPaid; }
    public void setAmountPaid(Double amountPaid) { this.amountPaid = amountPaid; }

    public String getTransactionId() { return transactionId; }
    public void setTransactionId(String transactionId) { this.transactionId = transactionId; }
}
