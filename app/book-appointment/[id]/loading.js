import ScheduleAppointment from "@/app/components/ScheduleAppointment/ScheduleAppointment";
import styles from "./styles.module.css";
import LoadingSpinner from "@/app/components/LoadingSpinner/LoadingSpinner";

const Loading = () => {
  return (
    <div>
      <div className={styles.appointments}>
        <div className={styles.left}>
          <h1 className="heading">Book Your Next Doctor Visit in Seconds.</h1>
          <p className="para">
            Medcare helps you find the best healthcare provider by specialty,
            location, and more, ensuring you get the care you need.
          </p>
        </div>
        <div className={styles.right}>
          <LoadingSpinner />
        </div>
      </div>
    </div>
  );
};

export default Loading;
