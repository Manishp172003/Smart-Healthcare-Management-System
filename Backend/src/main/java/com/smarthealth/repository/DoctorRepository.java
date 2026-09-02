package com.smarthealth.repository;

import com.smarthealth.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    Optional<Doctor> findByUserId(Long userId);
    List<Doctor> findBySpecializationContaining(String specialization);
    List<Doctor> findByUser_NameContainingIgnoreCaseOrSpecializationContainingIgnoreCase(String name, String specialization);
}
