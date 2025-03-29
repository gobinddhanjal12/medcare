import { useState } from "react";
import ReviewBox from "../ReviewBox/ReviewBox";
import styles from "./AppointmentCard.module.css";

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

  return (
    <div className={styles.card}>
      <h3>{appointment.doctor_name}</h3>
      <p>
        <strong>Specialty:</strong> {appointment.specialty}
      </p>
      <p>
        <strong>Date:</strong> {formatDate(appointment.appointment_date)}
      </p>
      <p>
        <strong>Time:</strong> {formatTime(appointment.start_time)}
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
