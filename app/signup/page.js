"use client";

import { useState } from "react";
import styles from "./signup.module.css";
import { Lock, Mail, User, Phone, UserCheck } from "lucide-react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

export default function Signup() {
    const [role, setRole] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Role:", role, "Name:", name, "Phone:", phone, "Email:", email, "Password:", password);
    };

    return (
        <div className={styles.signup}>
            <div className={styles.card}>
                <h2>Sign Up</h2>
                <p>
                    Already have an account? <Link href="/login">Login here</Link>
                </p>
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


                    <button type="submit" className={styles.signupbtn}>Submit</button>
                    <button type="reset" className={styles.resetbtn}>Reset</button>
                </form>
            </div>
        </div>
    );
}
