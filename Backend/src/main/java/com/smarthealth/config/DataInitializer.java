package com.smarthealth.config;

import com.smarthealth.entity.Doctor;
import com.smarthealth.entity.Role;
import com.smarthealth.entity.User;
import com.smarthealth.entity.UserStatus;
import com.smarthealth.repository.DoctorRepository;
import com.smarthealth.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class DataInitializer implements CommandLineRunner {

    private final DoctorRepository doctorRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(DoctorRepository doctorRepository, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.doctorRepository = doctorRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @org.springframework.transaction.annotation.Transactional
    public void run(String... args) {
        if (doctorRepository.count() == 0) {
            System.out.println(">>> Initializing 7 canonical doctors in Smart_health MySQL database...");

            createDoctor("Dr. Ananya Sharma", "ananya.sharma@smarthealth.com", "Cardiologist",
                    "MH-MED-34211", "Senior Consultant Interventional Cardiologist with over 12 years of experience in complex coronary interventions, heart failure management, and preventive cardiovascular care.",
                    1500, 4.9, "12+ Years", "MBBS - GMC Nagpur, MD (Cardiology) - KEM Hospital, Mumbai");

            createDoctor("Dr. Sarah Jenkins", "sarah.jenkins@smarthealth.com", "Interventional Cardiologist",
                    "MH-MED-19842", "Leading interventional specialist focusing on advanced cardiac rhythm management and catheter-based therapies.",
                    2200, 4.9, "15+ Years", "MBBS, MD - Cardiology (FACC)");

            createDoctor("Dr. Priya Kapoor", "priya.kapoor@smarthealth.com", "Dermatologist",
                    "MH-DERM-48912", "Specialist in clinical and aesthetic dermatology, acne scarring treatments, and advanced laser skin rejuvenation therapies.",
                    1200, 4.9, "8+ Years", "MBBS, MD (Dermatology) - Topiwala National Medical College");

            createDoctor("Dr. Arjun Verma", "arjun.verma@smarthealth.com", "Orthopedic Surgeon",
                    "MH-ORTHO-77123", "Expert orthopedic and joint replacement surgeon with focus on minimally invasive knee and hip arthroplasty.",
                    1400, 4.7, "11+ Years", "MBBS, MS (Orthopedics) - AIIMS");

            createDoctor("Dr. Neha Joshi", "neha.joshi@smarthealth.com", "Pediatrician",
                    "MH-PED-88124", "Dedicated child health specialist providing comprehensive neonatal intensive care, pediatric immunization, and developmental milestones tracking.",
                    900, 4.8, "9+ Years", "MBBS, DCH, DNB (Pediatrics)");

            createDoctor("Dr. Kabir Malhotra", "kabir.malhotra@smarthealth.com", "General Physician",
                    "MH-GEN-55410", "Consultant internal medicine physician managing lifestyle disorders, chronic hypertension, diabetes mellitus, and acute infectious illnesses.",
                    800, 4.6, "7+ Years", "MBBS, MD (Internal Medicine)");

            createDoctor("Dr. Sneha Kulkarni", "sneha.kulkarni@smarthealth.com", "Gynecologist",
                    "MH-GYN-99120", "Consultant obstetrician and gynecological laparoscopic surgeon specializing in high-risk pregnancies and reproductive endocrine health.",
                    1600, 4.9, "13+ Years", "MBBS, MS (Obstetrics & Gynecology)");

            System.out.println(">>> Initialized 7 doctors successfully in MySQL!");
        }

        // Ensure canonical Admin user exists
        if (userRepository.findByEmail("admin@smarthealth.com").isEmpty()) {
            User admin = new User();
            admin.setName("System Administrator");
            admin.setEmail("admin@smarthealth.com");
            admin.setPassword(passwordEncoder.encode("Admin@123"));
            admin.setRole(Role.ROLE_ADMIN);
            admin.setStatus(UserStatus.ACTIVE);
            admin.setEmailVerified(true);
            userRepository.save(admin);
            System.out.println(">>> Seeded default administrator: admin@smarthealth.com / Admin@123");
        }

        // Ensure canonical Patient user exists
        if (userRepository.findByEmail("patient@smarthealth.com").isEmpty()) {
            User patient = new User();
            patient.setName("Manish Pawar");
            patient.setEmail("patient@smarthealth.com");
            patient.setPassword(passwordEncoder.encode("password123"));
            patient.setRole(Role.ROLE_PATIENT);
            patient.setStatus(UserStatus.ACTIVE);
            patient.setEmailVerified(true);
            userRepository.save(patient);
            System.out.println(">>> Seeded default patient: patient@smarthealth.com / password123");
        }

        userRepository.findByEmail("manishpawar172003@gmail.com").ifPresent(user -> {
            user.setPassword(passwordEncoder.encode("password123"));
            user.setEmailVerified(true);
            userRepository.save(user);
            System.out.println(">>> Synchronized manishpawar172003@gmail.com password to password123");
        });

        // Ensure all seeded doctors have emailVerified = true
        userRepository.findAll().forEach(u -> {
            if (!Boolean.TRUE.equals(u.getEmailVerified())) {
                u.setEmailVerified(true);
                userRepository.save(u);
            }
        });

        // Ensure Doctor #2 matches Dr. Vikram Shenoy from Find Doctors
        doctorRepository.findById(2L).ifPresent(doc -> {
            if (!doc.getUser().getName().equals("Dr. Vikram Shenoy")) {
                doc.getUser().setName("Dr. Vikram Shenoy");
                doc.getUser().setEmail("vikram.shenoy@smarthealth.com");
                doc.setSpecialization("Neurologist");
                doc.setBio("Senior Neurologist and Spine specialist specializing in stroke recovery, migraine management, and brain health.");
                doc.setConsultationFee(1800);
                doc.setEducation("MBBS, MD, DM (Neurology) - NIMHANS");
                doc.setExperience("15+ Years");
                doctorRepository.save(doc);
                System.out.println(">>> Synchronized Doctor #2 to Dr. Vikram Shenoy (Neurologist)!");
            }
        });
    }

    private void createDoctor(String name, String email, String specialization, String license, String bio, int fee, double rating, String exp, String edu) {
        Optional<User> existingUser = userRepository.findByEmail(email);
        User user = existingUser.orElseGet(() -> {
            User newUser = new User();
            newUser.setName(name);
            newUser.setEmail(email);
            newUser.setPassword(passwordEncoder.encode("password123"));
            newUser.setRole(Role.ROLE_DOCTOR);
            newUser.setStatus(UserStatus.ACTIVE);
            newUser.setEmailVerified(true);
            return userRepository.save(newUser);
        });

        Doctor doctor = new Doctor();
        doctor.setUser(user);
        doctor.setSpecialization(specialization);
        doctor.setLicenseNumber(license);
        doctor.setBio(bio);
        doctor.setConsultationFee(fee);
        doctor.setRating(rating);
        doctor.setExperience(exp);
        doctor.setEducation(edu);
        doctor.setSupportsTelehealth(true);
        doctor.setSlotDurationMinutes(30);

        doctorRepository.save(doctor);
    }
}
