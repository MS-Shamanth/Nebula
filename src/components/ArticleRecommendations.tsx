import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Article } from '@/types/article';
import { Clock, TrendingUp } from 'lucide-react';

interface ArticleRecommendationsProps {
  currentArticleId: string;
  articles: Article[];
}

export const ArticleRecommendations = ({ currentArticleId, articles }: ArticleRecommendationsProps) => {
  const recommendations = articles
    .filter(a => a.id !== currentArticleId)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  if (recommendations.length === 0) return null;

  return (
    <div className="mt-12 pt-8 border-t">
      <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recommendations.map((article) => (
          <Link key={article.id} to={`/article/${article.id}`}>
            <Card className="p-4 hover:shadow-lg transition-all duration-300 hover-scale h-full">
              {article.imageUrl && (
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
              )}
              <Badge variant="outline" className="mb-2">{article.sentiment}</Badge>
              <h3 className="font-semibold mb-2 line-clamp-2">{article.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                {article.excerpt}
              </p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {article.readTime} min
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {article.karma}
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};
