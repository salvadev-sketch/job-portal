/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F7F5F0",
        "paper-raised": "#FFFFFF",
        ink: "#14213D",
        "ink-soft": "#2B3A5E",
        signal: "#FFB100",
        "signal-deep": "#C98600",
        slate: "#5C6470",
        line: "#DAD6CC",
        accept: "#3C7A5D",
        reject: "#B4483A",
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["Inter", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
      borderRadius: {
        DEFAULT: "2px",
      },
    },
  },
  plugins: [],
};
