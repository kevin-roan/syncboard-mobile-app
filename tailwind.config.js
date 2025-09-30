import { lightTheme, darkTheme } from './constants/theme';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  darkMode: 'class', // allows `dark:` variant switching
  theme: {
    extend: {
      colors: {
        // Light theme (flat namespace)
        background: lightTheme.background,
        surface: lightTheme.surface,
        textPrimary: lightTheme.textPrimary,
        textSecondary: lightTheme.textSecondary,
        textMuted: lightTheme.textMuted,
        primary: lightTheme.primary,
        surfacePrimary: lightTheme.surfacePrimary,
        surfaceSecondary: lightTheme.surfaceSecondary,
        statusTodo: lightTheme.statusTodo,
        statusInProgress: lightTheme.statusInProgress,
        statusDone: lightTheme.statusDone,
        statusWontDo: lightTheme.statusWontDo,
        warning: lightTheme.warning,
        success: lightTheme.success,
        error: lightTheme.error,
        red: lightTheme.red,
        link: lightTheme.link,

        // Dark theme (nested namespace)
        dark: {
          background: darkTheme.background,
          surface: darkTheme.surface,
          textPrimary: darkTheme.textPrimary,
          textSecondary: darkTheme.textSecondary,
          textMuted: darkTheme.textMuted,
          primary: darkTheme.primary,
          surfacePrimary: darkTheme.surfacePrimary,
          surfaceSecondary: darkTheme.surfaceSecondary,
          statusTodo: darkTheme.statusTodo,
          statusInProgress: darkTheme.statusInProgress,
          statusDone: darkTheme.statusDone,
          statusWontDo: darkTheme.statusWontDo,
          warning: darkTheme.warning,
          success: darkTheme.success,
          error: darkTheme.error,
          red: darkTheme.red,
          link: darkTheme.link,
        },
      },
    },
  },
  plugins: [],
};
