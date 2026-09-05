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
        System.out.println(">>> Checking and synchronizing all 15 canonical doctors in Smart_health MySQL database...");

        // Ensure Doctor #2 matches Dr. Vikram Shenoy if previously seeded with another email
        doctorRepository.findById(2L).ifPresent(doc -> {
            User u = doc.getUser();
            if (!"vikram.shenoy@smarthealth.com".equalsIgnoreCase(u.getEmail())) {
                u.setName("Dr. Vikram Shenoy");
                u.setEmail("vikram.shenoy@smarthealth.com");
                u.setEmailVerified(true);
                userRepository.save(u);
            }
            doc.setSpecialization("Neurologist");
            doc.setBio("Senior Neurologist and Spine specialist specializing in stroke recovery, migraine management, and brain health.");
            doc.setConsultationFee(1800);
            doc.setRating(4.9);
            doc.setEducation("MBBS, MD, DM (Neurology) - NIMHANS");
            doc.setExperience("15+ Years");
            doc.setSupportsTelehealth(true);
            doctorRepository.save(doc);
        });

        // 1. Dr. Ananya Sharma - Cardiology
        ensureDoctor("Dr. Ananya Sharma", "ananya.sharma@smarthealth.com", "Cardiologist",
                "MH-MED-34211", "Senior Consultant Interventional Cardiologist with over 12 years of experience in complex coronary interventions, heart failure management, and preventive cardiovascular care.",
                1500, 4.9, "12+ Years", "MBBS - GMC Nagpur, MD (Cardiology) - KEM Hospital, Mumbai");

        // 2. Dr. Vikram Shenoy - Neurology
        ensureDoctor("Dr. Vikram Shenoy", "vikram.shenoy@smarthealth.com", "Neurologist",
                "MH-MED-19842", "Senior Neurologist and Spine specialist specializing in stroke recovery, migraine management, and brain health.",
                1800, 4.9, "15+ Years", "MBBS, MD, DM (Neurology) - NIMHANS");

        // 3. Dr. Priya Kapoor - Dermatology
        ensureDoctor("Dr. Priya Kapoor", "priya.kapoor@smarthealth.com", "Dermatologist",
                "MH-DERM-48912", "Specialist in clinical and aesthetic dermatology, acne scarring treatments, and advanced laser skin rejuvenation therapies.",
                1200, 4.9, "8+ Years", "MBBS, MD (Dermatology) - Topiwala National Medical College");

        // 4. Dr. Arjun Verma - Orthopedics
        ensureDoctor("Dr. Arjun Verma", "arjun.verma@smarthealth.com", "Orthopedic Surgeon",
                "MH-ORTHO-77123", "Expert orthopedic and joint replacement surgeon with focus on minimally invasive knee and hip arthroplasty.",
                1400, 4.7, "11+ Years", "MBBS, MS (Orthopedics) - AIIMS");

        // 5. Dr. Neha Joshi - Pediatrics
        ensureDoctor("Dr. Neha Joshi", "neha.joshi@smarthealth.com", "Pediatrician",
                "MH-PED-88124", "Dedicated child health specialist providing comprehensive neonatal intensive care, pediatric immunization, and developmental milestones tracking.",
                900, 4.8, "9+ Years", "MBBS, DCH, DNB (Pediatrics)");

        // 6. Dr. Kabir Malhotra - General Medicine
        ensureDoctor("Dr. Kabir Malhotra", "kabir.malhotra@smarthealth.com", "General Physician",
                "MH-GEN-55410", "Consultant internal medicine physician managing lifestyle disorders, chronic hypertension, diabetes mellitus, and acute infectious illnesses.",
                800, 4.8, "14+ Years", "MBBS, MD (Internal Medicine)");

        // 7. Dr. Sneha Kulkarni - Gynecology
        ensureDoctor("Dr. Sneha Kulkarni", "sneha.kulkarni@smarthealth.com", "Gynecologist",
                "MH-GYN-99120", "Consultant obstetrician and gynecological laparoscopic surgeon specializing in high-risk pregnancies and reproductive endocrine health.",
                1600, 4.9, "13+ Years", "MBBS, MS (Obstetrics & Gynecology)");

        // 8. Dr. Rajesh Patel - Neurology
        ensureDoctor("Dr. Rajesh Patel", "rajesh.patel@smarthealth.com", "Neurologist",
                "MH-NEURO-88219", "Senior Consultant Neurologist and Neuro-Interventionist with expertise in neuro-critical care, epileptic seizure management, Parkinson's disease, and memory disorders.",
                2500, 4.8, "16+ Years", "MBBS, MD (Neurology) - NIMHANS, Bangalore");

        // 9. Dr. Anjali Deshmukh - Dentistry
        ensureDoctor("Dr. Anjali Deshmukh", "anjali.deshmukh@smarthealth.com", "Dentist",
                "MH-DENT-33182", "Specialized maxillofacial and cosmetic dental surgeon delivering painless root canal therapies, dental implants, teeth alignment, and comprehensive oral surgery.",
                800, 4.7, "11+ Years", "BDS, MDS (Oral Surgery) - GDCH, Mumbai");

        // 10. Dr. Vikram Singh - Ophthalmology
        ensureDoctor("Dr. Vikram Singh", "vikram.singh@smarthealth.com", "Ophthalmologist",
                "MH-OPHTH-44129", "Renowned ophthalmic microsurgeon specializing in sutureless phacoemulsification cataract surgeries, corneal laser procedures, and glaucoma therapies.",
                1200, 4.9, "14+ Years", "MBBS, MS (Ophthalmology) - AIIMS, Delhi");

        // 11. Dr. Meera Krishnan - Endocrinology
        ensureDoctor("Dr. Meera Krishnan", "meera.krishnan@smarthealth.com", "Endocrinologist",
                "MH-ENDO-55102", "Leading clinical endocrinologist specializing in complex diabetes management, thyroid autoimmune diseases, metabolic bone disorders, and adrenal dysfunction.",
                1800, 4.8, "12+ Years", "MBBS, MD, DM (Endocrinology) - CMC Vellore");

        // 12. Dr. Amit Verma - Nephrology
        ensureDoctor("Dr. Amit Verma", "amit.verma@smarthealth.com", "Nephrologist",
                "MH-NEPH-66190", "Senior nephrologist and transplant physician managing chronic kidney disorders, glomerulonephritis, peritoneal dialysis, and preventive renal care.",
                2200, 4.7, "15+ Years", "MBBS, MD, DM (Nephrology) - PGI Chandigarh");

        // 13. Dr. Sunita Rao - Psychiatry
        ensureDoctor("Dr. Sunita Rao", "sunita.rao@smarthealth.com", "Psychiatrist",
                "MH-PSY-77180", "Holistic psychiatrist and cognitive behavioral therapy specialist dedicated to anxiety management, clinical depression, stress recovery, and sleep disorder therapies.",
                1500, 4.9, "10+ Years", "MBBS, MD (Psychiatry) - NIMHANS, Bangalore");

        // 14. Dr. Karthik Menon - Gastroenterology
        ensureDoctor("Dr. Karthik Menon", "karthik.menon@smarthealth.com", "Gastroenterologist",
                "MH-GASTRO-88195", "Expert gastroenterologist and therapeutic endoscopist specializing in acid reflux, inflammatory bowel disease (IBD), fatty liver disease, and gastrointestinal oncology.",
                2000, 4.8, "13+ Years", "MBBS, MD, DM (Gastroenterology) - KEM Hospital");

        // 15. Dr. Rohan Mehra - Neurology
        ensureDoctor("Dr. Rohan Mehra", "rohan.mehra@smarthealth.com", "Neurologist",
                "MH-NEURO-99214", "Consultant Neurologist specializing in neuro-rehabilitation, peripheral nerve disorders, and epilepsy treatment.",
                1400, 4.8, "10+ Years", "MBBS, MD (Neurology) - AFMC Pune");

        System.out.println(">>> Total Doctors in MySQL: " + doctorRepository.count());

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

        // Ensure all users have emailVerified = true
        userRepository.findAll().forEach(u -> {
            if (!Boolean.TRUE.equals(u.getEmailVerified())) {
                u.setEmailVerified(true);
                userRepository.save(u);
            }
        });
    }

    private void ensureDoctor(String name, String email, String specialization, String license, String bio, int fee, double rating, String exp, String edu) {
        Optional<User> existingUser = userRepository.findByEmail(email);
        User user;
        if (existingUser.isEmpty()) {
            User newUser = new User();
            newUser.setName(name);
            newUser.setEmail(email);
            newUser.setPassword(passwordEncoder.encode("password123"));
            newUser.setRole(Role.ROLE_DOCTOR);
            newUser.setStatus(UserStatus.ACTIVE);
            newUser.setEmailVerified(true);
            user = userRepository.save(newUser);
        } else {
            user = existingUser.get();
            user.setName(name);
            user.setRole(Role.ROLE_DOCTOR);
            user.setStatus(UserStatus.ACTIVE);
            user.setEmailVerified(true);
            user = userRepository.save(user);
        }

        Optional<Doctor> existingDoctor = doctorRepository.findByUserId(user.getId());
        if (existingDoctor.isEmpty()) {
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
            System.out.println(">>> Seeded new doctor into MySQL: " + name + " (" + specialization + ")");
        } else {
            Doctor doctor = existingDoctor.get();
            doctor.setSpecialization(specialization);
            doctor.setBio(bio);
            doctor.setConsultationFee(fee);
            doctor.setRating(rating);
            doctor.setExperience(exp);
            doctor.setEducation(edu);
            doctor.setSupportsTelehealth(true);
            doctorRepository.save(doctor);
        }
    }
}
