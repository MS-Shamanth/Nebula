import { EmotionType } from "@/types/story";
import { Button } from "./ui/button";
import { EmotionBadge } from "./EmotionBadge";

interface EmotionFilterProps {
  selectedEmotions: EmotionType[];
  onToggle: (emotion: EmotionType) => void;
}

const allEmotions: EmotionType[] = ['joy', 'pride', 'hope', 'solidarity', 'excitement', 'regret'];

export const EmotionFilter = ({ selectedEmotions, onToggle }: EmotionFilterProps) => {
  return (
    <div className="space-y-3" role="group" aria-label="Filter by emotion">
      <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
        Filter by Emotion
      </h3>
      <div className="flex flex-wrap gap-2">
        {allEmotions.map((emotion) => {
          const isSelected = selectedEmotions.includes(emotion);
          return (
            <Button
              key={emotion}
              variant={isSelected ? "default" : "outline"}
              size="sm"
              onClick={() => onToggle(emotion)}
              className={`transition-all ${
                isSelected ? 'glow-primary scale-105' : 'hover:scale-105'
              }`}
              aria-pressed={isSelected}
            >
              <EmotionBadge emotion={emotion} size="sm" />
            </Button>
          );
        })}
      </div>
    </div>
  );
};
