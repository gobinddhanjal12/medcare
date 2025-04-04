"use client";

import { useState } from "react";
import styles from "./styles.module.css";
import SearchBar from "../components/SearchBar/SearchBar";
import DoctorList from "../components/DoctorList/DoctorList";
import { Suspense } from "react";

export default function AvailableDoctors() {
  const [filters, setFilters] = useState({});

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div>
        <div className={styles.search}>
          <h1 className={styles.title}>Find a doctor at your own ease</h1>
          <SearchBar setFilters={setFilters} />
        </div>
        <div className={styles.container}>
          <DoctorList filters={filters} />
        </div>
      </div>
    </Suspense>
  );
}
