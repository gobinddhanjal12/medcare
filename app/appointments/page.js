'use client';

import styles from './doctorList.module.css';
import SearchBar from '../components/SearchBar/SearchBar';
import DoctorList from '../components/DoctorList/DoctorList';
import Footer from '../components/Footer/Footer';

export default function AvailableDoctors() {

    return (
        <div>

            <div className={styles.search}>
                <h1 className={styles.title}>Find a doctor at your own ease</h1>
                <SearchBar />
            </div>
            <div className={styles.container}>
                <DoctorList />

            </div>

            <Footer />

        </div>
    );
}
