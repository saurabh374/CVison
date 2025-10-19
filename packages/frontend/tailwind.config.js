/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "#E5E7EB",
        input: "#D1D5DB",
        ring: "#3B82F6",
        background: "#F8F9FA",
        foreground: "#212529",
        primary: {
          DEFAULT: "#007BFF",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#6C757D",
          foreground: "#FFFFFF",
        },
        destructive: {
          DEFAULT: "#DC3545",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#F1F5F9",
          foreground: "#64748B",
        },
        accent: {
          DEFAULT: "#F1F5F9",
          foreground: "#1E293B",
        },
        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#212529",
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#212529",
        },
      },
      borderRadius: {
        lg: "0.5rem",
        md: "0.25rem",
        sm: "0.125rem",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}