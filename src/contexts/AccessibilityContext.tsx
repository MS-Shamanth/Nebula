import React, { createContext, useContext, useState, useEffect } from "react";

export type ThemeMode = "default" | "high-contrast" | "dyslexia";
export type Language = "en" | "es" | "fr" | "de";

interface AccessibilitySettings {
  themeMode: ThemeMode;
  darkMode: boolean;
  language: Language;
  fontSize: number;
  screenReaderMode: boolean;
  reducedMotion: boolean;
  emotionColorTheme: boolean;
}

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  updateSettings: (updates: Partial<AccessibilitySettings>) => void;
  updateThemeMode: (mode: ThemeMode) => void;
  updateLanguage: (lang: Language) => void;
  updateFontSize: (size: number) => void;
  toggleScreenReaderMode: () => void;
  toggleReducedMotion: () => void;
  toggleEmotionColorTheme: () => void;
  toggleDarkMode: () => void;
  resetSettings: () => void;
}

const defaultSettings: AccessibilitySettings = {
  themeMode: "default",
  darkMode: false,
  language: "en",
  fontSize: 16,
  screenReaderMode: false,
  reducedMotion: false,
  emotionColorTheme: false,
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    const saved = localStorage.getItem("accessibility-settings");
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem("accessibility-settings", JSON.stringify(settings));
    
    // Apply dark mode
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Apply theme changes
    document.documentElement.setAttribute("data-accessibility-theme", settings.themeMode);
    document.documentElement.setAttribute("data-language", settings.language);
    document.documentElement.style.fontSize = `${settings.fontSize}px`;
    
    if (settings.reducedMotion) {
      document.documentElement.classList.add("reduce-motion");
    } else {
      document.documentElement.classList.remove("reduce-motion");
    }

    if (settings.emotionColorTheme) {
      document.documentElement.classList.add("emotion-color-theme");
    } else {
      document.documentElement.classList.remove("emotion-color-theme");
    }
  }, [settings]);

  const updateSettings = (updates: Partial<AccessibilitySettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  };

  const updateThemeMode = (mode: ThemeMode) => {
    setSettings(prev => ({ ...prev, themeMode: mode }));
  };

  const updateLanguage = (lang: Language) => {
    setSettings(prev => ({ ...prev, language: lang }));
  };

  const updateFontSize = (size: number) => {
    setSettings(prev => ({ ...prev, fontSize: size }));
  };

  const toggleScreenReaderMode = () => {
    setSettings(prev => ({ ...prev, screenReaderMode: !prev.screenReaderMode }));
  };

  const toggleReducedMotion = () => {
    setSettings(prev => ({ ...prev, reducedMotion: !prev.reducedMotion }));
  };

  const toggleEmotionColorTheme = () => {
    setSettings(prev => ({ ...prev, emotionColorTheme: !prev.emotionColorTheme }));
  };

  const toggleDarkMode = () => {
    setSettings(prev => ({ ...prev, darkMode: !prev.darkMode }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  return (
    <AccessibilityContext.Provider
      value={{
        settings,
        updateSettings,
        updateThemeMode,
        updateLanguage,
        updateFontSize,
        toggleScreenReaderMode,
        toggleReducedMotion,
        toggleEmotionColorTheme,
        toggleDarkMode,
        resetSettings,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error("useAccessibility must be used within AccessibilityProvider");
  }
  return context;
};
