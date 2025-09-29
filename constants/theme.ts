export const lightTheme = {
  // Base
  background: "#FFFFFF",
  surface: "#F5F5F5",

  // Text
  textPrimary: "#000000",
  textSecondary: "#4A4A4A",
  textMuted: "#7A7A7A",

  // Brand / Accent
  primary: "#0066FF",
  surfacePrimary: "#EDE7F3",

  // Status
  statusTodo: "#666666",
  statusInProgress: "#D97706", // amber-600
  statusDone: "#4CAF50", // green-500
  statusWontDo: "#DC2626", // red-600

  // Feedback
  warning: "#F59E0B",
  success: "#16A34A",
  error: "#B91C1C",

  // Utility
  red: "#DC2626",
  link: "#2563EB",
};

export const darkTheme = {
  // Base
  background: "#2B2B2B",
  surface: "#121212",

  // Text
  textPrimary: "#FFFFFF",
  textSecondary: "#A796B1",
  textMuted: "#626262",

  // Brand / Accent
  primary: "#3399ff",
  surfacePrimary: "#2C2531",

  // Status
  statusTodo: "#A8A8A8",
  statusInProgress: "#E28D04",
  statusDone: "#4D690D",
  statusWontDo: "#C82D1F",

  // Feedback
  warning: "#643200",
  success: "#3F5214",
  error: "#7A1010",

  // Utility
  red: "#8C1A11",
  link: "#5181AC",
};

export type Theme = typeof lightTheme;
