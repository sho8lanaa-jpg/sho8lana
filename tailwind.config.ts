import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1280px" },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-cairo)", "system-ui", "sans-serif"],
        display: ["var(--font-cairo)", "system-ui", "sans-serif"],
      },
      colors: {
        background: "#0B1120",
        foreground: "#FFFFFF",
        primary: {
          DEFAULT: "#2563EB",
          foreground: "#FFFFFF",
          50: "#EFF4FF",
          400: "#5B8DEF",
          500: "#2563EB",
          600: "#1D4ED8",
          700: "#1E40AF",
        },
        accent: {
          DEFAULT: "#06B6D4",
          foreground: "#052E33",
        },
        card: {
          DEFAULT: "rgba(255,255,255,0.04)",
          hover: "rgba(255,255,255,0.07)",
        },
        border: "rgba(255,255,255,0.08)",
        muted: {
          DEFAULT: "rgba(255,255,255,0.06)",
          foreground: "rgba(255,255,255,0.6)",
        },
        destructive: {
          DEFAULT: "#EF4444",
          foreground: "#FFFFFF",
        },
        success: "#22C55E",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(37,99,235,0.15), 0 8px 30px rgba(37,99,235,0.15)",
        card: "0 4px 24px rgba(0,0,0,0.25)",
      },
      backgroundImage: {
        "grid-glow":
          "radial-gradient(60% 50% at 50% 0%, rgba(37,99,235,0.18) 0%, rgba(11,17,32,0) 70%)",
        "accent-radial":
          "radial-gradient(40% 40% at 80% 20%, rgba(6,182,212,0.15) 0%, rgba(11,17,32,0) 70%)",
      },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
        shimmer: { "0%": { backgroundPosition: "-200% 0" }, "100%": { backgroundPosition: "200% 0" } },
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-6px)" } },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shimmer: "shimmer 2s linear infinite",
        float: "float 4s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
