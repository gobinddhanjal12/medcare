"use client";

import { useEffect, useState } from "react";
import styles from "./styles.module.css";

const UserAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found. Please log in.");
        }

        const response = await fetch(
          "http://localhost:3000/api/v1/appointments/patient",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch appointments");
        }

        setAppointments(data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    return `${dateObj.getDate()}-${
      dateObj.getMonth() + 1
    }-${dateObj.getFullYear()}`;
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours, 10);
    const amPm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12; // Convert to 12-hour format
    return `${formattedHour}:${minutes} ${amPm}`;
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Appointments</h1>

      {loading ? (
        <p>Loading appointments...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : appointments.length > 0 ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Doctor</th>
              <th>Specialty</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td>{appointment.doctor_name}</td>
                <td>{appointment.specialty}</td>
                <td>{formatDate(appointment.appointment_date)}</td>
                <td>{formatTime(appointment.start_time)}</td>
                <td
                  className={`${styles.status} ${
                    styles[appointment.request_status]
                  }`}
                >
                  {appointment.request_status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No appointments found.</p>
      )}
    </div>
  );
};

export default UserAppointments;
