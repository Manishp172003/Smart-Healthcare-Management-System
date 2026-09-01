package com.smarthealth.repository;

import com.smarthealth.entity.EmergencyAlert;
import com.smarthealth.entity.EmergencyStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EmergencyAlertRepository extends JpaRepository<EmergencyAlert, Long> {

    @Query("SELECT e FROM EmergencyAlert e WHERE e.status <> 'RESOLVED' ORDER BY e.triggerTime DESC")
    List<EmergencyAlert> findActiveAlerts();

    @Query("SELECT e FROM EmergencyAlert e WHERE e.patient.user.id = :userId ORDER BY e.triggerTime DESC")
    List<EmergencyAlert> findAlertsByPatientUserId(@Param("userId") Long userId);
}
