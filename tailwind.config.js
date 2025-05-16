/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Primary colors
        primary: {
          DEFAULT: "#4F46E5",
          50: "#EEF2FF",
          100: "#E0E7FF",
          500: "#4F46E5",
          600: "#4338CA",
        },
        // Status colors
        success: "#10B981",
        error: "#EF4444",
        warning: "#F59E0B",
        // Grayscale
        text: {
          primary: "#111827",
          secondary: "#6B7280",
          disabled: "#9CA3AF",
        },
        border: "#E5E7EB",
        card: "#F9FAFB",
      },
      // Custom container styling
      container: {
        center: true,
        padding: "2rem",
      },
      // Form-specific extensions
      extend: {
        spacing: {
          "form-group": "1.5rem", // Consistent spacing between form groups
        },
        boxShadow: {
          form: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
        },
      },
    },
  },
  plugins: [],
};
