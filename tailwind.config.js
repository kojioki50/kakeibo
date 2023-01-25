/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        "swirl-in-top-bck": "swirl-in-top-bck 0.6s ease   both",
        "slide-in-elliptic-top-fwd": "slide-in-elliptic-top-fwd 0.7s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both",
      },
      keyframes: {
        "swirl-in-top-bck": {
          "0%": {
            transform: "rotate(540deg) scale(5)",
            "transform-origin": "50% 0",
            opacity: "0",
          },
          to: {
            transform: "rotate(0) scale(1)",
            "transform-origin": "50% 0",
            opacity: "1",
          },
        },
        "slide-in-elliptic-top-fwd": {
          "0%": {
            transform: "translateY(-600px) rotateX(-30deg) scale(0)",
            "transform-origin": "50% 100%",
            opacity: "0",
          },
          to: {
            transform: "translateY(0) rotateX(0) scale(1)",
            "transform-origin": "50% 1400px",
            opacity: "1",
          },
        },
      },
    },
  },
  plugins: [],
};
