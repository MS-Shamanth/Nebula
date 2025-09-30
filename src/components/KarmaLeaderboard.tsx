import { Contributor } from "@/types/article";
import { Card } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Trophy, Award, Medal } from "lucide-react";
import { Badge } from "./ui/badge";

interface KarmaLeaderboardProps {
  contributors: Contributor[];
  limit?: number;
}

export const KarmaLeaderboard = ({ contributors, limit = 10 }: KarmaLeaderboardProps) => {
  const topContributors = contributors
    .sort((a, b) => b.karma - a.karma)
    .slice(0, limit);

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0: return <Trophy className="w-5 h-5 text-sentiment-joyful" />;
      case 1: return <Award className="w-5 h-5 text-muted-foreground" />;
      case 2: return <Medal className="w-5 h-5 text-sentiment-urgent" />;
      default: return null;
    }
  };

  return (
    <Card className="p-6 bg-gradient-card">
      <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
        <Trophy className="w-6 h-6 text-primary" />
        Karma Leaderboard
      </h3>

      <div className="space-y-4">
        {topContributors.map((contributor, index) => (
          <div
            key={contributor.id}
            className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
          >
            <div className="flex-shrink-0 w-8 text-center">
              {getRankIcon(index) || (
                <span className="text-sm font-semibold text-muted-foreground">
                  #{index + 1}
                </span>
              )}
            </div>

            <Avatar className="w-10 h-10">
              <AvatarImage src={contributor.avatar} alt={contributor.name} />
              <AvatarFallback>{contributor.name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground truncate">
                {contributor.name}
              </p>
              <div className="flex flex-wrap gap-1 mt-1">
                {contributor.expertiseAreas.slice(0, 2).map((area) => (
                  <Badge key={area} variant="secondary" className="text-xs">
                    {area}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="text-right">
              <p className="text-lg font-bold text-primary">{contributor.karma}</p>
              <p className="text-xs text-muted-foreground">{contributor.contributions} contributions</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
