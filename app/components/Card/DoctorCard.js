import styles from "./DoctorCard.module.css";
import { Stethoscope, Clock, Star, StarHalf } from "lucide-react";

const DoctorCard = () => {
    return (
        <div className={styles.card}>
            <img
                src="/images/doctor1.png"
                alt="Doctor"
                className={styles.profileImage}
            />
            <h3 className={styles.name}>Dr Sam Wilson, BDS</h3>
            <div className={styles.details}>
                <span className={styles.detail}>
                    <Stethoscope className={styles.icon} /> Dentist
                </span>
                <span className={styles.detail}>
                    <Clock className={styles.icon} /> 5 Years
                </span>
            </div>
            <div className={styles.ratings}>
                <span>Ratings: </span>
                <Star className={styles.star} />
                <Star className={styles.star} />
                <Star className={styles.star} />
                <Star className={styles.star} />
                <Star className={styles.star} />
            </div>
            <button className={styles.bookButton}>Book Appointment</button>
        </div>
    );
};

export default DoctorCard;
