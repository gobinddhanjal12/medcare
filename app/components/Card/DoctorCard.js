"use client";

import styles from "./DoctorCard.module.css";
import { Stethoscope, Clock, Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const DoctorCard = ({ doctor }) => {
  const router = useRouter();
  const {
    id,
    name,
    specialty,
    experience,
    average_rating = 0,
    photo_path,
  } = doctor;

  const totalStars = 5;
  const filledStars = Math.floor(average_rating);
  const emptyStars = totalStars - filledStars;

  const handleBookAppointment = (e) => {
    e.stopPropagation();
    router.push(`/book-appointment/${id}`);
  };

  const handleCardClick = (e) => {
    const card = e.currentTarget;

    const ripple = document.createElement("span");
    ripple.className = styles.ripple;

    const rect = card.getBoundingClientRect();
    ripple.style.left = `${e.clientX - rect.left}px`;
    ripple.style.top = `${e.clientY - rect.top}px`;

    card.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
      router.push(`/doctor-details/${id}`);
    }, 300);
  };

  return (
    <div className={styles.card} >
      <div className={styles.content} onClick={handleCardClick}>
        <Image
          width={200}
          height={200}
          src={photo_path}
          alt={name}
          className={styles.profileImage}
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

        <div className={styles.cardBottom}>
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
      </div>
    </div>
  );
};

export default DoctorCard;
