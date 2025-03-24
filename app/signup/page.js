"use client";

import { useState } from "react";
import styles from "./signup.module.css";
import { Lock, Mail, User, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setLoading(true);

        const userData = {
            name,
            email,
            password,
            role: "patient"
        };

        try {
            const response = await fetch(`${API_BASE_URL}/auth/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess("Signup successful! Redirecting...");
                setTimeout(() => {
                    window.location.href = "/login";
                }, 2000);
            } else {
                setError(data.message || "Signup failed. Please try again.");
            }
        } catch (error) {
            setError("An error occurred. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setName("");
        setEmail("");
        setPassword("");
        setError(null);
        setSuccess(null);
    };

    return (
        <div className={styles.signup}>
            <div className={styles.card}>
                <h2>Sign Up</h2>
                <p>
                    Already have an account? <Link href="/login">Login here</Link>
                </p>
                {error && <p className={styles.error}>{error}</p>}
                {success && <p className={styles.success}>{success}</p>}
                <form onSubmit={handleSubmit}>
                    <label>Name</label>
                    <div className={styles.inputContainer}>
                        <User className={styles.icon} size={18} />
                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <label>Email</label>
                    <div className={styles.inputContainer}>
                        <Mail className={styles.icon} size={18} />
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <label>Password</label>
                    <div className={styles.inputContainer}>
                        <Lock className={styles.icon} size={18} />
                        <input
                            className={styles.inputField}
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <span
                            className={styles.eyeIcon}
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </span>
                    </div>

                    <button type="submit" className={styles.signupbtn} disabled={loading}>
                        {loading ? "Signing Up..." : "Submit"}
                    </button>
                    <button type="button" className={styles.resetbtn} onClick={handleReset} disabled={loading}>Reset</button>
                </form>
            </div>
        </div>
    );
}