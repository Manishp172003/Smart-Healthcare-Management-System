package com.smarthealth.service;

import com.smarthealth.entity.NewsletterSubscriber;
import com.smarthealth.repository.NewsletterSubscriberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class NewsletterService {

    @Autowired
    private NewsletterSubscriberRepository newsletterSubscriberRepository;

    public NewsletterSubscriber subscribe(String email, String subscriptionSource) {
        // Check if email already exists
        Optional<NewsletterSubscriber> existingSubscriber = newsletterSubscriberRepository.findByEmail(email);

        if (existingSubscriber.isPresent()) {
            // If exists but inactive, reactivate it
            NewsletterSubscriber subscriber = existingSubscriber.get();
            if (!subscriber.getIsActive()) {
                subscriber.setIsActive(true);
                subscriber.setSubscriptionSource(subscriptionSource);
                return newsletterSubscriberRepository.save(subscriber);
            }
            // If already active, return existing subscriber
            return subscriber;
        }

        // Create new subscriber
        NewsletterSubscriber newSubscriber = new NewsletterSubscriber(email, subscriptionSource);
        return newsletterSubscriberRepository.save(newSubscriber);
    }

    public boolean unsubscribe(String email) {
        Optional<NewsletterSubscriber> subscriber = newsletterSubscriberRepository.findByEmail(email);
        if (subscriber.isPresent()) {
            NewsletterSubscriber sub = subscriber.get();
            sub.setIsActive(false);
            newsletterSubscriberRepository.save(sub);
            return true;
        }
        return false;
    }

    public Optional<NewsletterSubscriber> findByEmail(String email) {
        return newsletterSubscriberRepository.findByEmail(email);
    }

    public boolean isSubscribed(String email) {
        return newsletterSubscriberRepository.findByEmail(email)
                .map(NewsletterSubscriber::getIsActive)
                .orElse(false);
    }

    public List<NewsletterSubscriber> getAllSubscribers() {
        return newsletterSubscriberRepository.findAll();
    }
}