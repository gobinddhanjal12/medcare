"use client";
import { useState } from "react";
import "./Header.css";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="header">
            <div className="sub-container">
                <div className="logo">
                    <Image src="/images/logo.png" alt="MedCare Logo" width={36} height={36} className="logo-img" />
                    <span className="logo-text">MedCare</span>
                </div>

                <button className="hamburger" onClick={() => setIsOpen(true)}>
                    ☰
                </button>

                <div className={`menu-overlay ${isOpen ? "open" : ""}`}>
                    <button className="close-btn" onClick={() => setIsOpen(false)}>✖</button>
                    <nav className="nav-menu">
                        <ul>
                            <li><a href="#">Home</a></li>
                            <li><a href="#">Appointments</a></li>
                            <li><a href="#">Health Blog</a></li>
                            <li><a href="#">Reviews</a></li>
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
                    <button className="login-btn btn">Login</button>
                    <button className="register-btn btn">Register</button>
                </div>
            </div>
        </header>
    );
};

export default Header;
