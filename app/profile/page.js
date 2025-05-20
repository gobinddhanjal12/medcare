"use client";

import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";

const ProfilePage = () => {
  const { user, logout, loading } = useAuth();

  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading,user]);

  if (loading || !user) {
    return (
      <div className={styles.loadingContainer}>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Welcome, {user.name.charAt(0).toUpperCase() + user.name.slice(1)}
      </h1>
      <hr className={styles.hr} />
      {user && (
        <div className={styles.profileContainer}>
          <div className={styles.left}>
            <div className={styles.avatar}>
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>

          <div className={styles.right}>
            <div className={styles.inputGroup}>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={user.name}
                className={styles.name}
                disabled
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={user.email}
                disabled
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="joined">Joined</label>
              <input
                id="joined"
                name="joined"
                type="text"
                value={new Date(user.created_at).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
                disabled
              />
            </div>

            <div className={styles.inputGroup}>
              <button
                className={`${styles.logoutBtn} btn`}
                onClick={() => {
                  handleLogout();
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
