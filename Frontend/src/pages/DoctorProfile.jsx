import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

// Import local doctor assets
import doctorImg1 from "../assets/FindDoctors/Doctor-img-1.png";
import doctorImg2 from "../assets/FindDoctors/Doctor-img-2.png";
import doctorImg3 from "../assets/FindDoctors/Doctor-img-3.png";
import doctorImg4 from "../assets/FindDoctors/Doctor-img-4.png";
import doctorImg5 from "../assets/FindDoctors/Doctor-img-5.png";
import doctorImg6 from "../assets/FindDoctors/New-Doctor-img.png";
import doctorImg7 from "../assets/FindDoctors/Doctor-img-7.png";
import doctorImg8 from "../assets/FindDoctors/Doctor-img-8.png";
import doctorImg9 from "../assets/FindDoctors/Doctor-img-9.png";
import doctorImg10 from "../assets/FindDoctors/Doctor-img-10.png";
import doctorImg11 from "../assets/FindDoctors/Doctor-img-11.png";
import doctorImg12 from "../assets/FindDoctors/Doctor-img-12.png";
import doctorImg13 from "../assets/FindDoctors/Doctor-img-13.png";
import doctorImg14 from "../assets/FindDoctors/Doctor-img-14.png";

import {
  MapPin,
  Star,
  Phone,
  Mail,
  Calendar,
  Clock,
  Award,
  GraduationCap,
  User,
  Video,
  CheckCircle,
  ArrowLeft,
  Heart,
  Share2,
  ChevronRight,
  Stethoscope,
  ShieldCheck,
  Users,
  Clock4,
  Building,
  CheckCircle2,
  CalendarCheck,
  Copy,
  Activity
} from "lucide-react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { motion } from "framer-motion";

