"use client";
import { useState } from "react";
import "./Header.css";
import Link from "next/link";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="header">
            <div className="sub-container">
                <div className="logo">MedCare</div>



                <button className="hamburger" onClick={() => setIsOpen(true)}>
                    ☰
                </button>

                <div className={`menu-overlay ${isOpen ? "open" : ""}`}>
                    <button className="close-btn" onClick={() => setIsOpen(false)}>✖</button>
                    <nav className="nav-menu">
                        <ul>
                            <li><a href="#">Home</a></li>
                            <li><a href="#">Appointments</a></li>
                            <li><a href="#">Services</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>
                    </nav>
                </div>

                <nav className="desktop-nav-links">
                    <ul>
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/appointments">Appointments</Link></li>
                        <li><Link href="/services">Services</Link></li>
                        <li><Link href="/contact">Contact</Link></li>
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
