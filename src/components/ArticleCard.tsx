import { Article } from "@/types/article";
import { SentimentBadge } from "./SentimentBadge";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Heart, Eye, Clock, Award } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";
interface ArticleCardProps {
  article: Article;
  onKarma?: (id: string) => void;
}
export const ArticleCard = ({
  article,
  onKarma
}: ArticleCardProps) => {
  const [karmaGiven, setKarmaGiven] = useState(false);
  const handleKarma = () => {
    if (!karmaGiven) {
      setKarmaGiven(true);
      onKarma?.(article.id);
    }
  };
  return <Card className="group overflow-hidden bg-gradient-card border-border hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
      <Link to={`/article/${article.id}`} className="block">
        {article.imageUrl && <div className="relative h-48 overflow-hidden">
            <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute top-3 left-3">
              <SentimentBadge sentiment={article.sentiment} />
            </div>
          </div>}
        
        <div className="p-6 space-y-4">
          {!article.imageUrl && <div className="mb-2">
              <SentimentBadge sentiment={article.sentiment} />
            </div>}
          
          <div className="space-y-2">
            <h3 className="text-xl font-bold transition-colors line-clamp-2 text-purple-600">
              {article.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              by {article.author}
            </p>
          </div>

          <p className="line-clamp-3 leading-relaxed text-zinc-950">
            {article.excerpt}
          </p>

          <div className="flex flex-wrap gap-2">
            {article.tags.slice(0, 3).map(tag => <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>)}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{article.readTime} min</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span>{article.views}</span>
              </div>
            </div>

            {article.verifiedHash && <div className="flex items-center gap-1 text-xs text-accent">
                <Award className="w-4 h-4" />
                <span>Verified</span>
              </div>}
          </div>
        </div>
      </Link>

      <div className="px-6 pb-4">
        <Button variant={karmaGiven ? "secondary" : "outline"} size="sm" onClick={handleKarma} className="w-full transition-all" disabled={karmaGiven}>
          <Heart className={`w-4 h-4 ${karmaGiven ? 'fill-current' : ''}`} />
          <span>+{article.karma} Karma</span>
        </Button>
      </div>
    </Card>;
};