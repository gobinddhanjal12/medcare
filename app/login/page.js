"use client";

import { useState } from "react";
import styles from "./login.module.css";
import { Mail, Lock } from "lucide-react";
import Link from "next/link";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Email:", email, "Password:", password);
    };

    return (
        <div className={styles.login}>
            <div className={styles.card}>
                <h2>Login</h2>
                <p>
                    Are you a member? <Link href="/signup">Sign up here</Link>
                </p>
                <form onSubmit={handleSubmit}>
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
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className={styles.loginbtn}>Login</button>
                    <button type="reset" className={styles.resetbtn}>Reset</button>

                    <div className={styles.forgetPassword}>
                        <Link href="#">Forgot Password?</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
