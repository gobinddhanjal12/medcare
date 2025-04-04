import { Suspense } from "react";
import AppointmentConfirmation from "../components/AppointmentConfirmation/AppointmentConfirmation";

const Page = () => {
  return (
    <Suspense fallback={<p>Loading appointment details...</p>}>
      <AppointmentConfirmation />
    </Suspense>
  );
};

export default Page;
