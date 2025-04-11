"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "./AppointmentRequest.module.css";
import Image from "next/image";
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaBriefcase,
  FaMoneyBillWave,
} from "react-icons/fa";
import { MdSchedule } from "react-icons/md";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const AppointmentRequest = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [timeSlotId, setTimeSlotId] = useState("");
  const [consultationType, setConsultationType] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    setDate(searchParams.get("date") || "");
    setTime(searchParams.get("time") || "");
    setDoctorId(searchParams.get("doctorId") || "");
    setTimeSlotId(searchParams.get("timeSlotId") || "");
    setConsultationType(searchParams.get("mode") || "");
  }, [searchParams]);

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      if (!doctorId) return;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/doctors/${doctorId}`
        );
        const result = await response.json();
        if (!response.ok) throw new Error(result.message || "Doctor not found");

        setDoctor(result.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchDoctorDetails();
  }, [doctorId]);

  const handleConfirm = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        router.replace(
          `/login?redirect=${encodeURIComponent(window.location.href)}`
        );
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/appointments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            doctor_id: Number(doctorId),
            appointment_date: date,
            time_slot_id: Number(timeSlotId),
            consultation_type: consultationType,
          }),
        }
      );

      const result = await response.json();
      if (!response.ok)
        throw new Error(result.message || "Failed to book appointment");

      router.push(`/appointment-confirmation?id=${result.data.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  function formatTimeTo12Hour(time) {
    const [hourStr, minute] = time.split(":");
    let hour = parseInt(hourStr, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    return `${hour}:${minute} ${ampm}`;
  }

  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <h1 className={styles.title}>Confirm Appointment</h1>
        <p className={styles.detail}>
          Please review your appointment details before confirming
        </p>

        {error && (
          <div className={styles.errorContainer}>
            <p className={styles.error}>{error}</p>
          </div>
        )}

        {doctor ? (
          <div className={styles.doctorCard}>
            <div className={styles.doctorImageContainer}>
              <Image
                width={200}
                height={200}
                src={doctor.photo_path}
                alt={doctor.name}
                className={styles.doctorImage}
              />
            </div>
            <div className={styles.doctorInfo}>
              <h3 className={styles.doctorName}>{doctor.name}</h3>
              <p className={styles.specialty}>{doctor.specialty}</p>
              <div className={styles.infoItem}>
                <FaMapMarkerAlt className={styles.icon} />
                <span>{doctor.location}</span>
              </div>
              <div className={styles.infoItem}>
                <FaBriefcase className={styles.icon} />
                <span>{doctor.experience} years experience</span>
              </div>
              <div className={styles.infoItem}>
                <FaMoneyBillWave className={styles.icon} />
                <span>₹{doctor.consultation_fee}</span>
              </div>
            </div>
          </div>
        ) : (
          <LoadingSpinner />
        )}

        <div className={styles.appointmentInfo}>
          <h2 className={styles.sectionTitle}>Appointment Details</h2>
          <div className={styles.appointmentGrid}>
            <div className={styles.appointmentItem}>
              <div className={styles.appointmentIcon}>
                <FaCalendarAlt />
              </div>
              <div>
                <p className={styles.appointmentLabel}>Date</p>
                <p className={styles.appointmentValue}>{date}</p>
              </div>
            </div>

            <div className={styles.appointmentItem}>
              <div className={styles.appointmentIcon}>
                <FaClock />
              </div>
              <div>
                <p className={styles.appointmentLabel}>Time</p>
                <p className={styles.appointmentValue}>
                  {" "}
                  {formatTimeTo12Hour(time)}
                </p>
              </div>
            </div>

            <div className={styles.appointmentItem}>
              <div className={styles.appointmentIcon}>
                <MdSchedule />
              </div>
              <div>
                <p className={styles.appointmentLabel}>Consultation Type</p>
                <p className={styles.appointmentValue}>{consultationType}</p>
              </div>
            </div>
          </div>
        </div>

        <button
          className={styles.confirmButton}
          onClick={handleConfirm}
          disabled={loading}
        >
          {loading ? (
            <>
              <div className={styles.buttonSpinner}></div>
              <span>Processing...</span>
            </>
          ) : (
            "Confirm Appointment"
          )}
        </button>
      </div>
    </div>
  );
};

export default AppointmentRequest;
