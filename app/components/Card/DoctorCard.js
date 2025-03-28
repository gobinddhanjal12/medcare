"use client";

import styles from "./DoctorCard.module.css";
import { Stethoscope, Clock, Star } from "lucide-react";
import { useRouter } from "next/navigation";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "http://localhost:5000";

const DEFAULT_IMAGE = "/default-doctor.png";

const DoctorCard = ({ doctor }) => {
  console.log(doctor);
  const router = useRouter();
  const {
    id,
    name,
    specialty,
    experience,
    average_rating = 0,
    photo_path,
  } = doctor;

  const imageUrl =
    typeof photo_path === "string" &&
    (photo_path.startsWith("http://") || photo_path.startsWith("https://"))
      ? photo_path
      : photo_path
      ? `${API_BASE_URL}${photo_path}`
      : DEFAULT_IMAGE;

  const totalStars = 5;
  const filledStars = Math.floor(average_rating);
  const emptyStars = totalStars - filledStars;

  const handleBookAppointment = (e) => {
    e.stopPropagation();
    router.push(`/book-appointment/${id}`);
  };

  const handleCardClick = () => {
    router.push(`/doctor-details/${id}`);
  };

  return (
    <div className={styles.card} onClick={handleCardClick}>
      <img
        src={imageUrl}
        alt={name}
        className={styles.profileImage}
        loading="lazy"
      />
      <h3 className={styles.name}>{name}</h3>
      <div className={styles.details}>
        <span className={styles.detail}>
          <Stethoscope className={styles.icon} /> {specialty}
        </span>
        <span className={styles.detail}>
          <Clock className={styles.icon} /> {experience} Years
        </span>
      </div>
      <div className={styles.ratings}>
        <span>Ratings: </span>
        {Array.from({ length: filledStars }, (_, i) => (
          <Star key={i} className={styles.star} />
        ))}
        {Array.from({ length: emptyStars }, (_, i) => (
          <Star key={`empty-${i}`} className={styles.emptyStar} />
        ))}
      </div>
      <button
        className={styles.bookButton}
        onClick={handleBookAppointment}
        aria-label="Book Appointment"
      >
        Book Appointment
      </button>
    </div>
  );
};

export default DoctorCard;
