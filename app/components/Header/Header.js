"use client";
import { useState } from "react";
import styles from "./Header.module.css";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const handleCloseMenu = () => setIsOpen(false);

    return (
        <header className={styles.header}>
            <div className={styles.subContainer}>
                <div className={styles.logo} onClick={() => router.push("/")}>
                    <Image src="/images/logo.png" alt="MedCare Logo" width={36} height={36} className={styles.logoImg} />
                    <span className={styles.logoText}>MedCare</span>
                </div>

                <button className={styles.hamburger} onClick={() => setIsOpen(true)}>
                    <Menu size={36} />
                </button>

                <div className={`${styles.menuOverlay} ${isOpen ? styles.menuOpen : ""}`}>
                    <button className={styles.closeBtn} onClick={handleCloseMenu}>
                        <X size={36} />
                    </button>
                    <nav className={styles.navMenu}>
                        <ul>
                            <li><Link href="/" onClick={handleCloseMenu}>Home</Link></li>
                            <li><Link href="/appointments" onClick={handleCloseMenu}>Appointments</Link></li>
                            <li><Link href="/services" onClick={handleCloseMenu}>Health Blog</Link></li>
                            <li><Link href="/contact" onClick={handleCloseMenu}>Reviews</Link></li>
                            <li>
                                <button className={`${styles.loginBtn} btn`} onClick={() => { router.push("/login"); handleCloseMenu(); }}>
                                    Login
                                </button>
                            </li>
                            <li>
                                <button className={`${styles.registerBtn} btn`} onClick={() => { router.push("/signup"); handleCloseMenu(); }}>
                                    Register
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>

                <nav className={styles.desktopNavLinks}>
                    <ul>
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/appointments">Appointments</Link></li>
                        <li><Link href="/services">Health Blog</Link></li>
                        <li><Link href="/contact">Reviews</Link></li>
                    </ul>
                </nav>

                <div className={styles.desktopButtons}>
                    <button className={`${styles.loginBtn} btn`} onClick={() => router.push("/login")}>
                        Login
                    </button>
                    <button className={`${styles.registerBtn} btn`} onClick={() => router.push("/signup")}>
                        Register
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;