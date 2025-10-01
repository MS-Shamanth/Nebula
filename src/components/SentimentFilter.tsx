import { SentimentType } from "@/types/article";
import { Button } from "./ui/button";
import { SentimentBadge } from "./SentimentBadge";
interface SentimentFilterProps {
  selectedSentiments: SentimentType[];
  onToggle: (sentiment: SentimentType) => void;
}
const allSentiments: SentimentType[] = ['joyful', 'curious', 'urgent', 'calm', 'inspiring', 'analytical'];
export const SentimentFilter = ({
  selectedSentiments,
  onToggle
}: SentimentFilterProps) => {
  return <div className="space-y-3" role="group" aria-label="Filter by sentiment">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-950">
        Filter by Sentiment
      </h3>
      <div className="flex flex-wrap gap-2">
        {allSentiments.map(sentiment => {
        const isSelected = selectedSentiments.includes(sentiment);
        return <Button key={sentiment} variant={isSelected ? "default" : "outline"} size="sm" onClick={() => onToggle(sentiment)} className={`transition-all ${isSelected ? 'shadow-md scale-105' : 'hover:scale-105'}`} aria-pressed={isSelected}>
              <SentimentBadge sentiment={sentiment} size="sm" />
            </Button>;
      })}
      </div>
    </div>;
};