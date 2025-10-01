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
export const ImpactMap = ({
  stats
}: ImpactMapProps) => {
  const impactMetrics = [{
    icon: BookOpen,
    label: "Articles",
    value: stats.totalArticles,
    color: "text-sentiment-curious",
    bg: "bg-sentiment-curious/10"
  }, {
    icon: Users,
    label: "Contributors",
    value: stats.totalContributors,
    color: "text-sentiment-inspiring",
    bg: "bg-sentiment-inspiring/10"
  }, {
    icon: Sparkles,
    label: "Total Karma",
    value: stats.totalKarma,
    color: "text-sentiment-joyful",
    bg: "bg-sentiment-joyful/10"
  }, {
    icon: TrendingUp,
    label: "Total Views",
    value: stats.totalViews.toLocaleString(),
    color: "text-sentiment-urgent",
    bg: "bg-sentiment-urgent/10"
  }];
  return;
};