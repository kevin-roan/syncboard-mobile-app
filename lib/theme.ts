import { DarkTheme, DefaultTheme, type Theme as NavTheme } from '@react-navigation/native';

export const THEME = {
  light: {
    background: 'hsl(0, 0%, 100%)', // #FFFFFF
    foreground: 'hsl(0, 0%, 0%)', // #000000
    card: 'hsl(0, 0%, 96%)', // #F5F5F5
    cardForeground: 'hsl(0, 0%, 0%)', // #000000
    popover: 'hsl(0, 0%, 100%)', // #FFFFFF
    popoverForeground: 'hsl(0, 0%, 0%)', // #000000
    primary: 'hsl(216, 100%, 33%)', // #0066FF
    primaryForeground: 'hsl(0, 0%, 100%)', // #FFFFFF
    secondary: 'hsl(0, 0%, 48%)', // #7A7A7A
    secondaryForeground: 'hsl(0, 0%, 0%)', // #000000
    muted: 'hsl(0, 0%, 77%)', // #C5C5C5
    mutedForeground: 'hsl(0, 0%, 29%)', // #4A4A4A
    accent: 'hsl(250, 36%, 95%)', // #EDE7F3
    accentForeground: 'hsl(216, 100%, 33%)', // #0066FF
    success: 'hsl(78, 60%, 20%)', // #405315
    warning: 'hsl(37, 97%, 45%)', // #E28D04
    destructive: 'hsl(0, 84%, 60%)', // #DC2626
    info: 'hsl(0, 0%, 66%)', // #A8A8A8
    border: 'hsl(0, 0%, 25%)' /* #404040 */,
    input: 'hsl(0, 0%, 96%)', // #F5F5F5
    ring: 'hsl(0, 0%, 77%)', // #C5C5C5
    radius: '0.625rem',
    chart1: 'hsl(34, 76%, 51%)', // #D97706
    chart2: 'hsl(123, 39%, 49%)', // #4CAF50
    chart3: 'hsl(216, 100%, 33%)', // #3399FF
    chart4: 'hsl(39, 100%, 57%)', // #F59E0B
    chart5: 'hsl(0, 84%, 60%)', // #DC2626
  },
  dark: {
    background: 'hsl(0, 0%, 17%)', // #2B2B2B
    foreground: 'hsl(0, 0%, 100%)', // #FFFFFF
    card: 'hsl(0, 0%, 10%)', // #222222
    cardForeground: 'hsl(0, 0%, 100%)', // #FFFFFF
    popover: 'hsl(0, 0%, 17%)', // #2B2B2B
    popoverForeground: 'hsl(0, 0%, 100%)', // #FFFFFF
    primary: 'hsl(210, 100%, 60%)', // #3399FF
    primaryForeground: 'hsl(0, 0%, 17%)', // #2B2B2B
    secondary: 'hsl(280, 23%, 69%)', // #A796B1
    secondaryForeground: 'hsl(0, 0%, 100%)', // #FFFFFF
    muted: 'hsl(0, 0%, 51%)', // #818181
    mutedForeground: 'hsl(280, 23%, 69%)', // #A796B1
    accent: 'hsl(270, 26%, 20%)', // #2C2531
    accentForeground: 'hsl(210, 100%, 60%)', // #3399FF
    success: 'hsl(78, 60%, 20%)', // #405315
    warning: 'hsl(37, 97%, 45%)', // #E28D04
    destructive: 'hsl(5, 72%, 45%)', // #C82D1F
    info: 'hsl(0, 0%, 66%)', // #A8A8A8
    border: 'hsl(0, 0%, 25%)' /* #404040 */,
    input: 'hsl(0, 0%, 7%)', // #121212
    ring: 'hsl(207, 33%, 46%)', // #5181AC
    radius: '0.625rem',
    chart1: 'hsl(240, 100%, 50%)', // #2200FF
    chart2: 'hsl(162, 50%, 40%)', // #339966
    chart3: 'hsl(39, 100%, 50%)', // #FFA500
    chart4: 'hsl(290, 50%, 50%)', // #A64CA6
    chart5: 'hsl(340, 100%, 60%)', // #FF3366
    // task Status bar colors (should be in rgba)
    in_progress: 'rgba(102, 51, 0, 0.9)',
    completed: 'rgba(64, 83, 20, 1)',
    wont_do: 'rgba(123, 15, 15, 1)',
    todo: 'rgba(153, 153, 153, 1)',
  },
};

// export const NAV_THEME: Record<'light' | 'dark', NavTheme> = {
//   light: {
//     ...DefaultTheme,
//     colors: {
//       background: THEME.light.background,
//       border: THEME.light.border,
//       card: THEME.light.card,
//       notification: THEME.light.destructive,
//       primary: THEME.light.primary,
//       text: THEME.light.foreground,
//     },
//   },
//   dark: {
//     ...DarkTheme,
//     colors: {
//       background: THEME.dark.background,
//       border: THEME.dark.border,
//       card: THEME.dark.card,
//       notification: THEME.dark.destructive,
//       primary: THEME.dark.primary,
//       text: THEME.dark.foreground,
//     },
//   },
// };
