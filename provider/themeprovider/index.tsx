import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { useColorScheme } from "react-native";
import { darkTheme, lightTheme, Theme } from "@/constants/theme";
import { getStorageItem } from "@/utils/storage";

type ThemeMode = "light" | "dark" | "system";

interface ThemeContextProps {
  theme: Theme;
  mode: ThemeMode;
  toggleTheme: () => void;
  setMode: (mode: ThemeMode) => void;
  isSystemMode: boolean;
}

const THEME_STORAGE_KEY = "theme";

const ThemeContext = createContext<ThemeContextProps | null>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const systemScheme = useColorScheme();
  const [mode, setModeState] = useState<ThemeMode>("system");

  useEffect(() => {
    const loadStoredTheme = () => {
      try {
        const storedMode = getStorageItem(THEME_STORAGE_KEY);
        if (
          storedMode === "light" ||
          storedMode === "dark" ||
          storedMode === "system"
        ) {
          setModeState(storedMode);
        }
      } catch (error) {
        console.warn("Failed to load theme from storage:", error);
        setModeState("system");
      }
    };

    loadStoredTheme();
  }, []);

  const theme = useMemo((): Theme => {
    if (mode === "system") {
      return systemScheme === "dark" ? darkTheme : lightTheme;
    }
    return mode === "dark" ? darkTheme : lightTheme;
  }, [mode, systemScheme]);

  useEffect(() => {
    try {
      setStorageItem(THEME_STORAGE_KEY, mode);
    } catch (error) {
      console.warn("Failed to save theme to storage:", error);
    }
  }, [mode]);

  const toggleTheme = useCallback(() => {
    setModeState((prevMode) => {
      if (prevMode === "system") {
        return systemScheme === "dark" ? "light" : "dark";
      }
      return prevMode === "light" ? "dark" : "light";
    });
  }, [systemScheme]);

  const setMode = useCallback((newMode: ThemeMode) => {
    if (newMode === "light" || newMode === "dark" || newMode === "system") {
      setModeState(newMode);
    } else {
      console.warn(
        `Invalid theme mode: ${newMode}. Using 'system' as fallback.`,
      );
      setModeState("system");
    }
  }, []);

  const isSystemMode = mode === "system";

  const contextValue = useMemo(
    () => ({
      theme,
      mode,
      toggleTheme,
      setMode,
      isSystemMode,
    }),
    [theme, mode, toggleTheme, setMode, isSystemMode],
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useTheme must be used within a ThemeProvider. " +
        "Make sure your component is wrapped with <ThemeProvider>.",
    );
  }

  return context;
};

export const useCurrentTheme = (): Theme => {
  const { theme } = useTheme();
  return theme;
};

export const useThemeControls = () => {
  const { mode, toggleTheme, setMode, isSystemMode } = useTheme();
  return { mode, toggleTheme, setMode, isSystemMode };
};
