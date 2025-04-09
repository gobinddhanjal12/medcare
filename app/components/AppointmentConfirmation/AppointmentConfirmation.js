"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import styles from "./AppointmentConfirmation.module.css";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Mail,
  DollarSign,
  CheckCircle,
  AlertCircle,
  Home,
  Stethoscope,
  Video,
  IndianRupee,
} from "lucide-react";
import { formatTime } from "@/app/utils/formatTime";

const AppointmentConfirmation = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const appointmentId = searchParams.get("id");

  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointmentDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("token");
        if (!token)
          throw new Error("Authentication token not found. Please log in.");

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/appointments/${appointmentId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const result = await response.json();
        if (!response.ok)
          throw new Error(
            result.message || "Failed to fetch appointment details"
          );

        setAppointment(result.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (appointmentId) {
      fetchAppointmentDetails();
    }
  }, [appointmentId]);

  const getConsultationTypeIcon = (type) => {
    if (type?.toLowerCase().includes("video")) return <Video size={18} />;
    if (type?.toLowerCase().includes("online")) return <Video size={18} />;
    return <Stethoscope size={18} />;
  };

  return (
    <Suspense
      fallback={
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
        </div>
      }
    >
      <div className={styles.pageContainer}>
        <div className={styles.container}>
          <div className={styles.card}>
            <div className={styles.header}>
              <h1 className={styles.title}>Appointment Confirmation</h1>
              <div className={styles.accent}></div>
            </div>

            {loading && (
              <div className={styles.loadingContainer}>
                <div className={styles.spinner}></div>
              </div>
            )}

            {error && (
              <div className={styles.errorContainer}>
                <div className={styles.errorIcon}>
                  <AlertCircle size={24} />
                </div>
                <p className={styles.errorMessage}>{error}</p>
              </div>
            )}

            {appointment && (
              <div className={styles.details}>
                <div className={styles.successBanner}>
                  <div className={styles.checkIcon}>
                    <CheckCircle size={20} />
                  </div>
                  <p className={styles.successMessage}>
                    Your appointment has been successfully scheduled
                  </p>
                </div>

                <div className={styles.sectionDivider}>
                  <span>Appointment Details</span>
                </div>

                <div className={styles.detailsGrid}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>
                      <Stethoscope size={16} className={styles.iconLabel} />
                      Doctor
                    </span>
                    <span className={styles.detailValue}>
                      {appointment.doctor_name}
                    </span>
                    <span className={styles.detailSecondary}>
                      {appointment.specialty}
                    </span>
                  </div>

                  {appointment.consultation_type === "offline" && (
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>
                        <MapPin size={16} className={styles.iconLabel} />
                        Location
                      </span>
                      <span className={styles.detailValue}>
                        {appointment.location}
                      </span>
                    </div>
                  )}

                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>
                      <IndianRupee size={16} className={styles.iconLabel} />
                      Consultation Fee
                    </span>
                    <span className={styles.detailValue}>
                      ₹{appointment.consultation_fee}
                    </span>
                  </div>

                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>
                      <User size={16} className={styles.iconLabel} />
                      Patient
                    </span>
                    <div className={styles.patientInfo}>
                      <span className={styles.detailValue}>
                        {appointment.patient_name}
                      </span>
                      <span className={styles.detailSecondary}>
                        <Mail size={14} className={styles.inlineIcon} />
                        {appointment.patient_email}
                      </span>
                    </div>
                  </div>

                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>
                      <Calendar size={16} className={styles.iconLabel} />
                      Date
                    </span>
                    <span className={styles.detailValue}>
                      {new Date(
                        appointment.appointment_date
                      ).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>
                      <Clock size={16} className={styles.iconLabel} />
                      Time
                    </span>
                    <span className={styles.detailValue}>
                      {formatTime(appointment.start_time)}
                    </span>
                  </div>

                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>
                      {getConsultationTypeIcon(appointment.consultation_type)}
                      <span className={styles.labelText}>Type</span>
                    </span>
                    <span className={styles.detailValue}>
                      {appointment.consultation_type}
                    </span>
                  </div>
                </div>

                <div className={styles.actions}>
                  <button
                    className={styles.primaryButton}
                    onClick={() => router.push("/")}
                  >
                    <Home size={18} className={styles.buttonIcon} />
                    Return to Home
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default AppointmentConfirmation;
