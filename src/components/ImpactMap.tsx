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
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {impactMetrics.map((metric, index) => (
        <Card key={index} className={`p-6 hover:scale-105 transition-transform ${metric.bg} border-0`}>
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-full ${metric.bg}`}>
              <metric.icon className={`w-6 h-6 ${metric.color}`} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{metric.label}</p>
              <p className={`text-2xl font-bold ${metric.color}`}>{metric.value}</p>
            </div>
          </div>
        </Card>
      ))}
    </section>
  );
};