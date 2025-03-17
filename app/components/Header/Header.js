"use client";
import { useState } from "react";
import "./Header.css";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const handleCloseMenu = () => setIsOpen(false);

    return (
        <header className="header">
            <div className="sub-container">
                <div className="logo cursor-pointer" onClick={() => router.push("/")}>
                    <Image src="/images/logo.png" alt="MedCare Logo" width={36} height={36} className="logo-img" />
                    <span className="logo-text">MedCare</span>
                </div>

                <button className="hamburger" onClick={() => setIsOpen(true)}>
                    <Menu size={36} />
                </button>

                <div className={`menu-overlay ${isOpen ? "open" : ""}`}>
                    <button className="close-btn" onClick={handleCloseMenu}>
                        <X size={36} />
                    </button>
                    <nav className="nav-menu">
                        <ul>
                            <li><Link href="/" onClick={handleCloseMenu}>Home</Link></li>
                            <li><Link href="/appointments" onClick={handleCloseMenu}>Appointments</Link></li>
                            <li><Link href="/services" onClick={handleCloseMenu}>Health Blog</Link></li>
                            <li><Link href="/contact" onClick={handleCloseMenu}>Reviews</Link></li>
                            <li>
                                <button className="login-btn btn" onClick={() => { router.push("/login"); handleCloseMenu(); }}>
                                    Login
                                </button>
                            </li>
                            <li>
                                <button className="register-btn btn" onClick={() => { router.push("/signup"); handleCloseMenu(); }}>
                                    Register
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>

                <nav className="desktop-nav-links">
                    <ul>
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/appointments">Appointments</Link></li>
                        <li><Link href="/services">Health Blog</Link></li>
                        <li><Link href="/contact">Reviews</Link></li>
                    </ul>
                </nav>


                <div className="desktop-buttons">
                    <button className="login-btn btn" onClick={() => router.push("/login")}>
                        Login
                    </button>
                    <button className="register-btn btn" onClick={() => router.push("/signup")}>
                        Register
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;