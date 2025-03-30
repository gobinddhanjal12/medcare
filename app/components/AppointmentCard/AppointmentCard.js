import { useState } from "react";
import ReviewBox from "../ReviewBox/ReviewBox";
import styles from "./AppointmentCard.module.css";
import { Calendar, Clock, Stethoscope } from "lucide-react";
import Image from "next/image";

export const AppointmentCard = ({ appointment }) => {
  const [canReview, setCanReview] = useState(appointment.can_review);

  const handleReviewSubmit = () => {
    setCanReview(false);
  };

  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    return `${dateObj.getDate()}-${
      dateObj.getMonth() + 1
    }-${dateObj.getFullYear()}`;
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours, 10);
    const amPm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${amPm}`;
  };

  console.log(appointment);

  return (
    <div className={styles.card}>
      <div className={styles.doctorDetail}>
        <Image
          src={appointment.doctor_photo}
          width={50}
          height={50}
          alt="doctor"
          className={styles.doctorImage}
        />

        <h3>{appointment.doctor_name}</h3>
      </div>

      <p className={styles.detail}>
        <Stethoscope className={styles.icon} /> {appointment.specialty}
      </p>

      <p className={styles.detail}>
        <Calendar className={styles.icon} />{" "}
        {formatDate(appointment.appointment_date)}
      </p>

      <p className={styles.detail}>
        <Clock className={styles.icon} /> {formatTime(appointment.start_time)}
      </p>

      <p className={`${styles.status} ${styles[appointment.status]}`}>
        {appointment.status}
      </p>

      {canReview && (
        <ReviewBox
          appointmentId={appointment.id}
          onSuccess={handleReviewSubmit}
        />
      )}
    </div>
  );
};
