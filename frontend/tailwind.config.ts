import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          purple: "#7C3AED",
          cyan: "#22D3EE",
          dark: "#0F0C29",
          "dark-secondary": "#1E1B36",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      animation: {
        "pulse-ring": "pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "pulse-dot": "pulse-dot 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "rotate-ring": "rotate-ring 3s linear infinite",
        "scan-line": "scan-line 2s ease-in-out infinite",
        "wave": "wave 1.4s ease-in-out infinite",
        "float-robot": "float-robot 4s ease-in-out infinite",
        "think-bounce": "think-bounce 0.5s ease-in-out infinite",
        "nod-head": "nod-head 1s ease-in-out infinite",
        "pulse-think": "pulse-think 0.8s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "blink": "blink 4s ease-in-out infinite",
        "pulse-mouth": "pulse-mouth 2s ease-in-out infinite",
        "blink-panel": "blink-panel 3s ease-in-out infinite",
        "pulse-core": "pulse-core 2s ease-in-out infinite",
        "blink-status": "blink-status 1.5s ease-in-out infinite",
        "wave-arm-left": "wave-arm-left 3s ease-in-out infinite",
        "wave-arm-right": "wave-arm-right 3s ease-in-out infinite",
        "float-up": "float-up 15s linear infinite",
        "float-particle": "float-particle 12s ease-in-out infinite",
        "pop-in": "pop-in 0.3s ease-out",
        "float-bulb": "float-bulb 2s ease-in-out infinite",
        "pulse-light": "pulse-light 1.5s ease-in-out infinite",
        "pulse-bulb": "pulse-bulb 1.5s ease-in-out infinite",
        "ray-pulse": "ray-pulse 1.5s ease-in-out infinite",
        "thought-bubble": "thought-bubble 2s ease-in-out infinite",
        "rotate-glow": "rotate-glow 3s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;

