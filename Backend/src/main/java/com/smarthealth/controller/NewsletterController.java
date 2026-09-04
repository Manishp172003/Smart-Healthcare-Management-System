package com.smarthealth.controller;

import com.smarthealth.dto.NewsletterSubscriptionRequest;
import com.smarthealth.entity.NewsletterSubscriber;
import com.smarthealth.service.NewsletterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.regex.Pattern;

@RestController
@RequestMapping("/api/newsletter")
public class NewsletterController {

    @Autowired
    private NewsletterService newsletterService;

    private static final Pattern EMAIL_PATTERN = Pattern.compile(
            "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$"
    );

    @PostMapping("/subscribe")
    public ResponseEntity<?> subscribe(@RequestBody NewsletterSubscriptionRequest request) {
        // Validate email format
        if (request.getEmail() == null || request.getEmail().trim().isEmpty()) {
            return ResponseEntity.badRequest().body(createErrorResponse("Email is required"));
        }

        if (!EMAIL_PATTERN.matcher(request.getEmail()).matches()) {
            return ResponseEntity.badRequest().body(createErrorResponse("Invalid email format"));
        }

        try {
            // Subscribe the user
            NewsletterSubscriber subscriber = newsletterService.subscribe(
                    request.getEmail().trim().toLowerCase(),
                    request.getSubscriptionSource() != null ? request.getSubscriptionSource() : "footer"
            );

            return ResponseEntity.ok(createSuccessResponse(
                    "Successfully subscribed to newsletter",
                    subscriber
            ));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(createErrorResponse("Failed to subscribe: " + e.getMessage()));
        }
    }

    @GetMapping("/check/{email}")
    public ResponseEntity<?> checkSubscription(@PathVariable String email) {
        if (email == null || email.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(createErrorResponse("Email is required"));
        }

        if (!EMAIL_PATTERN.matcher(email).matches()) {
            return ResponseEntity.badRequest().body(createErrorResponse("Invalid email format"));
        }

        try {
            boolean isSubscribed = newsletterService.isSubscribed(email.trim().toLowerCase());
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("subscribed", isSubscribed);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(createErrorResponse("Failed to check subscription: " + e.getMessage()));
        }
    }

    @PostMapping("/unsubscribe")
    public ResponseEntity<?> unsubscribe(@RequestBody Map<String, String> request) {
        String email = request.get("email");

        if (email == null || email.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(createErrorResponse("Email is required"));
        }

        if (!EMAIL_PATTERN.matcher(email).matches()) {
            return ResponseEntity.badRequest().body(createErrorResponse("Invalid email format"));
        }

        try {
            boolean unsubscribed = newsletterService.unsubscribe(email.trim().toLowerCase());
            if (unsubscribed) {
                return ResponseEntity.ok(createSuccessResponse("Successfully unsubscribed", null));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(createErrorResponse("Email not found in subscribers list"));
            }

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(createErrorResponse("Failed to unsubscribe: " + e.getMessage()));
        }
    }

    @GetMapping("/subscribers")
    public ResponseEntity<?> getAllSubscribers() {
        try {
            return ResponseEntity.ok(createSuccessResponse("Fetched all subscribers", newsletterService.getAllSubscribers()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(createErrorResponse("Failed to fetch subscribers: " + e.getMessage()));
        }
    }

    private Map<String, Object> createSuccessResponse(String message, Object data) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", message);
        if (data != null) {
            response.put("data", data);
        }
        return response;
    }

    private Map<String, Object> createErrorResponse(String message) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", false);
        response.put("message", message);
        return response;
    }
}