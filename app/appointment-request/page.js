import { Suspense } from "react";
import AppointmentRequest from "../components/AppointmentRequest/AppointmentRequest";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

const Page = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <AppointmentRequest />
    </Suspense>
  );
};

export default Page;
