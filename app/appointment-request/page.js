import { Suspense } from "react";
import AppointmentRequest from "../components/AppointmentRequest/AppointmentRequest";


const Page = () => {
  return (
    <Suspense fallback={<p>Loading appointment details...</p>}>
      <AppointmentRequest />
    </Suspense>
  );
};

export default Page;