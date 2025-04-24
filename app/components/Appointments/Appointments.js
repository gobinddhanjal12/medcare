"use client";

import { useState } from "react";
import styles from "./Appointments.module.css";
import SearchBar from "../SearchBar/SearchBar";
import DoctorList from "../DoctorList/DoctorList";

export default function Appointments() {
  const [filters, setFilters] = useState({});

  return (
    <div>
      <div className={styles.search}>
        <h1 className={styles.title}>Find a doctor at your own ease</h1>
        <SearchBar setFilters={setFilters} />
      </div>
      <div className={styles.container}>
        <DoctorList filters={filters} />
      </div>
    </div>
  );
}
