"use client";

import { useEffect, useState } from "react";
import styles from "./styles.module.css";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found. Please log in.");
        }

        const response = await fetch("http://localhost:3000/api/v1/auth/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch user data");
        }

        setUser(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.profileContainer}>
      <h1 className={styles.title}>User Profile</h1>
      {user && (
        <div className={styles.card}>
          <div className={styles.avatar}>{user.name.charAt(0)}</div>
          <div className={styles.details}>
            <h2>Name: {user.name}</h2>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Joined:</strong>{" "}
              {new Date(user.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
