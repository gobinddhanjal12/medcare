"use client";

import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { AppointmentCard } from "../components/AppointmentCard/AppointmentCard";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

const UserAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/appointments/patient?page=${page}&limit=${limit}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch appointments");
        }

        setAppointments(data.data);
        setTotalPages(data.pagination.pages);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [page]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Appointments</h1>

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : appointments.length > 0 ? (
        <>
          <div className={styles.cardContainer}>
            {appointments.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))}
          </div>

          <div className={styles.pagination}>
            <button
              className={styles.btn}
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              Previous
            </button>
            <span className={styles.pageNumber}>
              Page {page} of {totalPages}
            </span>
            <button
              className={styles.btn}
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p>No appointments found.</p>
      )}
    </div>
  );
};

export default UserAppointments;
