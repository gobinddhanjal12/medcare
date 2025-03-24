"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import styles from "./AppointmentRequest.module.css";

const AppointmentRequestContent = () => {
  const searchParams = useSearchParams();
  const date = searchParams.get("date");
  const time = searchParams.get("time");
  const doctorId = searchParams.get("doctorId");

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Appointment Request Submitted</h1>
      <p className={styles.detail}>
        Your request has been submitted and is pending approval.
      </p>
      <p className={styles.info}>
        <strong>Date:</strong> {date}
      </p>
      <p className={styles.info}>
        <strong>Time:</strong> {time}
      </p>
      <p className={styles.info}>
        <strong>Doctor ID:</strong> {doctorId}
      </p>
      <p className={styles.notice}>
        You will receive a confirmation once your appointment is approved.
      </p>
    </div>
  );
};

const AppointmentRequest = () => {
  return (
    <Suspense fallback={<p>Loading appointment details...</p>}>
      <AppointmentRequestContent />
    </Suspense>
  );
};

export default AppointmentRequest;