const DoctorProfile = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [appointmentHistory, setAppointmentHistory] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [copiedToast, setCopiedToast] = useState(false);

  // Doctors Database with individual unique consultation fees and profiles
  const DOCTORS_DATABASE = {
    "1": {
      id: "1",
      name: "Dr. Ananya Sharma",
      specialization: "Cardiologist",
      experience: "12+ Years",
      education: "MBBS - GMC Nagpur, MD (Cardiology) - KEM Hospital, Mumbai",
      licenseNumber: "MH-MED-34211",
      hospital: "Nagpur Heart Institute & Research Center",
      address: "Plot 14, Central Avenue, Near Ramdaspeth, Nagpur, Maharashtra 440010",
      phone: "+91 98221 44550",
      email: "dr.ananya.sharma@smarthealth.com",
      rating: 4.9,
      reviewsCount: 124,
      consultationFee: 1500,
      bio: "Dr. Ananya Sharma is a dedicated cardiologist specializing in non-invasive cardiology, preventive heart healthcare, and cardiac rehabilitation. With over 12 years of clinical excellence in central India, she has helped thousands of patients prevent and manage coronary artery disease.",
      languages: ["English", "Hindi", "Marathi"],
      availability: "Available Today",
      nextSlot: "06:30 PM",
      remainingPatientsToday: 8,
      supportsTelehealth: true,
      imageUrl: doctorImg1,
      schedule: [
        { day: "Monday", time: "10:00 - 19:00", status: "Open" },
        { day: "Tuesday", time: "10:00 - 19:00", status: "Open" },
        { day: "Wednesday", time: "10:00 - 19:00", status: "Open" },
        { day: "Thursday", time: "10:00 - 19:00", status: "Open" },
        { day: "Friday", time: "10:00 - 19:00", status: "Open" },
        { day: "Saturday", time: "10:00 - 15:00", status: "Half Day" },
        { day: "Sunday", time: "Closed / Emergency Call", status: "Emergency" },
      ],
      experienceTimeline: [
        {
          role: "Senior Consultant Cardiologist",
          institution: "Nagpur Heart Institute",
          period: "2019 - Present",
          desc: "Head of Non-Invasive Diagnostics and Preventive Cardiac Wellness program."
        },
        {
          role: "Associate Consultant",
          institution: "KEM Hospital, Mumbai",
          period: "2015 - 2019",
          desc: "Specialized in 2D Echocardiography, Holter monitoring, and stress tests."
        }
      ],
      educationDetails: [
        "MBBS - Government Medical College (GMC), Nagpur (2007)",
        "MD (General Medicine) - GMC Nagpur (2011)",
        "DM (Cardiology) - King Edward Memorial Hospital, Mumbai (2015)"
      ],
      awards: [
        "Vidarbha Medical Leadership Award - 2023",
        "Best Research Paper in Preventive Cardiology - CSI 2020"
      ],
      specializations: [
        "Preventive Cardiology",
        "Coronary Artery Disease Management",
        "Hypertension & Lipid Disorders",
        "Echocardiography & TMT",
        "Heart Failure Rehabilitation"
      ]
    },

    "2": {
      id: "2",
      name: "Dr. Vikram Shenoy",
      specialization: "Neurologist & Spine Specialist",
      experience: "15+ Years",
      education: "MBBS, MD, DM (Neurology) - NIMHANS, Bangalore",
      licenseNumber: "MH-NEUR-55210",
      hospital: "Apex Neuro & Stroke Center, Nagpur",
      address: "2nd Floor, Ramdaspeth Medical Enclave, Nagpur, Maharashtra 440010",
      phone: "+91 98221 44551",
      email: "vikram.shenoy@smarthealth.com",
      rating: 4.9,
      reviewsCount: 148,
      consultationFee: 1800,
      bio: "Dr. Vikram Shenoy is a senior neurologist and neuro-rehabilitation specialist with over 15 years of distinguished clinical experience. He specializes in acute stroke management, epilepsy, migraine therapies, and complex peripheral nerve disorders.",
      languages: ["English", "Hindi", "Marathi"],
      availability: "Available Today",
      nextSlot: "04:30 PM",
      remainingPatientsToday: 12,
      supportsTelehealth: true,
      imageUrl: doctorImg2,
      schedule: [
        { day: "Monday", time: "09:00 - 18:00", status: "Open" },
        { day: "Tuesday", time: "09:00 - 18:00", status: "Open" },
        { day: "Wednesday", time: "09:00 - 18:00", status: "Open" },
        { day: "Thursday", time: "09:00 - 18:00", status: "Open" },
        { day: "Friday", time: "09:00 - 18:00", status: "Open" },
        { day: "Saturday", time: "10:00 - 15:00", status: "Half Day" },
        { day: "Sunday", time: "On Emergency Call", status: "Emergency" },
      ],
      experienceTimeline: [
        {
          role: "Senior Consultant Neurologist & Stroke Director",
          institution: "Apex Neuro Center, Nagpur",
          period: "2018 - Present",
          desc: "Leading the acute stroke thrombolysis protocol and neuro-critical ICU service."
        },
        {
          role: "Associate Neurologist",
          institution: "NIMHANS, Bangalore",
          period: "2012 - 2018",
          desc: "Conducted clinical trials on intractable migraines and refractory epilepsy."
        }
      ],
      educationDetails: [
        "MBBS - Government Medical College, Nagpur (2006)",
        "MD (General Medicine) - KEM Hospital, Mumbai (2010)",
        "DM (Neurology) - NIMHANS, Bangalore (2014)"
      ],
      awards: [
        "Distinguished Neurologist of Maharashtra - 2022",
        "Best Clinical Presentation in Stroke Care - IAN 2019"
      ],
      specializations: [
        "Acute Stroke Care & Rehabilitation",
        "Refractory Migraine Management",
        "Epilepsy & Seizure Disorders",
        "Parkinson's & Movement Disorders",
        "Peripheral Neuropathy"
      ]
    },

    "3": {
      id: "3",
      name: "Dr. Priya Kapoor",
      specialization: "Dermatologist & Cosmetologist",
      experience: "8+ Years",
      education: "MBBS, DDVL - Grant Medical College, Mumbai",
      licenseNumber: "MH-DERM-88912",
      hospital: "Aura Skin & Aesthetic Clinic, Mumbai",
      address: "7th Floor, Linking Road, Bandra West, Mumbai, Maharashtra 400050",
      phone: "+91 98192 33441",
      email: "dr.priya.kapoor@smarthealth.com",
      rating: 4.9,
      reviewsCount: 156,
      consultationFee: 1200,
      bio: "Dr. Priya Kapoor is an expert clinical and cosmetic dermatologist specializing in advanced laser therapies, acne scarring, eczema, psoriasis, and anti-aging aesthetic treatments with natural results.",
      languages: ["English", "Hindi"],
      availability: "Available Tomorrow",
      nextSlot: "10:00 AM",
      remainingPatientsToday: 12,
      supportsTelehealth: true,
      imageUrl: doctorImg3,
      schedule: [
        { day: "Monday", time: "11:00 - 20:00", status: "Open" },
        { day: "Tuesday", time: "11:00 - 20:00", status: "Open" },
        { day: "Wednesday", time: "11:00 - 20:00", status: "Open" },
        { day: "Thursday", time: "11:00 - 20:00", status: "Open" },
        { day: "Friday", time: "11:00 - 20:00", status: "Open" },
        { day: "Saturday", time: "10:00 - 16:00", status: "Open" },
        { day: "Sunday", time: "Closed", status: "Closed" },
      ],
      experienceTimeline: [
        {
          role: "Head Dermatologist & Founder",
          institution: "Aura Skin & Aesthetic Clinic",
          period: "2020 - Present",
          desc: "Providing precision clinical dermatological care and safe cosmetic laser treatments."
        },
        {
          role: "Consultant Dermatologist",
          institution: "Hinduja Healthcare, Mumbai",
          period: "2016 - 2020",
          desc: "Managed outpatient dermatology clinic and pediatric skin disorders."
        }
      ],
      educationDetails: [
        "MBBS - Grant Medical College, Mumbai (2012)",
        "DDVL (Dermatology, Venereology & Leprosy) - CPS Mumbai (2015)",
        "Fellowship in Aesthetic Medicine - FAM Germany (2017)"
      ],
      awards: [
        "Young Dermatologist of the Year - IADVL 2021",
        "Excellence in Aesthetic Dermatology - Mumbai Health Summit 2020"
      ],
      specializations: [
        "Clinical Dermatology",
        "Acne & Scar Revision",
        "Laser Hair & Pigment Removal",
        "Anti-Aging & Collagen Treatments",
        "Hair Fall & PRP Therapy"
      ]
    },

    "4": {
      id: "4",
      name: "Dr. Arjun Verma",
      specialization: "Orthopedic Surgeon",
      experience: "11+ Years",
      education: "MBBS, MS (Orthopedics) - AIIMS, Fellowship in Joint Replacement",
      licenseNumber: "MH-ORTH-55421",
      hospital: "Care Ortho & Joint Replacement Center, Nagpur",
      address: "3rd Floor, Medicity Complex, Dhantoli, Nagpur, Maharashtra 440012",
      phone: "+91 98230 77889",
      email: "dr.arjun.verma@smarthealth.com",
      rating: 4.7,
      reviewsCount: 87,
      consultationFee: 1400,
      bio: "Dr. Arjun Verma is a distinguished orthopedic surgeon focused on knee and hip arthroplasty, arthroscopic ligament reconstruction, and complex trauma fractures. He utilizes minimally invasive techniques for faster recovery.",
      languages: ["English", "Hindi", "Marathi"],
      availability: "Available Today",
      nextSlot: "05:15 PM",
      remainingPatientsToday: 6,
      supportsTelehealth: true,
      imageUrl: doctorImg4,
      schedule: [
        { day: "Monday", time: "09:00 - 17:00", status: "Open" },
        { day: "Tuesday", time: "09:00 - 17:00", status: "Open" },
        { day: "Wednesday", time: "09:00 - 17:00", status: "Open" },
        { day: "Thursday", time: "09:00 - 17:00", status: "Open" },
        { day: "Friday", time: "09:00 - 17:00", status: "Open" },
        { day: "Saturday", time: "09:00 - 14:00", status: "Open" },
        { day: "Sunday", time: "Emergency Surgeries Only", status: "Emergency" },
      ],
      experienceTimeline: [
        {
          role: "Chief Orthopedic Consultant",
          institution: "Care Ortho Center, Nagpur",
          period: "2019 - Present",
          desc: "Directing joint replacement surgery department with over 2,000 successful surgeries."
        }
      ],
      educationDetails: [
        "MBBS - Indira Gandhi Government Medical College, Nagpur (2009)",
        "MS (Orthopedics) - All India Institute of Medical Sciences (AIIMS), New Delhi (2013)",
        "Fellowship in Joint Replacement - Asklepios Orthopedic Clinic, Germany (2015)"
      ],
      awards: [
        "Excellence in Robotic Joint Surgery - Vidarbha Ortho Association 2022"
      ],
      specializations: [
        "Total Knee Replacement (TKR)",
        "Total Hip Replacement (THR)",
        "Arthroscopy & Sports Injuries",
        "Spine & Sciatica Management",
        "Complex Fracture Care"
      ]
    },

    "5": {
      id: "5",
      name: "Dr. Neha Joshi",
      specialization: "Pediatrician",
      experience: "9+ Years",
      education: "MBBS, DCH, DNB (Pediatrics) - B.J. Medical College, Pune",
      licenseNumber: "MH-PED-44109",
      hospital: "Sunshine Children's Clinic, Nagpur",
      address: "21, Medical Square, Hanuman Nagar, Nagpur, Maharashtra 440009",
      phone: "+91 98225 66778",
      email: "dr.neha.joshi@smarthealth.com",
      rating: 4.9,
      reviewsCount: 142,
      consultationFee: 900,
      bio: "Dr. Neha Joshi provides compassionate, evidence-based pediatric care for infants, children, and adolescents. She is highly experienced in immunization schedules, newborn nutrition, childhood allergies, and adolescent wellness.",
      languages: ["English", "Hindi", "Marathi"],
      availability: "Available Today",
      nextSlot: "03:00 PM",
      remainingPatientsToday: 14,
      supportsTelehealth: true,
      imageUrl: doctorImg5,
      schedule: [
        { day: "Monday", time: "09:30 - 18:30", status: "Open" },
        { day: "Tuesday", time: "09:30 - 18:30", status: "Open" },
        { day: "Wednesday", time: "09:30 - 18:30", status: "Open" },
        { day: "Thursday", time: "09:30 - 18:30", status: "Open" },
        { day: "Friday", time: "09:30 - 18:30", status: "Open" },
        { day: "Saturday", time: "09:30 - 16:00", status: "Open" },
        { day: "Sunday", time: "Emergency Consultation 10:00 - 12:00", status: "Open" },
      ],
      experienceTimeline: [
        {
          role: "Head Pediatrician",
          institution: "Sunshine Children's Clinic",
          period: "2018 - Present",
          desc: "Delivering primary pediatric care, growth screening, and adolescent developmental tracking."
        }
      ],
      educationDetails: [
        "MBBS - Government Medical College, Akola (2011)",
        "DCH (Diploma in Child Health) - B.J. Medical College, Pune (2014)",
        "DNB (Pediatrics) - National Board of Examinations (2016)"
      ],
      awards: [
        "Child Healthcare Champion Award - IAP Nagpur 2022"
      ],
      specializations: [
        "General Pediatrics & Child Health",
        "Newborn & Infant Care",
        "Pediatric Vaccination & Nutrition",
        "Asthma & Respiratory Allergies",
        "Developmental Milestones Tracking"
      ]
    },

    "6": {
      id: "6",
      name: "Dr. Kabir Malhotra",
      specialization: "General Physician & Internal Medicine",
      experience: "14+ Years",
      education: "MBBS, MD (General Medicine) - AFMC Pune",
      licenseNumber: "MH-GEN-77319",
      hospital: "PrimeCare Multi-Specialty Clinic, Pune",
      address: "12, FC Road, Shivajinagar, Pune, Maharashtra 411005",
      phone: "+91 98500 11223",
      email: "dr.kabir.malhotra@smarthealth.com",
      rating: 4.8,
      reviewsCount: 113,
      consultationFee: 800,
      bio: "Dr. Kabir Malhotra is an internal medicine physician focusing on primary care, chronic disease management, diabetes, thyroid disorders, and infectious illnesses. He believes in comprehensive preventative evaluations.",
      languages: ["English", "Hindi", "Punjabi"],
      availability: "Available Today",
      nextSlot: "03:00 PM",
      remainingPatientsToday: 15,
      supportsTelehealth: true,
      imageUrl: doctorImg6,
      schedule: [
        { day: "Monday", time: "08:30 - 17:30", status: "Open" },
        { day: "Tuesday", time: "08:30 - 17:30", status: "Open" },
        { day: "Wednesday", time: "08:30 - 17:30", status: "Open" },
        { day: "Thursday", time: "08:30 - 17:30", status: "Open" },
        { day: "Friday", time: "08:30 - 17:30", status: "Open" },
        { day: "Saturday", time: "08:30 - 14:00", status: "Open" },
        { day: "Sunday", time: "Closed", status: "Closed" },
      ],
      experienceTimeline: [
        {
          role: "Senior Consultant - Internal Medicine",
          institution: "PrimeCare Clinic, Pune",
          period: "2017 - Present",
          desc: "Leading general outpatient clinic, lifestyle medicine, and diabetes reversal programs."
        }
      ],
      educationDetails: [
        "MBBS - Armed Forces Medical College (AFMC), Pune (2007)",
        "MD (General Medicine) - AFMC Pune (2012)"
      ],
      awards: [
        "Excellence in Community Medicine - Pune Doctors Forum 2021"
      ],
      specializations: [
        "Internal Medicine & Diagnosis",
        "Diabetes Mellitus Management",
        "Hypertension & Metabolic Syndrome",
        "Fever & Viral Infections",
        "Preventative Health Checkups"
      ]
    },

    "7": {
      id: "7",
      name: "Dr. Sneha Kulkarni",
      specialization: "Gynecologist & Obstetrician",
      experience: "13+ Years",
      education: "MBBS, MS (Obstetrics & Gynecology) - KEM Hospital, Mumbai",
      licenseNumber: "MH-GYN-99214",
      hospital: "Motherhood Care & Wellness Center, Mumbai",
      address: "5th Floor, Dadar West, Mumbai, Maharashtra 400028",
      phone: "+91 98205 99881",
      email: "dr.sneha.kulkarni@smarthealth.com",
      rating: 4.9,
      reviewsCount: 178,
      consultationFee: 1600,
      bio: "Dr. Sneha Kulkarni is a senior gynecologist and obstetrician specializing in high-risk pregnancies, PCOS/PCOD management, infertility counseling, and minimally invasive gynecological laparoscopy.",
      languages: ["English", "Hindi", "Marathi"],
      availability: "Available Tomorrow",
      nextSlot: "02:00 PM",
      remainingPatientsToday: 9,
      supportsTelehealth: true,
      imageUrl: doctorImg7,
      schedule: [
        { day: "Monday", time: "10:00 - 19:00", status: "Open" },
        { day: "Tuesday", time: "10:00 - 19:00", status: "Open" },
        { day: "Wednesday", time: "10:00 - 19:00", status: "Open" },
        { day: "Thursday", time: "10:00 - 19:00", status: "Open" },
        { day: "Friday", time: "10:00 - 19:00", status: "Open" },
        { day: "Saturday", time: "10:00 - 16:00", status: "Open" },
        { day: "Sunday", time: "On Delivery Call", status: "Emergency" },
      ],
      experienceTimeline: [
        {
          role: "Director of Obstetrics & Gynecology",
          institution: "Motherhood Care Center",
          period: "2018 - Present",
          desc: "Managing high-risk maternity wing, laparoscopic surgeries, and adolescent health."
        }
      ],
      educationDetails: [
        "MBBS - KEM Hospital & Seth GS Medical College, Mumbai (2007)",
        "MS (Obstetrics & Gynecology) - KEM Hospital, Mumbai (2011)",
        "Fellowship in Minimal Access Gynecological Surgery - FMAS (2014)"
      ],
      awards: [
        "Women's Health Champion of Maharashtra - MOGS 2022"
      ],
      specializations: [
        "High-Risk Pregnancy & Normal Delivery",
        "PCOS & Hormonal Imbalance",
        "Laparoscopic Gynecological Surgeries",
        "Infertility Evaluation & Care",
        "Menopause & Preventive Wellness"
      ]
    },

    "8": {
      id: "8",
      name: "Dr. Rajesh Patel",
      specialization: "Neurologist",
      experience: "16+ Years",
      education: "MBBS, MD (Neurology) - NIMHANS, Bangalore",
      licenseNumber: "KA-NEU-88214",
      hospital: "NeuroCare Institute, Civil Lines, Nagpur",
      address: "Medical Plaza, Civil Lines, Nagpur, Maharashtra 440001",
      phone: "+91 98220 44550",
      email: "dr.rajesh.patel@smarthealth.com",
      rating: 4.8,
      reviewsCount: 145,
      consultationFee: 2500,
      bio: "Dr. Rajesh Patel is a neurologist specializing in brain disorders, nervous system conditions, and advanced neurological treatments including stroke management and epilepsy care.",
      languages: ["English", "Hindi", "Marathi"],
      availability: "Available Today",
      nextSlot: "03:00 PM",
      remainingPatientsToday: 6,
      supportsTelehealth: true,
      imageUrl: doctorImg8,
      schedule: [
        { day: "Monday", time: "09:00 - 18:00", status: "Open" },
        { day: "Tuesday", time: "09:00 - 18:00", status: "Open" },
        { day: "Wednesday", time: "09:00 - 18:00", status: "Open" },
        { day: "Thursday", time: "09:00 - 18:00", status: "Open" },
        { day: "Friday", time: "09:00 - 18:00", status: "Open" },
        { day: "Saturday", time: "10:00 - 14:00", status: "Half Day" },
        { day: "Sunday", time: "Emergency Call Only", status: "Emergency" },
      ],
      experienceTimeline: [
        {
          role: "Senior Consultant Neurologist",
          institution: "NeuroCare Institute",
          period: "2015 - Present",
          desc: "Leading the neurology department with focus on stroke rehabilitation and epilepsy management."
        }
      ],
      educationDetails: [
        "MBBS - Government Medical College, Nagpur (2003)",
        "MD (General Medicine) - AIIMS, New Delhi (2007)",
        "DM (Neurology) - NIMHANS, Bangalore (2010)"
      ],
      awards: [
        "Best Neurologist Award - Neurology Society of India (2021)"
      ],
      specializations: [
        "Stroke Management & Rehabilitation",
        "Epilepsy Treatment",
        "Headache & Migraine Care",
        "Movement Disorders",
        "Neuro-rehabilitation"
      ]
    },

    "9": {
      id: "9",
      name: "Dr. Anjali Deshmukh",
      specialization: "Dentist & Oral Surgeon",
      experience: "11+ Years",
      education: "BDS, MDS (Oral Surgery) - GDCH, Mumbai",
      licenseNumber: "MH-DEN-73214",
      hospital: "Smile Dental Clinic, Sadar, Nagpur",
      address: "Dental Care Center, Sadar, Nagpur, Maharashtra 440001",
      phone: "+91 98231 33661",
      email: "dr.anjali.deshmukh@smarthealth.com",
      rating: 4.7,
      reviewsCount: 98,
      consultationFee: 800,
      bio: "Dr. Anjali Deshmukh is a specialized dentist providing comprehensive dental care, oral surgery, and cosmetic dentistry services with modern technology.",
      languages: ["English", "Hindi", "Marathi"],
      availability: "Available Today",
      nextSlot: "10:30 AM",
      remainingPatientsToday: 12,
      supportsTelehealth: false,
      imageUrl: doctorImg9,
      schedule: [
        { day: "Monday", time: "10:00 - 20:00", status: "Open" },
        { day: "Tuesday", time: "10:00 - 20:00", status: "Open" },
        { day: "Wednesday", time: "10:00 - 20:00", status: "Open" },
        { day: "Thursday", time: "10:00 - 20:00", status: "Open" },
        { day: "Friday", time: "10:00 - 20:00", status: "Open" },
        { day: "Saturday", time: "09:00 - 15:00", status: "Open" },
        { day: "Sunday", time: "Closed", status: "Closed" },
      ],
      experienceTimeline: [
        {
          role: "Chief Dental Surgeon",
          institution: "Smile Dental Clinic",
          period: "2019 - Present",
          desc: "Providing advanced dental treatments including implants, root canals, and cosmetic dentistry."
        }
      ],
      educationDetails: [
        "BDS - Government Dental College, Mumbai (2009)",
        "MDS (Oral & Maxillofacial Surgery) - GDCH, Mumbai (2013)"
      ],
      awards: [
        "Excellence in Dental Care - Indian Dental Association (2020)"
      ],
      specializations: [
        "Root Canal Treatment",
        "Dental Implants",
        "Cosmetic Dentistry",
        "Oral Surgery",
        "Pediatric Dentistry"
      ]
    },

    "10": {
      id: "10",
      name: "Dr. Vikram Singh",
      specialization: "Ophthalmologist",
      experience: "14+ Years",
      education: "MBBS, MS (Ophthalmology) - AIIMS, Delhi",
      licenseNumber: "DL-OPTH-65214",
      hospital: "Vision Eye Center, Camp, Pune",
      address: "Eye Care Complex, Camp, Pune, Maharashtra 411001",
      phone: "+91 98260 66772",
      email: "dr.vikram.singh@smarthealth.com",
      rating: 4.9,
      reviewsCount: 167,
      consultationFee: 1200,
      bio: "Dr. Vikram Singh is an ophthalmologist specializing in eye surgery, cataract treatment, and comprehensive vision care with advanced diagnostic technology.",
      languages: ["English", "Hindi", "Marathi"],
      availability: "Available Tomorrow",
      nextSlot: "11:00 AM",
      remainingPatientsToday: 0,
      supportsTelehealth: true,
      imageUrl: doctorImg10,
      schedule: [
        { day: "Monday", time: "09:00 - 17:00", status: "Open" },
        { day: "Tuesday", time: "09:00 - 17:00", status: "Open" },
        { day: "Wednesday", time: "09:00 - 17:00", status: "Open" },
        { day: "Thursday", time: "09:00 - 17:00", status: "Open" },
        { day: "Friday", time: "09:00 - 17:00", status: "Open" },
        { day: "Saturday", time: "10:00 - 14:00", status: "Half Day" },
        { day: "Sunday", time: "Emergency Eye Care", status: "Emergency" },
      ],
      experienceTimeline: [
        {
          role: "Senior Ophthalmologist",
          institution: "Vision Eye Center",
          period: "2017 - Present",
          desc: "Specializing in phacoemulsification cataract surgery and glaucoma management."
        }
      ],
      educationDetails: [
        "MBBS - Maulana Azad Medical College, Delhi (2005)",
        "MS (Ophthalmology) - AIIMS, New Delhi (2009)",
        "Fellowship in Cornea & Refractive Surgery - LVPEI, Hyderabad (2011)"
      ],
      awards: [
        "Best Ophthalmologist - Maharashtra Ophthalmological Society (2022)"
      ],
      specializations: [
        "Cataract Surgery",
        "Glaucoma Management",
        "Refractive Surgery (LASIK)",
        "Corneal Disorders",
        "Pediatric Ophthalmology"
      ]
    },

    "11": {
      id: "11",
      name: "Dr. Meera Krishnan",
      specialization: "Endocrinologist",
      experience: "12+ Years",
      education: "MBBS, MD (Endocrinology) - CMC, Vellore",
      licenseNumber: "TN-END-55214",
      hospital: "Diabetes Care Center, Anna Nagar, Chennai",
      address: "Health Plaza, Anna Nagar, Chennai, Tamil Nadu 600040",
      phone: "+91 98270 77883",
      email: "dr.meera.krishnan@smarthealth.com",
      rating: 4.8,
      reviewsCount: 134,
      consultationFee: 1800,
      bio: "Dr. Meera Krishnan is an endocrinologist specializing in diabetes management, hormonal disorders, and metabolic conditions with personalized treatment plans.",
      languages: ["English", "Tamil", "Hindi"],
      availability: "Available Today",
      nextSlot: "02:30 PM",
      remainingPatientsToday: 8,
      supportsTelehealth: true,
      imageUrl: doctorImg11,
      schedule: [
        { day: "Monday", time: "08:00 - 14:00", status: "Open" },
        { day: "Tuesday", time: "08:00 - 14:00", status: "Open" },
        { day: "Wednesday", time: "08:00 - 14:00", status: "Open" },
        { day: "Thursday", time: "08:00 - 14:00", status: "Open" },
        { day: "Friday", time: "08:00 - 14:00", status: "Open" },
        { day: "Saturday", time: "09:00 - 12:00", status: "Half Day" },
        { day: "Sunday", time: "Closed", status: "Closed" },
      ],
      experienceTimeline: [
        {
          role: "Senior Endocrinologist",
          institution: "Diabetes Care Center",
          period: "2018 - Present",
          desc: "Managing diabetes care programs and hormonal disorder treatments."
        }
      ],
      educationDetails: [
        "MBBS - Madras Medical College, Chennai (2008)",
        "MD (General Medicine) - CMC, Vellore (2012)",
        "DM (Endocrinology) - CMC, Vellore (2015)"
      ],
      awards: [
        "Diabetes Care Excellence Award - Indian Endocrine Society (2021)"
      ],
      specializations: [
        "Type 1 & Type 2 Diabetes",
        "Thyroid Disorders",
        "PCOS & Hormonal Imbalance",
        "Metabolic Syndrome",
        "Bone & Mineral Disorders"
      ]
    },

    "12": {
      id: "12",
      name: "Dr. Amit Verma",
      specialization: "Nephrologist",
      experience: "15+ Years",
      education: "MBBS, MD (Nephrology) - PGI, Chandigarh",
      licenseNumber: "PB-NEPH-45214",
      hospital: "Kidney Care Hospital, Secunderabad, Hyderabad",
      address: "Nephrology Wing, Secunderabad, Hyderabad, Telangana 500003",
      phone: "+91 98280 88994",
      email: "dr.amit.verma@smarthealth.com",
      rating: 4.7,
      reviewsCount: 112,
      consultationFee: 2200,
      bio: "Dr. Amit Verma is a nephrologist specializing in kidney diseases, dialysis, and urinary tract disorders with comprehensive renal care services.",
      languages: ["English", "Hindi", "Telugu"],
      availability: "Available Tomorrow",
      nextSlot: "04:00 PM",
      remainingPatientsToday: 0,
      supportsTelehealth: true,
      imageUrl: doctorImg12,
      schedule: [
        { day: "Monday", time: "09:00 - 17:00", status: "Open" },
        { day: "Tuesday", time: "09:00 - 17:00", status: "Open" },
        { day: "Wednesday", time: "09:00 - 17:00", status: "Open" },
        { day: "Thursday", time: "09:00 - 17:00", status: "Open" },
        { day: "Friday", time: "09:00 - 17:00", status: "Open" },
        { day: "Saturday", time: "10:00 - 14:00", status: "Half Day" },
        { day: "Sunday", time: "Dialysis Emergency", status: "Emergency" },
      ],
      experienceTimeline: [
        {
          role: "Head of Nephrology Department",
          institution: "Kidney Care Hospital",
          period: "2016 - Present",
          desc: "Managing dialysis unit, kidney transplant programs, and chronic kidney disease care."
        }
      ],
      educationDetails: [
        "MBBS - Government Medical College, Chandigarh (2004)",
        "MD (Internal Medicine) - PGI, Chandigarh (2008)",
        "DM (Nephrology) - PGI, Chandigarh (2011)"
      ],
      awards: [
        "Excellence in Nephrology Care - Indian Society of Nephrology (2020)"
      ],
      specializations: [
        "Chronic Kidney Disease",
        "Dialysis Management",
        "Kidney Transplant",
        "Glomerular Diseases",
        "Hypertension Nephrology"
      ]
    },

    "13": {
      id: "13",
      name: "Dr. Sunita Rao",
      specialization: "Psychiatrist",
      experience: "10+ Years",
      education: "MBBS, MD (Psychiatry) - NIMHANS, Bangalore",
      licenseNumber: "KA-PSY-35214",
      hospital: "Mind Wellness Clinic, Koramangala, Bangalore",
      address: "Mental Health Center, Koramangala, Bangalore, Karnataka 560034",
      phone: "+91 98290 11005",
      email: "dr.sunita.rao@smarthealth.com",
      rating: 4.9,
      reviewsCount: 201,
      consultationFee: 1500,
      bio: "Dr. Sunita Rao is a psychiatrist specializing in mental health, therapy, and psychiatric medication management with compassionate patient care.",
      languages: ["English", "Hindi", "Kannada", "Tamil"],
      availability: "Available Today",
      nextSlot: "09:00 AM",
      remainingPatientsToday: 5,
      supportsTelehealth: true,
      imageUrl: doctorImg13,
      schedule: [
        { day: "Monday", time: "09:00 - 18:00", status: "Open" },
        { day: "Tuesday", time: "09:00 - 18:00", status: "Open" },
        { day: "Wednesday", time: "09:00 - 18:00", status: "Open" },
        { day: "Thursday", time: "09:00 - 18:00", status: "Open" },
        { day: "Friday", time: "09:00 - 18:00", status: "Open" },
        { day: "Saturday", time: "10:00 - 15:00", status: "Open" },
        { day: "Sunday", time: "Emergency Crisis Line", status: "Emergency" },
      ],
      experienceTimeline: [
        {
          role: "Senior Psychiatrist",
          institution: "Mind Wellness Clinic",
          period: "2020 - Present",
          desc: "Providing psychiatric evaluation, therapy, and medication management for various mental health conditions."
        }
      ],
      educationDetails: [
        "MBBS - Bangalore Medical College, Bangalore (2009)",
        "MD (Psychiatry) - NIMHANS, Bangalore (2013)",
        "Fellowship in Child & Adolescent Psychiatry - NIMHANS (2015)"
      ],
      awards: [
        "Mental Health Awareness Award - Indian Psychiatric Society (2022)"
      ],
      specializations: [
        "Depression & Anxiety",
        "Bipolar Disorder",
        "Schizophrenia",
        "Child & Adolescent Psychiatry",
        "Addiction Psychiatry"
      ]
    },

    "14": {
      id: "14",
      name: "Dr. Karthik Menon",
      specialization: "Gastroenterologist",
      experience: "13+ Years",
      education: "MBBS, MD (Gastroenterology) - CMC, Vellore",
      licenseNumber: "TN-GAST-25214",
      hospital: "Digestive Health Center, Gachibowli, Hyderabad",
      address: "Gastroenterology Wing, Gachibowli, Hyderabad, Telangana 500032",
      phone: "+91 98300 22116",
      email: "dr.karthik.menon@smarthealth.com",
      rating: 4.8,
      reviewsCount: 156,
      consultationFee: 2000,
      bio: "Dr. Karthik Menon is a gastroenterologist specializing in digestive disorders, liver diseases, and gastrointestinal endoscopy with advanced therapeutic procedures.",
      languages: ["English", "Hindi", "Telugu", "Malayalam"],
      availability: "Available Tomorrow",
      nextSlot: "01:00 PM",
      remainingPatientsToday: 0,
      supportsTelehealth: true,
      imageUrl: doctorImg14,
      schedule: [
        { day: "Monday", time: "08:00 - 16:00", status: "Open" },
        { day: "Tuesday", time: "08:00 - 16:00", status: "Open" },
        { day: "Wednesday", time: "08:00 - 16:00", status: "Open" },
        { day: "Thursday", time: "08:00 - 16:00", status: "Open" },
        { day: "Friday", time: "08:00 - 16:00", status: "Open" },
        { day: "Saturday", time: "09:00 - 13:00", status: "Half Day" },
        { day: "Sunday", time: "GI Emergency", status: "Emergency" },
      ],
      experienceTimeline: [
        {
          role: "Senior Gastroenterologist",
          institution: "Digestive Health Center",
          period: "2018 - Present",
          desc: "Specializing in therapeutic endoscopy, liver diseases, and inflammatory bowel disease management."
        }
      ],
      educationDetails: [
        "MBBS - Government Medical College, Thiruvananthapuram (2007)",
        "MD (Internal Medicine) - CMC, Vellore (2011)",
        "DM (Gastroenterology) - CMC, Vellore (2014)"
      ],
      awards: [
        "Excellence in Gastroenterology - Indian Society of Gastroenterology (2021)"
      ],
      specializations: [
        "Inflammatory Bowel Disease",
        "Liver Diseases",
        "Therapeutic Endoscopy",
        "Acid Reflux & GERD",
        "Pancreatic Disorders"
      ]
    },

    "15": {
      id: "15",
      name: "Dr. Rohan Mehra",
      specialization: "Neurologist & Neuro-Rehabilitation",
      experience: "10+ Years",
      education: "MBBS, MD (Neurology) - Armed Forces Medical College (AFMC), Pune",
      licenseNumber: "MH-NEURO-51982",
      hospital: "Pune Institute of Neurosciences, Shivaji Nagar, Pune",
      address: "Neurosciences Complex, Shivaji Nagar, Pune, Maharashtra 411005",
      phone: "+91 98224 88123",
      email: "dr.rohan.mehra@smarthealth.com",
      rating: 4.8,
      reviewsCount: 95,
      consultationFee: 1400,
      bio: "Dr. Rohan Mehra is a consultant neurologist specializing in neuro-rehabilitation, peripheral nerve disorders, headache care, and comprehensive epilepsy treatment.",
      languages: ["English", "Hindi", "Marathi"],
      availability: "Available Tomorrow",
      nextSlot: "11:30 AM",
      remainingPatientsToday: 6,
      supportsTelehealth: true,
      imageUrl: doctorImg8,
      schedule: [
        { day: "Monday", time: "09:00 - 17:00", status: "Open" },
        { day: "Tuesday", time: "09:00 - 17:00", status: "Open" },
        { day: "Wednesday", time: "09:00 - 17:00", status: "Open" },
        { day: "Thursday", time: "09:00 - 17:00", status: "Open" },
        { day: "Friday", time: "09:00 - 17:00", status: "Open" },
        { day: "Saturday", time: "09:00 - 13:00", status: "Half Day" },
        { day: "Sunday", time: "Closed", status: "Closed" },
      ],
      experienceTimeline: [
        {
          role: "Senior Consultant Neurologist",
          institution: "Pune Institute of Neurosciences",
          period: "2018 - Present",
          desc: "Heading neuro-rehabilitation and stroke management unit."
        }
      ],
      educationDetails: [
        "MBBS - AFMC Pune (2009)",
        "MD (Medicine) - KEM Hospital, Mumbai (2013)",
        "DM (Neurology) - NIMHANS Bangalore (2016)"
      ],
      awards: [
        "Young Neurologist Award - Association of Physicians of India (2020)"
      ],
      specializations: [
        "Neuro-rehabilitation",
        "Peripheral Neuropathy",
        "Epilepsy & Seizure Care",
        "Migraine Management",
        "Parkinson's Disease"
      ]
    }
  };

  // Map doc_x IDs to numeric IDs
  DOCTORS_DATABASE["doc_1"] = DOCTORS_DATABASE["1"];
  DOCTORS_DATABASE["doc_2"] = DOCTORS_DATABASE["2"];
  DOCTORS_DATABASE["doc_3"] = DOCTORS_DATABASE["3"];
  DOCTORS_DATABASE["doc_4"] = DOCTORS_DATABASE["4"];
  DOCTORS_DATABASE["doc_5"] = DOCTORS_DATABASE["5"];
  DOCTORS_DATABASE["doc_6"] = DOCTORS_DATABASE["6"];
  DOCTORS_DATABASE["doc_7"] = DOCTORS_DATABASE["7"];
  DOCTORS_DATABASE["doc_8"] = DOCTORS_DATABASE["8"];
  DOCTORS_DATABASE["doc_9"] = DOCTORS_DATABASE["9"];
  DOCTORS_DATABASE["doc_10"] = DOCTORS_DATABASE["10"];
  DOCTORS_DATABASE["doc_11"] = DOCTORS_DATABASE["11"];
  DOCTORS_DATABASE["doc_12"] = DOCTORS_DATABASE["12"];
  DOCTORS_DATABASE["doc_13"] = DOCTORS_DATABASE["13"];
  DOCTORS_DATABASE["doc_14"] = DOCTORS_DATABASE["14"];
  DOCTORS_DATABASE["doc_15"] = DOCTORS_DATABASE["15"];

  useEffect(() => {
    setLoading(true);
    // 1. Check local rich database for this specific doctorId
    const key = String(doctorId || "1");
    let doctorData = DOCTORS_DATABASE[key];
    if (!doctorData) {
      doctorData = Object.values(DOCTORS_DATABASE).find(d => 
        String(d.id) === key || 
        d.name?.toLowerCase().includes(key.toLowerCase())
      ) || DOCTORS_DATABASE["1"];
    }

    // 2. Also try fetching from API if backend has customized values
    fetch(`/api/doctors/${doctorId}`)
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Local fallback");
      })
      .then((apiDoc) => {
        setDoctor({
          ...doctorData,
          name: apiDoc.user?.name || doctorData.name,
          specialization: apiDoc.specialization || doctorData.specialization,
          consultationFee: apiDoc.consultationFee || doctorData.consultationFee,
          rating: apiDoc.rating || doctorData.rating,
          bio: apiDoc.bio || doctorData.bio,
        });
        setLoading(false);
      })
      .catch(() => {
        setDoctor(doctorData);
        setLoading(false);
      });

    // Fetch appointment history for this doctor if user is logged in
    const token = localStorage.getItem("token");
    if (token) {
      setAppointmentHistory([
        {
          id: 1,
          date: "2024-01-15",
          time: "10:30 AM",
          type: "In-Person",
          status: "Completed",
          reason: "Routine Cardiovascular Checkup"
        },
        {
          id: 2,
          date: "2023-11-20",
          time: "02:00 PM",
          type: "Telehealth",
          status: "Completed",
          reason: "Follow-up Consultation"
        }
      ]);
    }
  }, [doctorId]);

  const handleBookAppointment = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      localStorage.setItem("redirectAfterLogin", `/appointment?doctorId=${doctorId}`);
      navigate("/login");
    } else {
      navigate(`/appointment?doctorId=${doctorId}`);
    }
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 2500);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium text-sm">Loading doctor profile...</p>
        </div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans">
        <div className="text-center p-8 bg-white rounded-3xl border border-slate-200 shadow-sm max-w-md mx-auto">
          <Stethoscope className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-800">Doctor Not Found</h2>
          <p className="text-slate-500 text-sm mt-2">The doctor profile you are looking for does not exist or has been moved.</p>
          <Link
            to="/doctors"
            className="inline-flex items-center gap-2 mt-5 px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition"
          >
            <ArrowLeft size={16} />
            Back to Find Doctors
          </Link>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "experience", label: "Experience" },
    { id: "reviews", label: "Reviews" },
    { id: "timetable", label: "Time Table" },
    { id: "location", label: "Location" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 antialiased">
      <Navbar />

      {/* Copy Toast Notification */}
      {copiedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 animate-fadeInUp">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <span>Profile link copied to clipboard!</span>
        </div>
      )}

      {/* 1. LIGHT MODERN HERO SECTION */}
      <section className="relative bg-gradient-to-b from-blue-50/40 via-white to-slate-50 pt-28 pb-12 border-b border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Back Link */}
          <div className="mb-6">
            <Link
              to="/doctors"
              className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 text-sm font-semibold transition-colors group"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              <span>Back to Find Doctors</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* Left Col: Doctor Portrait & Main Info */}
            <div className="lg:col-span-8 flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
              
              {/* Doctor Portrait Image Card */}
              <div className="relative w-full sm:w-56 md:w-64 h-72 sm:h-80 md:h-84 rounded-3xl overflow-hidden shadow-lg border border-slate-200/80 bg-white shrink-0 group">
                <img
                  src={doctor.imageUrl}
                  alt={doctor.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Verified Badge Overlay */}
                <div className="absolute bottom-3 left-3 right-3 py-1.5 px-3 rounded-2xl bg-white/95 backdrop-blur-md shadow-md border border-slate-100 flex items-center justify-center gap-1.5 text-emerald-700 text-xs font-bold">
                  <ShieldCheck size={16} className="text-emerald-600" />
                  <span>Verified Medical Specialist</span>
                </div>
              </div>

              {/* Doctor Details */}
              <div className="flex-1 space-y-4">
                
                {/* Specialty Pill Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-blue-700 text-xs font-bold uppercase tracking-wider">
                  <Stethoscope size={14} className="text-blue-600" />
                  <span>{doctor.specialization}</span>
                  <span className="w-1 h-1 rounded-full bg-blue-400"></span>
                  <span className="text-slate-500 font-medium">AIIMS Alumni</span>
                </div>

                {/* Friendly Greeting & Doctor Name */}
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    Good Day & Welcome!
                  </p>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                    {doctor.name}
                  </h1>
                </div>

                {/* Badges Row */}
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200/70 rounded-xl text-xs font-bold text-amber-900 shadow-sm">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span>{doctor.rating}</span>
                    <span className="text-slate-400 font-normal">({doctor.reviewsCount} reviews)</span>
                  </div>

                  <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 rounded-xl text-xs font-medium text-slate-700">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{doctor.licenseNumber}</span>
                  </div>

                  <div className="flex items-center gap-1.5 px-3 py-1 bg-teal-50 border border-teal-100 rounded-xl text-xs font-semibold text-teal-800">
                    <Award className="w-3.5 h-3.5 text-teal-600" />
                    <span>{doctor.experience} Experience</span>
                  </div>
                </div>

                {/* Short Bio Snippet */}
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed line-clamp-3">
                  {doctor.bio}
                </p>

                {/* Hospital & Patients Counter */}
                <div className="flex flex-wrap items-center gap-4 pt-1 text-xs sm:text-sm text-slate-600 border-t border-slate-100">
                  <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                    <Building className="w-4 h-4 text-blue-600" />
                    {doctor.hospital}
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-500">
                    <Users className="w-4 h-4 text-slate-400" />
                    You have <strong className="text-blue-600 font-bold">{doctor.remainingPatientsToday} patients</strong> remaining today!
                  </span>
                </div>

              </div>
            </div>

            {/* Right Col: Clean Floating Booking & Fee Card */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-3xl border border-slate-200/80 shadow-lg p-6 sm:p-7 space-y-6">
                
                {/* Fee Header */}
                <div className="text-center pb-5 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Consultation Fee
                  </span>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                      ₹{doctor.consultationFee.toLocaleString()}
                    </span>
                    <span className="text-xs font-medium text-slate-400">/ session</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">Inclusive of all medical taxes & digital summary</p>
                </div>

                {/* Action CTA Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={handleBookAppointment}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35 transition-all duration-200 flex items-center justify-center gap-2.5"
                  >
                    <Calendar className="w-5 h-5" />
                    Book Appointment
                  </button>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={handleToggleFavorite}
                      className={`py-3 px-4 rounded-xl border font-semibold text-xs flex items-center justify-center gap-2 transition-all duration-200 ${
                        isFavorite
                          ? "bg-rose-50 text-rose-600 border-rose-200 shadow-inner"
                          : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isFavorite ? "fill-rose-500 text-rose-500" : "text-slate-400"}`} />
                      {isFavorite ? "Saved" : "Save"}
                    </button>

                    <button 
                      onClick={handleShare}
                      className="py-3 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                    >
                      <Share2 className="w-4 h-4 text-slate-500" />
                      Share
                    </button>
                  </div>

                  {/* Availability Badge */}
                  <div className="pt-2">
                    <div className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span>{doctor.availability} • Next slot: {doctor.nextSlot}</span>
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. SEGMENTED TABS NAV (Matching Reference Design) */}
      <section className="bg-white border-b border-slate-200/80 sticky top-16 sm:top-20 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="inline-flex p-1.5 bg-slate-100/90 rounded-2xl border border-slate-200/70 overflow-x-auto max-w-full gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. TAB CONTENT VIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        
        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-8 animate-fadeInUp">
            
            {/* About Section Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
                About {doctor.name}
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {doctor.bio}
              </p>
            </div>

            {/* Areas of Expertise */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-5 flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Stethoscope className="w-5 h-5" />
                </div>
                Areas of Expertise & Specializations
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {doctor.specializations.map((spec, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 bg-slate-50/80 rounded-2xl border border-slate-200/60 hover:border-blue-200 hover:bg-blue-50/30 transition-colors"
                  >
                    <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" />
                    <span className="text-sm font-semibold text-slate-800">{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Two-Column Grid: Education & Languages */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Education */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-5 flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  Education & Training
                </h3>
                <ul className="space-y-3.5">
                  {doctor.educationDetails.map((edu, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-slate-600">
                      <span className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0"></span>
                      <span className="leading-relaxed">{edu}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Languages Spoken */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-5 flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                    <Users className="w-5 h-5" />
                  </div>
                  Languages Spoken
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  Dr. Sarah can fluently communicate with patients in the following languages:
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {doctor.languages.map((lang, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-slate-100 rounded-xl text-xs font-semibold text-slate-700 border border-slate-200/60"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: EXPERIENCE (Timeline from Reference) */}
        {activeTab === "experience" && (
          <div className="space-y-8 animate-fadeInUp">
            
            {/* Career Milestones */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                Professional Career & Hospital Affiliations
              </h2>

              <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-200">
                {doctor.experienceTimeline.map((item, index) => (
                  <div key={index} className="relative flex items-start gap-6 pl-8">
                    <span className="absolute left-2 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-white bg-blue-600 shadow-sm"></span>
                    <div className="bg-slate-50/80 border border-slate-200/70 p-5 rounded-2xl w-full">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                        <h4 className="text-base font-bold text-slate-900">{item.role}</h4>
                        <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100 inline-block w-fit">
                          {item.period}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-slate-700 mb-1">{item.institution}</p>
                      <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Honors & Awards */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-5 flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                Awards & Honors
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {doctor.awards.map((award, index) => (
                  <div key={index} className="p-4 bg-amber-50/50 rounded-2xl border border-amber-100 flex items-start gap-3">
                    <Award className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">{award}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: REVIEWS */}
        {activeTab === "reviews" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 animate-fadeInUp">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-100">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Verified Patient Reviews</h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">Real feedback from patients who consulted with {doctor.name}.</p>
              </div>

              <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 px-4 py-2 rounded-2xl">
                <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
                <div>
                  <span className="text-lg font-bold text-amber-950">{doctor.rating}</span>
                  <span className="text-xs text-amber-800 ml-1">out of 5.0</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {[
                {
                  author: "Rahul Verma",
                  rating: 5,
                  time: "1 week ago",
                  text: "Dr. Sarah explained my angiography report with immense patience and care. Her diagnosis was accurate and the treatment plan helped me recover quickly. Truly one of Mumbai's finest cardiologists."
                },
                {
                  author: "Pooja Deshmukh",
                  rating: 5,
                  time: "3 weeks ago",
                  text: "Extremely humble and professional. The appointment slot started right on time and she answered all our family's concerns regarding the preventive cardiac diet. Highly recommended!"
                },
                {
                  author: "Vikram Mehta",
                  rating: 5,
                  time: "1 month ago",
                  text: "Very comforting experience. She is dedicated, knowledgeable, and the clinic staff was equally helpful. The digital follow-up through SmartHealth made report sharing seamless."
                }
              ].map((rev, index) => (
                <div key={index} className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 font-bold text-sm flex items-center justify-center">
                        {rev.author.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{rev.author}</h4>
                        <p className="text-[11px] text-slate-400">{rev.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                    "{rev.text}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: TIME TABLE (EXACTLY MATCHING REFERENCE IMAGE 2) */}
        {activeTab === "timetable" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 animate-fadeInUp">
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              
              {/* Column 1: Weekly Schedule Table */}
              <div className="space-y-4">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                  <Clock className="w-5 h-5 text-blue-600" />
                  Weekly Consultation Hours
                </h3>

                <div className="space-y-2.5">
                  {doctor.schedule.map((slot, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-2.5 px-3.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <Clock4 className="w-4 h-4 text-blue-600" />
                        <span className="text-xs sm:text-sm font-semibold text-slate-800">{slot.day}</span>
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-blue-600">
                        {slot.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 2: Phone Support Card (Matching Reference Image 2) */}
              <div className="flex flex-col items-center text-center p-6 sm:p-8 rounded-3xl bg-slate-50/70 border border-slate-200/70 space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center shadow-sm">
                  <Phone className="w-7 h-7" />
                </div>

                <h4 className="text-lg font-bold text-slate-900">Phone Consultation</h4>
                
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-xs">
                  Call our clinic coordinator desk for direct inquiries, urgent questions, or slot rescheduling.
                </p>

                <a 
                  href={`tel:${doctor.phone}`}
                  className="mt-2 text-sm sm:text-base font-bold text-blue-600 hover:text-blue-700 transition-colors inline-block"
                >
                  {doctor.phone}
                </a>
              </div>

              {/* Column 3: Email Support Card (Matching Reference Image 2) */}
              <div className="flex flex-col items-center text-center p-6 sm:p-8 rounded-3xl bg-slate-50/70 border border-slate-200/70 space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center shadow-sm">
                  <Mail className="w-7 h-7" />
                </div>

                <h4 className="text-lg font-bold text-slate-900">Direct Email</h4>
                
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-xs">
                  Share previous medical reports, discharge summaries, or general health questions directly.
                </p>

                <a 
                  href={`mailto:${doctor.email}`}
                  className="mt-2 text-sm sm:text-base font-bold text-blue-600 hover:text-blue-700 transition-colors inline-block break-all"
                >
                  {doctor.email}
                </a>
              </div>

            </div>

          </div>
        )}

        {/* TAB 5: LOCATION */}
        {activeTab === "location" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 animate-fadeInUp">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              Hospital & Clinic Location
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-bold text-slate-900">{doctor.hospital}</h4>
                  <p className="text-sm text-slate-600 leading-relaxed mt-1">{doctor.address}</p>
                </div>

                <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-2">
                  <p className="text-xs font-bold text-blue-800 uppercase tracking-wider">Patient Amenities</p>
                  <ul className="text-xs text-slate-600 space-y-1">
                    <li>• Free Valet Parking & Wheelchair Access</li>
                    <li>• In-house 24/7 Pharmacy & Advanced Pathology Labs</li>
                    <li>• Dedicated Cardiac ICU & Emergency Triage Wing</li>
                  </ul>
                </div>

                <div className="pt-2">
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-md transition-all"
                  >
                    <MapPin size={14} />
                    Open in Google Maps
                  </a>
                </div>
              </div>

              {/* Decorative Location Visual Card */}
              <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-100 to-blue-50 border border-slate-200/80 text-center flex flex-col items-center justify-center min-h-[220px]">
                <Building className="w-14 h-14 text-blue-500 mb-3" />
                <h5 className="font-bold text-slate-800 text-base">City Heart Care Center</h5>
                <p className="text-xs text-slate-500 mt-1">Marine Drive Healthcare Hub, Mumbai</p>
                <span className="mt-3 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                  Open Today 09:00 - 18:00
                </span>
              </div>
            </div>
          </div>
        )}

      </section>

      <Footer />
    </div>
  );
};

export default DoctorProfile;