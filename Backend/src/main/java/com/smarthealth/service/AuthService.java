package com.smarthealth.service;

import com.smarthealth.dto.AuthResponse;
import com.smarthealth.dto.LoginRequest;
import com.smarthealth.dto.RegisterRequest;
import com.smarthealth.entity.*;
import com.smarthealth.repository.DoctorRepository;
import com.smarthealth.repository.PatientRepository;
import com.smarthealth.repository.UserRepository;
import com.smarthealth.security.JwtUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    public AuthService(
            UserRepository userRepository,
            PatientRepository patientRepository,
            DoctorRepository doctorRepository,
            PasswordEncoder passwordEncoder,
            JwtUtils jwtUtils
    ) {
        this.userRepository = userRepository;
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
    }

    @Transactional
    public String registerUser(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Error: Email is already in use!");
        }

        // Determine user role
        Role userRole = Role.ROLE_PATIENT;
        if ("DOCTOR".equalsIgnoreCase(request.getRole())) {
            userRole = Role.ROLE_DOCTOR;
        } else if ("ADMIN".equalsIgnoreCase(request.getRole())) {
            userRole = Role.ROLE_ADMIN;
        }

        // Create core User entity
        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(userRole)
                .status(UserStatus.ACTIVE)
                .build();

        User savedUser = userRepository.save(user);

        // Create secondary profiles based on role
        if (userRole == Role.ROLE_PATIENT) {
            Patient patient = Patient.builder()
                    .user(savedUser)
                    .phone(request.getPhone())
                    .build();
            patientRepository.save(patient);
        } else if (userRole == Role.ROLE_DOCTOR) {
            if (request.getLicenseNumber() == null || request.getSpecialization() == null) {
                throw new RuntimeException("Error: Doctor registration requires a license number and specialization!");
            }
            Doctor doctor = Doctor.builder()
                    .user(savedUser)
                    .specialization(request.getSpecialization())
                    .licenseNumber(request.getLicenseNumber())
                    .slotDurationMinutes(30)
                    .build();
            doctorRepository.save(doctor);
        }

        return "User registered successfully!";
    }

    @Transactional(readOnly = true)
    public AuthResponse loginUser(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Error: User not found with email: " + request.getEmail()));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Error: Invalid credentials!");
        }

        if (user.getStatus() != UserStatus.ACTIVE) {
            throw new RuntimeException("Error: Account is suspended. Please contact IT support.");
        }

        String token = jwtUtils.generateToken(user.getEmail(), user.getRole().name());

        return new AuthResponse(token, user.getEmail(), user.getRole().name(), user.getName(), user.getId());
    }
}
