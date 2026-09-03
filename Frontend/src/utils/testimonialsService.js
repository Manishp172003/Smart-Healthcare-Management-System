// SmartHealth Testimonials & Reviews Service

const TESTIMONIALS_KEY = "smarthealth_testimonials";
const MODERATION_MODE_KEY = "smarthealth_testimonials_mode"; // 'manual' | 'auto'

const DEFAULT_TESTIMONIALS = [
  {
    id: "rev-1",
    name: "Riya S.",
    role: "Cardiology Patient",
    rating: 5,
    doctorName: "Dr. Ananya Sharma",
    text: "Dr. Ananya is not just an excellent doctor but also an amazing human being. She listened to me patiently and made my journey so comfortable.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80",
    status: "APPROVED",
    featured: true,
    createdAt: "2026-08-20T10:30:00Z"
  },
  {
    id: "rev-2",
    name: "Pooja M.",
    role: "Mother of 2",
    rating: 5,
    doctorName: "Dr. Sneha Kulkarni",
    text: "The entire team at SmartHealth is so supportive and caring. I felt safe and confident throughout my pregnancy.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&h=120&q=80",
    status: "APPROVED",
    featured: true,
    createdAt: "2026-08-22T14:15:00Z"
  },
  {
    id: "rev-3",
    name: "Anjali K.",
    role: "Dermatology Patient",
    rating: 5,
    doctorName: "Dr. Priya Kapoor",
    text: "Finally found a place where healthcare is taken seriously and with so much compassion. Highly recommend Dr. Priya!",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80",
    status: "APPROVED",
    featured: true,
    createdAt: "2026-08-25T09:00:00Z"
  },
  {
    id: "rev-4",
    name: "Aarav Mehta",
    role: "Orthopedic Patient",
    rating: 5,
    doctorName: "Dr. Arjun Verma",
    text: "Booking an appointment through SmartHealth was incredibly easy. I was able to find a specialist in less than five minutes.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80",
    status: "APPROVED",
    featured: false,
    createdAt: "2026-08-28T16:45:00Z"
  },
  {
    id: "rev-5",
    name: "Rajesh Patel",
    role: "General Medicine",
    rating: 5,
    doctorName: "Dr. Kabir Malhotra",
    text: "As an elderly patient, traveling long distances for appointment booking was tough. Now I book consults directly from home.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80",
    status: "APPROVED",
    featured: false,
    createdAt: "2026-08-30T11:20:00Z"
  }
];

export const getModerationMode = () => {
  try {
    return localStorage.getItem(MODERATION_MODE_KEY) || "manual";
  } catch {
    return "manual";
  }
};

export const setModerationMode = (mode) => {
  try {
    localStorage.setItem(MODERATION_MODE_KEY, mode);
    window.dispatchEvent(new CustomEvent("testimonialsModeChanged", { detail: mode }));
  } catch (e) {
    console.error("Failed to set moderation mode:", e);
  }
};

export const getTestimonials = () => {
  try {
    const raw = localStorage.getItem(TESTIMONIALS_KEY);
    if (!raw) {
      localStorage.setItem(TESTIMONIALS_KEY, JSON.stringify(DEFAULT_TESTIMONIALS));
      return DEFAULT_TESTIMONIALS;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_TESTIMONIALS;
  }
};

export const getApprovedTestimonials = () => {
  const all = getTestimonials();
  return all.filter((t) => t.status === "APPROVED");
};

export const submitReview = ({ patientName, patientRole, rating, text, doctorName }) => {
  const all = getTestimonials();
  const mode = getModerationMode();
  const isAuto = mode === "auto";

  const newReview = {
    id: "rev-" + Date.now(),
    name: patientName || "Verified Patient",
    role: patientRole || "Patient",
    rating: Number(rating) || 5,
    doctorName: doctorName || "SmartHealth Specialist",
    text: text.trim(),
    image: null,
    status: isAuto ? "APPROVED" : "PENDING",
    featured: isAuto,
    createdAt: new Date().toISOString()
  };

  const updated = [newReview, ...all];
  try {
    localStorage.setItem(TESTIMONIALS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent("testimonialsUpdated"));
  } catch (e) {
    console.error("Failed to save review:", e);
  }

  return { review: newReview, isAutoApproved: isAuto };
};

export const updateReviewStatus = (id, newStatus) => {
  const all = getTestimonials();
  const updated = all.map((t) => (t.id === id ? { ...t, status: newStatus } : t));
  try {
    localStorage.setItem(TESTIMONIALS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent("testimonialsUpdated"));
  } catch (e) {
    console.error("Failed to update status:", e);
  }
};

export const toggleReviewFeature = (id) => {
  const all = getTestimonials();
  const updated = all.map((t) => (t.id === id ? { ...t, featured: !t.featured } : t));
  try {
    localStorage.setItem(TESTIMONIALS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent("testimonialsUpdated"));
  } catch (e) {
    console.error("Failed to toggle feature:", e);
  }
};

export const deleteReview = (id) => {
  const all = getTestimonials();
  const updated = all.filter((t) => t.id !== id);
  try {
    localStorage.setItem(TESTIMONIALS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent("testimonialsUpdated"));
  } catch (e) {
    console.error("Failed to delete review:", e);
  }
};
