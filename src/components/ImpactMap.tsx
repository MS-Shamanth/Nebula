import { Card } from "./ui/card";
import { TrendingUp, Users, BookOpen, Sparkles } from "lucide-react";

interface ImpactMapProps {
  stats: {
    totalArticles: number;
    totalContributors: number;
    totalKarma: number;
    totalViews: number;
  };
}

export const ImpactMap = ({ stats }: ImpactMapProps) => {
  const impactMetrics = [
    {
      icon: BookOpen,
      label: "Articles",
      value: stats.totalArticles,
      color: "text-sentiment-curious",
      bg: "bg-sentiment-curious/10",
    },
    {
      icon: Users,
      label: "Contributors",
      value: stats.totalContributors,
      color: "text-sentiment-inspiring",
      bg: "bg-sentiment-inspiring/10",
    },
    {
      icon: Sparkles,
      label: "Total Karma",
      value: stats.totalKarma,
      color: "text-sentiment-joyful",
      bg: "bg-sentiment-joyful/10",
    },
    {
      icon: TrendingUp,
      label: "Total Views",
      value: stats.totalViews.toLocaleString(),
      color: "text-sentiment-urgent",
      bg: "bg-sentiment-urgent/10",
    },
  ];

  return (
    <Card className="p-6 bg-gradient-card">
      <h3 className="text-xl font-bold text-foreground mb-6">
        Community Impact
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {impactMetrics.map((metric) => (
          <div
            key={metric.label}
            className={`${metric.bg} rounded-lg p-4 text-center transition-transform hover:scale-105`}
          >
            <metric.icon className={`w-8 h-8 ${metric.color} mx-auto mb-2`} />
            <p className={`text-2xl font-bold ${metric.color}`}>
              {metric.value}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {metric.label}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
};
