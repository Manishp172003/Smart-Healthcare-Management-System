package com.smarthealth.entity;

import jakarta.persistence.*;
import java.time.LocalTime;

@Entity
@Table(name = "doctor_availabilities")
public class DoctorAvailability {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id", nullable = false)
    private Doctor doctor;

    @Column(name = "day_of_week", nullable = false)
    private Integer dayOfWeek; // 1 (Mon) - 7 (Sun)

    @Column(name = "start_time", nullable = false)
    private LocalTime startTime;

    @Column(name = "end_time", nullable = false)
    private LocalTime endTime;

    // Constructors
    public DoctorAvailability() {
    }

    public DoctorAvailability(Long id, Doctor doctor, Integer dayOfWeek, LocalTime startTime, LocalTime endTime) {
        this.id = id;
        this.doctor = doctor;
        this.dayOfWeek = dayOfWeek;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Doctor getDoctor() { return doctor; }
    public void setDoctor(Doctor doctor) { this.doctor = doctor; }

    public Integer getDayOfWeek() { return dayOfWeek; }
    public void setDayOfWeek(Integer dayOfWeek) { this.dayOfWeek = dayOfWeek; }

    public LocalTime getStartTime() { return startTime; }
    public void setStartTime(LocalTime startTime) { this.startTime = startTime; }

    public LocalTime getEndTime() { return endTime; }
    public void setEndTime(LocalTime endTime) { this.endTime = endTime; }

    // Custom Builder
    public static DoctorAvailabilityBuilder builder() {
        return new DoctorAvailabilityBuilder();
    }

    public static class DoctorAvailabilityBuilder {
        private Doctor doctor;
        private Integer dayOfWeek;
        private LocalTime startTime;
        private LocalTime endTime;

        public DoctorAvailabilityBuilder doctor(Doctor doctor) { this.doctor = doctor; return this; }
        public DoctorAvailabilityBuilder dayOfWeek(Integer dayOfWeek) { this.dayOfWeek = dayOfWeek; return this; }
        public DoctorAvailabilityBuilder startTime(LocalTime startTime) { this.startTime = startTime; return this; }
        public DoctorAvailabilityBuilder endTime(LocalTime endTime) { this.endTime = endTime; return this; }

        public DoctorAvailability build() {
            return new DoctorAvailability(null, doctor, dayOfWeek, startTime, endTime);
        }
    }
}
