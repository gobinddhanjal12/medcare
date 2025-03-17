import DoctorCard from "../Card/DoctorCard";
import Filter from "../Filter/Filter";
import styles from "./DoctorList.module.css";

const DoctorList = () => {

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>6 doctors available</h1>
            <p className={styles.para}>Book appointments with minimum wait-time & verified doctor details</p>

            <div className={styles.subContainer}>
                <div className={styles.left}>
                    <Filter />
                </div>
                <div className={styles.right}>
                    <div className={styles.cardContainer}>
                        {[...Array(6)].map((_, index) => (
                            <DoctorCard key={index} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

};

export default DoctorList;