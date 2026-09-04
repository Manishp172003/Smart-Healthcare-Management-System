package com.smarthealth.repository;

import com.smarthealth.entity.EmailVerificationToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmailVerificationRepository extends JpaRepository<EmailVerificationToken, Long> {

    Optional<EmailVerificationToken> findTopByEmailAndUsedFalseOrderByCreatedAtDesc(String email);

    Optional<EmailVerificationToken> findTopByEmailOrderByCreatedAtDesc(String email);

    void deleteByEmail(String email);
}
