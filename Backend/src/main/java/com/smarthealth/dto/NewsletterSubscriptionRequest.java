package com.smarthealth.dto;

public class NewsletterSubscriptionRequest {
    private String email;
    private String subscriptionSource = "footer";

    // Constructors
    public NewsletterSubscriptionRequest() {
    }

    public NewsletterSubscriptionRequest(String email) {
        this.email = email;
    }

    public NewsletterSubscriptionRequest(String email, String subscriptionSource) {
        this.email = email;
        this.subscriptionSource = subscriptionSource;
    }

    // Getters and Setters
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSubscriptionSource() {
        return subscriptionSource;
    }

    public void setSubscriptionSource(String subscriptionSource) {
        this.subscriptionSource = subscriptionSource;
    }
}