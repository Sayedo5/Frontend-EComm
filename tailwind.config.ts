import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./data/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        maroon: { deepest: "#190A12", deep: "#240B16", mid: "#5A1028" },
        crimson: "#8B1E3F",
        rosered: "#C9184A",
        rose: "#FF4D6D",
        blush: "#FFB3C6",
        warmwhite: "#FFF0F3",
        gold: "#F7C873",
        night: "#0E0B1F",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        urdu: ["var(--font-urdu)", "Noto Nastaliq Urdu", "serif"],
      },
      keyframes: {
        breathe: { "0%,100%": { opacity: "0.55", transform: "scale(1)" }, "50%": { opacity: "0.9", transform: "scale(1.06)" } },
        heartbeat: { "0%,100%": { transform: "scale(1)" }, "14%": { transform: "scale(1.05)" }, "28%": { transform: "scale(1)" }, "42%": { transform: "scale(1.04)" }, "60%": { transform: "scale(1)" } },
      },
      animation: {
        breathe: "breathe 6s ease-in-out infinite",
        heartbeat: "heartbeat 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
