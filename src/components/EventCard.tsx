import { Story } from "@/types/story";
import { EmotionBadge } from "./EmotionBadge";
import { format } from "date-fns";
import { Heart, Tag, TrendingUp } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { useState } from "react";
import { useInView } from "react-intersection-observer";

interface EventCardProps {
  story: Story;
  onInspire?: (id: string) => void;
}

export const EventCard = ({ story, onInspire }: EventCardProps) => {
  const [isInspired, setIsInspired] = useState(false);
  const [showHidden, setShowHidden] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleInspire = () => {
    setIsInspired(!isInspired);
    if (onInspire && !isInspired) {
      onInspire(story.id);
    }
  };

  return (
    <Card
      ref={ref}
      className={`timeline-card overflow-hidden bg-card border-primary/20 ${
        inView ? 'animate-bloom' : 'opacity-0'
      }`}
    >
      {story.imageUrl && (
        <div className="w-full h-48 overflow-hidden">
          <img
            src={story.imageUrl}
            alt={story.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>
      )}
      
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-foreground mb-2">
              {story.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {format(story.date, 'MMMM d, yyyy')}
            </p>
          </div>
          <EmotionBadge emotion={story.emotion} />
        </div>

        <p className="text-foreground/90 leading-relaxed">
          {story.description}
        </p>

        {story.impact && (
          <div className="flex items-center gap-2 text-primary">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">Impact: {story.impact}</span>
          </div>
        )}

        {story.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {story.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-secondary/50 text-xs text-foreground"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>
        )}

        {story.hidden && (
          <div className="pt-4 border-t border-border">
            {!showHidden ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowHidden(true)}
                className="w-full glow-hover"
              >
                🔓 Unlock Hidden Chapter
              </Button>
            ) : (
              <div className="p-4 rounded-lg bg-secondary/30 text-sm italic text-foreground/80 animate-fade-in">
                {story.hidden}
              </div>
            )}
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleInspire}
            className={`gap-2 transition-colors ${
              isInspired ? 'text-emotion-excitement' : 'text-muted-foreground'
            }`}
            aria-label="Mark as inspiring"
          >
            <Heart className={`w-4 h-4 ${isInspired ? 'fill-current' : ''}`} />
            <span className="font-medium">
              {story.inspirationCount + (isInspired ? 1 : 0)}
            </span>
          </Button>
          <span className="text-xs text-muted-foreground">
            {story.inspirationCount + (isInspired ? 1 : 0)} inspired
          </span>
        </div>
      </div>
    </Card>
  );
};
