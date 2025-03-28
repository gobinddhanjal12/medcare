"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import styles from "./styles.module.css";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

const DoctorDetails = () => {
  const { id } = useParams();
  const router = useRouter();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchDoctorDetails = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/doctors/${id}`);
        if (!res.ok) throw new Error("Failed to fetch doctor details");
        const data = await res.json();
        setDoctor(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorDetails();
  }, [id]);

  if (loading)
    return <p className={styles.loading}>Loading doctor details...</p>;
  if (error) return <p className={styles.error}>Error: {error}</p>;
  if (!doctor) return <p className={styles.error}>Doctor not found</p>;

  const imageUrl = doctor.photo_path?.startsWith("/")
    ? `${API_BASE_URL}${doctor.photo_path}`
    : doctor.photo_path || "/default-doctor.jpg"; // Provide a default image

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img src={imageUrl} alt={doctor.name} className={styles.profileImage} />
        <div className={styles.details}>
          <h2 className={styles.name}>{doctor.name}</h2>
          <p className={styles.specialty}>{doctor.specialty}</p>
          <p>
            <strong>Experience:</strong> {doctor.experience} years
          </p>
          <p>
            <strong>Location:</strong> {doctor.location}
          </p>
          <p>
            <strong>Consultation Fee:</strong> ₹{doctor.consultation_fee}
          </p>

          {doctor.education ? (
            <p>
              <strong>Education:</strong> {doctor.education}
            </p>
          ) : null}
          {doctor.bio ? (
            <p>
              <strong>Bio:</strong> {doctor.bio}
            </p>
          ) : null}
          {doctor.languages && doctor.languages.length > 0 ? (
            <p>
              <strong>Languages:</strong> {doctor.languages.join(", ")}
            </p>
          ) : null}

          <button
            className={styles.bookButton}
            onClick={() => router.push(`/book-appointment/${id}`)}
          >
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;
