import Appointments from "../components/Appointments/Appointments";

export const metadata = {
  title: "Appointments",
  description:
    "View, manage, and schedule your doctor appointments with Medcare.",
  keywords: [
    "doctor appointments",
    "manage appointments",
    "schedule consultation",
    "appointment booking",
    "medical schedule",
    "Medcare booking system",
  ],
};

export default function AvailableDoctors() {
  return <Appointments />;
}
