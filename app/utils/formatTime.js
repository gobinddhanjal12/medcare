export function formatTime(timeString) {
  if (!timeString) return "";

  const [hours, minutes] = timeString.split(":");

  const date = new Date();
  date.setHours(parseInt(hours, 10));
  date.setMinutes(parseInt(minutes, 10));
  date.setSeconds(0);

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}
