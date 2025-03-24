// import styles from "./DoctorCard.module.css";
// import { Stethoscope, Clock, Star } from "lucide-react";

// const API_BASE_URL =
//   process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "http://localhost:5000";

// const DoctorCard = ({ doctor }) => {
//   const { name, specialty, experience, average_rating, photo_path } = doctor;

//   const imageUrl = photo_path.startsWith("http")
//     ? photo_path
//     : `${API_BASE_URL}${photo_path}`;

//   const totalStars = 5;
//   const filledStars = Math.floor(average_rating);
//   const emptyStars = totalStars - filledStars;

//   return (
//     <div className={styles.card}>
//       <img src={imageUrl} alt={name} className={styles.profileImage} />
//       <h3 className={styles.name}>{name}</h3>
//       <div className={styles.details}>
//         <span className={styles.detail}>
//           <Stethoscope className={styles.icon} /> {specialty}
//         </span>
//         <span className={styles.detail}>
//           <Clock className={styles.icon} /> {experience} Years
//         </span>
//       </div>
//       <div className={styles.ratings}>
//         <span>Ratings: </span>
//         {Array.from({ length: filledStars }, (_, i) => (
//           <Star key={i} className={styles.star} />
//         ))}
//         {Array.from({ length: emptyStars }, (_, i) => (
//           <Star key={`empty-${i}`} className={styles.emptyStar} />
//         ))}
//       </div>
//       <button className={styles.bookButton}>Book Appointment</button>
//     </div>
//   );
// };

// export default DoctorCard;

"use client"; // Since we're using useRouter, this component must be a Client Component

import styles from "./DoctorCard.module.css";
import { Stethoscope, Clock, Star } from "lucide-react";
import { useRouter } from "next/navigation";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "http://localhost:5000";

const DoctorCard = ({ doctor }) => {
  const router = useRouter();
  const { id, name, specialty, experience, average_rating, photo_path } =
    doctor;

  const imageUrl = photo_path.startsWith("http")
    ? photo_path
    : `${API_BASE_URL}${photo_path}`;

  const totalStars = 5;
  const filledStars = Math.floor(average_rating);
  const emptyStars = totalStars - filledStars;

  // Function to handle booking
  const handleBookAppointment = () => {
    router.push(`/book-appointment/${id}`);
  };

  return (
    <div className={styles.card}>
      <img src={imageUrl} alt={name} className={styles.profileImage} />
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
      <button className={styles.bookButton} onClick={handleBookAppointment}>
        Book Appointment
      </button>
    </div>
  );
};

export default DoctorCard;
