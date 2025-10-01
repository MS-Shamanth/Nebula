import { SentimentType } from "@/types/article";

interface SentimentBadgeProps {
  sentiment: SentimentType;
  size?: 'sm' | 'md' | 'lg';
}

const sentimentLabels: Record<SentimentType, string> = {
  joyful: '😊 Joyful',
  curious: '🔍 Curious',
  urgent: '⚡ Urgent',
  calm: '🧘 Calm',
  inspiring: '✨ Inspiring',
  analytical: '📊 Analytical',
};

export const SentimentBadge = ({ sentiment, size = 'md' }: SentimentBadgeProps) => {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-2',
  };

  return (
    <span
      className={`sentiment-badge sentiment-${sentiment} ${sizeClasses[size]} inline-flex items-center gap-1`}
      role="status"
      aria-label={`Sentiment: ${sentimentLabels[sentiment]}`}
    >
      {sentimentLabels[sentiment]}
    </span>
  );
};
