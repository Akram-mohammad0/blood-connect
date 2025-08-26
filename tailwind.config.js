/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // ✅ enable dark mode via class
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(8px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        pop: {
          "0%": { transform: "scale(0.96)" },
          "100%": { transform: "scale(1)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.6 },
        },
        confetti: {
          "0%": { transform: "translateY(-100vh) rotate(0deg)" },
          "100%": { transform: "translateY(100vh) rotate(360deg)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.35s ease-out forwards",
        pop: "pop 0.15s ease-out forwards",
        pulseSoft: "pulseSoft 1.6s ease-in-out infinite",
        confetti: "confetti 2.4s linear infinite",
      },
      boxShadow: {
        soft: "0 8px 30px rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [],
};
