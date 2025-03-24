import ScheduleAppointment from "@/app/components/ScheduleAppointment/ScheduleAppointment";
import styles from "./styles.module.css";
import Footer from "@/app/components/Footer/Footer";

const Appointments = () => {
  return (
    <div>
      <div className={styles.appointments}>
        <div className={styles.left}>
          <h1 className="heading">Book Your Next Doctor Visit in Seconds.</h1>
          <p className="para">
            CareMate helps you find the best healthcare provider by specialty,
            location, and more, ensuring you get the care you need.
          </p>
        </div>
        <div className={styles.right}>
          <ScheduleAppointment />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Appointments;
