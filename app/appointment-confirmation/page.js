import { Suspense } from "react";
import AppointmentConfirmation from "../components/AppointmentConfirmation/AppointmentConfirmation";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

const Page = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <AppointmentConfirmation />
    </Suspense>
  );
};

export default Page;
