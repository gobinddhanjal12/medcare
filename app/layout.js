import "./globals.css";
import Header from "./components/Header/Header";
import { Montserrat } from "next/font/google";
import Footer from "./components/Footer/Footer";
import ChatBot from "./components/ChatBot/ChatBot";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata = {
  title: {
    default: "Medcare",
    template: "%s | Medcare",
  },
  description:
    "Medcare connects you with trusted doctors and healthcare professionals for easy online appointments and expert care.",
  keywords: [
    "online doctor booking",
    "find doctors near me",
    "healthcare services",
    "virtual doctor consultation",
    "book medical appointments",
    "clinic appointment system",
    "medical experts online",
    "healthcare booking website",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Header />
        <ChatBot />
        <main className="container">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
