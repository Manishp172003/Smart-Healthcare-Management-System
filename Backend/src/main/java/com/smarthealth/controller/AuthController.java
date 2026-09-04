package com.smarthealth.controller;

import com.smarthealth.dto.*;
import com.smarthealth.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest registerRequest) {
        try {
            Map<String, Object> result = authService.registerUser(registerRequest);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody VerifyOtpRequest verifyRequest) {
        try {
            AuthResponse response = authService.verifyOtp(verifyRequest);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/resend-otp")
    public ResponseEntity<?> resendOtp(@RequestBody ResendOtpRequest resendRequest) {
        try {
            Map<String, Object> response = authService.resendOtp(resendRequest);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        try {
            AuthResponse response = authService.loginUser(loginRequest);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            String msg = e.getMessage();
            response.put("error", msg);
            if (msg != null && msg.contains("EMAIL_NOT_VERIFIED")) {
                response.put("emailVerified", false);
                response.put("email", loginRequest.getEmail());
            }
            return ResponseEntity.status(401).body(response);
        }
    }

    @PostMapping("/google")
    public ResponseEntity<?> authenticateGoogle(@RequestBody GoogleLoginRequest googleRequest) {
        try {
            AuthResponse response = authService.loginWithGoogle(
                googleRequest.getCredential(),
                googleRequest.getRole()
            );
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", e.getMessage());
            return ResponseEntity.status(401).body(response);
        }
    }
}
