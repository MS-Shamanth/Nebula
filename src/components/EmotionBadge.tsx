import { EmotionType } from "@/types/story";

interface EmotionBadgeProps {
  emotion: EmotionType;
  size?: 'sm' | 'md' | 'lg';
}

const emotionLabels: Record<EmotionType, string> = {
  joy: '✨ Joy',
  pride: '🏆 Pride',
  hope: '🌅 Hope',
  solidarity: '🤝 Solidarity',
  excitement: '🎉 Excitement',
  regret: '💭 Regret',
};

export const EmotionBadge = ({ emotion, size = 'md' }: EmotionBadgeProps) => {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-2',
  };

  return (
    <span
      className={`emotion-badge emotion-${emotion} ${sizeClasses[size]} inline-flex items-center gap-1`}
      role="status"
      aria-label={`Emotion: ${emotionLabels[emotion]}`}
    >
      {emotionLabels[emotion]}
    </span>
  );
};
