"use client";

import styles from "./doctorList.module.css";
import SearchBar from "../components/SearchBar/SearchBar";
import DoctorList from "../components/DoctorList/DoctorList";
import Footer from "../components/Footer/Footer";
import { Suspense } from "react";

export default function AvailableDoctors() {
  return (
    <div>
      <div className={styles.search}>
        <h1 className={styles.title}>Find a doctor at your own ease</h1>
        <SearchBar />
      </div>
      <div className={styles.container}>
        <Suspense fallback={<p>Loading...</p>}>
          <DoctorList />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}
