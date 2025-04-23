"use client";

import { useRouter } from "next/navigation";
import styles from "./DoctorDetails.module.css";
import Image from "next/image";
import {
  BookA,
  Clock,
  GraduationCap,
  MapPin,
  Stethoscope,
  StickyNote,
  Tag,
} from "lucide-react";
import DoctorReviews from "../DoctorReviews/DoctorReviews";

const DoctorDetails = ({ doctor }) => {
  const router = useRouter();
  const id = doctor.id;

  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <button
          className={styles.desktopBookButton}
          onClick={() => router.push(`/book-appointment/${id}`)}
        >
          Book Appointment
        </button>
      </div>
      <div className={styles.subContainer}>
        <div className={styles.left}>
          <Image
            src={doctor.photo_path}
            alt={doctor.name}
            width={150}
            height={150}
            className={styles.profileImage}
          />
        </div>
        <div className={styles.right}>
          <h2 className={styles.name}>{doctor.name}</h2>

          <div className={styles.details}>
            <span className={styles.detail}>
              <Stethoscope className={styles.icon} /> {doctor.specialty}
            </span>
            <span className={styles.detail}>
              <Clock className={styles.icon} /> {doctor.experience} Years
            </span>
          </div>

          <p className={styles.detail}>
            <MapPin className={styles.icon} /> {doctor.location}
          </p>
          <p className={styles.detail}>
            <Tag className={styles.icon} /> ₹{doctor.consultation_fee}
          </p>

          {doctor.education && (
            <p className={styles.detail}>
              <GraduationCap className={styles.icon} /> {doctor.education}
            </p>
          )}
          {doctor.bio && (
            <p className={styles.detail}>
              <StickyNote className={styles.icon} /> {doctor.bio}
            </p>
          )}
          {doctor.languages?.length > 0 && (
            <p className={styles.detail}>
              <BookA className={styles.icon} /> {doctor.languages.join(", ")}
            </p>
          )}

          <button
            className={styles.bookButton}
            onClick={() => router.push(`/book-appointment/${id}`)}
          >
            Book Appointment
          </button>

          <DoctorReviews />
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;
