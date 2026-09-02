package com.smarthealth.repository;

import com.smarthealth.entity.PatientFavoriteDoctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PatientFavoriteDoctorRepository extends JpaRepository<PatientFavoriteDoctor, Long> {
    List<PatientFavoriteDoctor> findByPatientId(Long patientId);
    Optional<PatientFavoriteDoctor> findByPatientIdAndDoctorId(Long patientId, Long doctorId);
    void deleteByPatientIdAndDoctorId(Long patientId, Long doctorId);
}