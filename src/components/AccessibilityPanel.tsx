import { useAccessibility, ThemeMode, Language, VoiceLanguage } from "@/contexts/AccessibilityContext";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Switch } from "./ui/switch";
import { Accessibility, Type, Eye, Volume2, Palette, RotateCcw, Moon, Sun } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";

export const AccessibilityPanel = () => {
  const {
    settings,
    updateThemeMode,
    updateLanguage,
    updateFontSize,
    toggleScreenReaderMode,
    toggleReducedMotion,
    toggleEmotionColorTheme,
    toggleDarkMode,
    toggleVoiceReader,
    updateVoiceLanguage,
    resetSettings,
  } = useAccessibility();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="fixed bottom-4 right-4 z-50 rounded-full h-14 w-14 shadow-lg" aria-label="Open accessibility settings">
          <Accessibility className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <ScrollArea className="h-full pr-4">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Accessibility className="h-5 w-5" />
            Accessibility Settings
          </SheetTitle>
          <SheetDescription>
            Customize your viewing experience for maximum comfort and accessibility.
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 py-6">
          {/* Dark Mode Toggle */}
          <div className="flex items-center justify-between p-4 bg-card rounded-lg border">
            <Label htmlFor="dark-mode" className="flex items-center gap-2 cursor-pointer">
              {settings.darkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              <div>
                <div className="font-semibold">Dark Mode</div>
                <div className="text-xs text-muted-foreground">Toggle dark/light theme</div>
              </div>
            </Label>
            <Switch
              id="dark-mode"
              checked={settings.darkMode}
              onCheckedChange={toggleDarkMode}
            />
          </div>

          {/* Theme Mode */}
          <div className="space-y-2">
            <Label htmlFor="theme-mode" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Visual Theme
            </Label>
            <Select value={settings.themeMode} onValueChange={(value) => updateThemeMode(value as ThemeMode)}>
              <SelectTrigger id="theme-mode">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="high-contrast">High Contrast</SelectItem>
                <SelectItem value="dyslexia">Dyslexia Friendly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Language */}
          <div className="space-y-2">
            <Label htmlFor="language" className="flex items-center gap-2">
              <Volume2 className="h-4 w-4" />
              Language
            </Label>
            <Select value={settings.language} onValueChange={(value) => updateLanguage(value as Language)}>
              <SelectTrigger id="language">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Font Size */}
          <div className="space-y-2">
            <Label htmlFor="font-size" className="flex items-center gap-2">
              <Type className="h-4 w-4" />
              Font Size: {settings.fontSize}px
            </Label>
            <Slider
              id="font-size"
              min={14}
              max={24}
              step={1}
              value={[settings.fontSize]}
              onValueChange={(value) => updateFontSize(value[0])}
            />
          </div>

          {/* Screen Reader Mode */}
          <div className="flex items-center justify-between">
            <Label htmlFor="screen-reader" className="flex items-center gap-2">
              <Volume2 className="h-4 w-4" />
              Screen Reader Optimized
            </Label>
            <Switch
              id="screen-reader"
              checked={settings.screenReaderMode}
              onCheckedChange={toggleScreenReaderMode}
            />
          </div>

          {/* Reduced Motion */}
          <div className="flex items-center justify-between">
            <Label htmlFor="reduced-motion" className="flex items-center gap-2">
              Reduce Motion
            </Label>
            <Switch
              id="reduced-motion"
              checked={settings.reducedMotion}
              onCheckedChange={toggleReducedMotion}
            />
          </div>

          {/* Emotion Color Theme */}
          <div className="flex items-center justify-between">
            <Label htmlFor="emotion-colors" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Emotion Color Coding
            </Label>
            <Switch
              id="emotion-colors"
              checked={settings.emotionColorTheme}
              onCheckedChange={toggleEmotionColorTheme}
            />
          </div>

          <Separator />

          {/* Voice Reader Section */}
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Volume2 className="h-4 w-4" />
              Voice Reader
            </h3>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="voice-reader" className="flex items-center gap-2">
                Enable Voice Reader
              </Label>
              <Switch
                id="voice-reader"
                checked={settings.voiceReaderEnabled}
                onCheckedChange={toggleVoiceReader}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="voice-language">Voice Language</Label>
              <Select
                value={settings.voiceLanguage}
                onValueChange={(value) => updateVoiceLanguage(value as VoiceLanguage)}
              >
                <SelectTrigger id="voice-language">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en-US">English (US)</SelectItem>
                  <SelectItem value="es-ES">Spanish</SelectItem>
                  <SelectItem value="fr-FR">French</SelectItem>
                  <SelectItem value="de-DE">German</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Reset Button */}
          <Button onClick={resetSettings} variant="outline" className="w-full gap-2">
            <RotateCcw className="h-4 w-4" />
            Reset to Defaults
          </Button>

          {/* Info Card */}
          <Card className="p-4 bg-primary/10 border-primary/20">
            <p className="text-sm text-foreground">
              These settings are saved automatically and will persist across sessions. All content adapts dynamically to your preferences.
            </p>
          </Card>
        </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
