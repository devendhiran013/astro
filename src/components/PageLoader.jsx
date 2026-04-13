import React from "react";
import "./PageLoader.css";

export default function PageLoader({ message = "Loading..." }) {
    return (
        <div className="pl-overlay">
            <div className="pl-box">

                {/* Orbiting icons illustration */}
                <div className="pl-orbit-wrapper">
                    <div className="pl-orbit-ring"></div>
                    <div className="pl-orbit-ring pl-ring2"></div>

                    {/* Center pulsing icon */}
                    <div className="pl-center-icon">
                        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="24" cy="24" r="20" fill="url(#gCenter)" />
                            <path d="M24 14 L27 21 L35 21 L29 26 L31 34 L24 29 L17 34 L19 26 L13 21 L21 21 Z"
                                fill="white" opacity="0.95" />
                            <defs>
                                <radialGradient id="gCenter" cx="50%" cy="40%" r="60%">
                                    <stop offset="0%" stopColor="#a78bfa" />
                                    <stop offset="100%" stopColor="#6d28d9" />
                                </radialGradient>
                            </defs>
                        </svg>
                    </div>

                    {/* Orbiting dot 1 – shopping bag */}
                    <div className="pl-dot pl-dot1">
                        <span className="pl-dot-icon">🛍️</span>
                    </div>

                    {/* Orbiting dot 2 – chart */}
                    <div className="pl-dot pl-dot2">
                        <span className="pl-dot-icon">📊</span>
                    </div>

                    {/* Orbiting dot 3 – users */}
                    <div className="pl-dot pl-dot3">
                        <span className="pl-dot-icon">👥</span>
                    </div>

                    {/* Orbiting dot 4 – package */}
                    <div className="pl-dot pl-dot4">
                        <span className="pl-dot-icon">📦</span>
                    </div>
                </div>

                {/* Animated bar loader */}
                <div className="pl-bars">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="pl-bar" style={{ animationDelay: `${i * 0.12}s` }} />
                    ))}
                </div>

                <p className="pl-message">{message}</p>
            </div>
        </div>
    );
}
