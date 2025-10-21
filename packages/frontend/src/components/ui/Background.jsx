import React from "react";

export default function Background() {
    return (
        <div
            className="fixed inset-0 -z-10 pointer-events-none overflow-hidden"
            aria-hidden="true"
        >
            <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950 dark:via-purple-950 dark:to-pink-950 border-b border-white/40 dark:border-gray-800" />

            <div className="absolute -left-24 top-32 w-80 h-80 rounded-full bg-blue-200/30 dark:bg-blue-400/10 blur-3xl sm:block hidden" />
            <div className="absolute right-0 bottom-32 w-80 h-80 rounded-full bg-purple-300/25 dark:bg-purple-400/10 blur-3xl sm:block hidden" />
            <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-96 h-96 rounded-full bg-pink-200/20 dark:bg-pink-400/10 blur-3xl hidden md:block" />

            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)]" />
        </div>
    );
}
