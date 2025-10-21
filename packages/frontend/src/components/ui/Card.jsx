import React from "react";

export function Card({ children, className, ...props }) {
    return (
        <div
            className={`relative w-full bg-white rounded-lg border border-gray-100 shadow-card p-6 ${className || ""}`}
            {...props}
        >
            {children}
        </div>
    );
}
