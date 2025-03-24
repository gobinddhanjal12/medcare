"use client";
import { useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import DoctorCard from "../Card/DoctorCard";
import Filter from "../Filter/Filter";
import Pagination from "../Pagination/Pagination";
import styles from "./DoctorList.module.css";

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // Extract the current page from search params safely
  useEffect(() => {
    const page = Number(searchParams.get("page")) || 1;
    setCurrentPage(page);
  }, [searchParams]);

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/doctors?page=${currentPage}`
        );
        const result = await response.json();

        if (response.ok) {
          setDoctors(result.data);
          setTotalPages(result.pagination.pages);
          setTotalDoctors(result.pagination.total);
        } else {
          throw new Error(result.message || "Failed to fetch doctors");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [currentPage]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        {loading ? "Loading doctors..." : `${totalDoctors} doctors available`}{" "}
      </h1>
      <p className={styles.para}>
        Book appointments with minimum wait-time & verified doctor details
      </p>

      <div className={styles.subContainer}>
        <div className={styles.left}>
          <Filter />
        </div>
        <div className={styles.right}>
          {error ? (
            <p className={styles.error}>{error}</p>
          ) : loading ? (
            <p className={styles.loading}>Fetching doctors...</p>
          ) : (
            <div className={styles.cardContainer}>
              {doctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
          )}
        </div>
      </div>

      <Pagination totalPages={totalPages} />
    </div>
  );
};

export default DoctorList;
