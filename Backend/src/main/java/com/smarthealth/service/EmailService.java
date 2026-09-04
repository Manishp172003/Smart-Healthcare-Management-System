package com.smarthealth.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

    public void sendVerificationOtp(String toEmail, String recipientName, String otp) {
        String displayName = (recipientName != null && !recipientName.isBlank()) ? recipientName : "Valued Member";

        String banner = "\n" +
                "=========================================================================\n" +
                " 🏥 SMARTHEALTH | SECURE EMAIL VERIFICATION (OTP)\n" +
                "-------------------------------------------------------------------------\n" +
                " To:          " + toEmail + "\n" +
                " Recipient:   " + displayName + "\n" +
                " One-Time Pin [OTP]: " + otp + "\n" +
                " Expiry:      10 Minutes\n" +
                " Security:    Do not share this code with anyone.\n" +
                "=========================================================================\n";

        System.out.println(banner);
        logger.info("Sent verification OTP [{}] to email [{}]", otp, toEmail);
    }
}
