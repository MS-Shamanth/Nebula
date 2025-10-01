import React, { createContext, useContext, useState, useEffect } from "react";

export type ThemeMode = "default" | "high-contrast" | "dyslexia";
export type Language = "en" | "es" | "fr" | "de";
export type VoiceLanguage = "en-US" | "es-ES" | "fr-FR" | "de-DE";

interface AccessibilitySettings {
  themeMode: ThemeMode;
  darkMode: boolean;
  language: Language;
  fontSize: number;
  screenReaderMode: boolean;
  reducedMotion: boolean;
  emotionColorTheme: boolean;
  voiceReaderEnabled: boolean;
  voiceLanguage: VoiceLanguage;
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
  toggleVoiceReader: () => void;
  updateVoiceLanguage: (lang: VoiceLanguage) => void;
  readText: (text: string) => void;
  stopReading: () => void;
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
  voiceReaderEnabled: false,
  voiceLanguage: "en-US",
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

  const toggleVoiceReader = () => {
    setSettings(prev => ({ ...prev, voiceReaderEnabled: !prev.voiceReaderEnabled }));
    if (settings.voiceReaderEnabled) {
      window.speechSynthesis.cancel();
    }
  };

  const updateVoiceLanguage = (lang: VoiceLanguage) => {
    setSettings(prev => ({ ...prev, voiceLanguage: lang }));
  };

  const readText = async (text: string) => {
    if (!settings.voiceReaderEnabled) return;
    
    try {
      // Try to use ElevenLabs TTS via edge function
      const { supabase } = await import('@/integrations/supabase/client');
      
      const { data, error } = await supabase.functions.invoke('text-to-speech', {
        body: { text, voiceLanguage: settings.voiceLanguage }
      });

      if (error) throw error;

      if (data?.audioContent) {
        // Play the audio
        const audioBlob = base64ToBlob(data.audioContent, 'audio/mpeg');
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        await audio.play();
        
        // Clean up
        audio.onended = () => URL.revokeObjectURL(audioUrl);
        return;
      }
    } catch (error) {
      console.log('Using fallback TTS:', error);
    }

    // Fallback to Web Speech API
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = settings.voiceLanguage;
    utterance.rate = 0.9;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  };

  const stopReading = () => {
    window.speechSynthesis.cancel();
  };

  // Helper function to convert base64 to blob
  const base64ToBlob = (base64: string, mimeType: string) => {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    window.speechSynthesis.cancel();
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
        toggleVoiceReader,
        updateVoiceLanguage,
        readText,
        stopReading,
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
