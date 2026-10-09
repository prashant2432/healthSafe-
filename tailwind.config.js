/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Display",
          "SF Pro Text",
          "Inter",
          "system-ui",
          "sans-serif"
        ],
      },
      colors: {
        apple: {
          canvas: "#F5F5F7",
          surface: "rgba(255, 255, 255, 0.85)",
          card: "#FFFFFF",
          border: "rgba(0, 0, 0, 0.07)",
          borderStrong: "rgba(0, 0, 0, 0.12)",
          text: "#1D1D1F",
          secondary: "#6E6E73",
          tertiary: "#86868B",
          blue: "#0071E3",
          blueLight: "#EBF5FF",
          mint: "#34C759",
          mintLight: "#EAF8EE",
          amber: "#FF9500",
          amberLight: "#FFF5E6",
          coral: "#FF5A36",
          coralLight: "#FFF0EB",
          crimson: "#FF3B30",
          crimsonLight: "#FFECEB",
        }
      },
      borderRadius: {
        'squircle-sm': '10px',
        'squircle': '14px',
        'squircle-md': '16px',
        'squircle-lg': '20px',
        'squircle-xl': '24px',
      },
      boxShadow: {
        'apple-subtle': '0 2px 10px rgba(0, 0, 0, 0.03), 0 1px 2px rgba(0, 0, 0, 0.03)',
        'apple-card': '0 8px 30px rgba(0, 0, 0, 0.04), 0 2px 6px rgba(0, 0, 0, 0.02)',
        'apple-float': '0 20px 40px -10px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.03)',
        'apple-glow': '0 0 20px -4px rgba(0, 113, 227, 0.25)',
      }
    },
  },
  plugins: [],
}
