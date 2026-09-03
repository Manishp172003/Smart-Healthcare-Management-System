package com.smarthealth.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "newsletter_subscribers")
public class NewsletterSubscriber {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false, length = 255)
    private String email;

    @Column(name = "subscribed_at", nullable = false)
    private LocalDateTime subscribedAt;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;

    @Column(name = "subscription_source", length = 50)
    private String subscriptionSource = "footer";

    // Constructors
    public NewsletterSubscriber() {
        this.subscribedAt = LocalDateTime.now();
    }

    public NewsletterSubscriber(String email) {
        this();
        this.email = email;
    }

    public NewsletterSubscriber(String email, String subscriptionSource) {
        this(email);
        this.subscriptionSource = subscriptionSource;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDateTime getSubscribedAt() {
        return subscribedAt;
    }

    public void setSubscribedAt(LocalDateTime subscribedAt) {
        this.subscribedAt = subscribedAt;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public String getSubscriptionSource() {
        return subscriptionSource;
    }

    public void setSubscriptionSource(String subscriptionSource) {
        this.subscriptionSource = subscriptionSource;
    }
}