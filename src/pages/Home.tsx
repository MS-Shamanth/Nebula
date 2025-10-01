import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArticleCard } from "@/components/ArticleCard";
import { KarmaLeaderboard } from "@/components/KarmaLeaderboard";
import { ImpactMap } from "@/components/ImpactMap";
import { SentimentFilter } from "@/components/SentimentFilter";
import { Article, SentimentType, Contributor } from "@/types/article";
import { Sparkles, BookOpen, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchArticles, StoryblokArticle } from "@/lib/storyblok-client";

const topContributors: Contributor[] = [
  {
    id: "1",
    name: "Dr. Maya Patel",
    karma: 2456,
    contributions: 87,
    expertiseAreas: ["Education", "AI"]
  },
  {
    id: "2",
    name: "Prof. David Kim",
    karma: 2103,
    contributions: 64,
    expertiseAreas: ["Security"]
  },
  {
    id: "3",
    name: "Sophie Martinez",
    karma: 1876,
    contributions: 92,
    expertiseAreas: ["AR", "UX"]
  },
  {
    id: "4",
    name: "Alex Chen",
    karma: 1654,
    contributions: 56,
    expertiseAreas: ["Data Science"]
  },
  {
    id: "5",
    name: "Dr. Sarah Johnson",
    karma: 1432,
    contributions: 71,
    expertiseAreas: ["Psychology"]
  }
];

const Home = () => {
  const [selectedSentiments, setSelectedSentiments] = useState<SentimentType[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticles = async () => {
      setLoading(true);
      const storyblokArticles = await fetchArticles();
      
      // Transform and take first 3 articles
      const transformedArticles: Article[] = storyblokArticles.slice(0, 3).map((story: StoryblokArticle) => ({
        id: story.slug,
        title: story.content.headline || story.content.title || 'Untitled',
        content: typeof story.content.text === 'string' ? story.content.text : JSON.stringify(story.content.text || story.content.body || ''),
        excerpt: story.content.excerpt || story.content.description || '',
        author: story.content.author || 'Anonymous',
        publishedAt: new Date(story.published_at || story.created_at),
        updatedAt: new Date(story.created_at),
        sentiment: (story.content.sentiment || 'inspiring') as SentimentType,
        tags: story.content.tags ? story.content.tags.split(',').map(t => t.trim()) : [],
        readTime: story.content.read_time || 5,
        views: Math.floor(Math.random() * 5000),
        karma: Math.floor(Math.random() * 200),
        imageUrl: story.content.image?.filename,
      }));

      setArticles(transformedArticles);
      setLoading(false);
    };

    loadArticles();
  }, []);

  const impactStats = {
    totalArticles: 1247,
    totalContributors: 892,
    totalKarma: 45678,
    totalViews: 234567
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8 md:py-12 space-y-12 md:space-y-16">
        <section className="text-center space-y-6 py-8 md:py-16">
          <h1 className="text-4xl md:text-7xl font-bold text-foreground">
            Learn, Create, <span className="bg-gradient-accent bg-clip-text text-transparent">Collaborate</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            A revolutionary platform where knowledge is created collaboratively, verified by the community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Link to="/browse">
              <Button size="lg" className="gap-2 w-full sm:w-auto">
                <BookOpen className="w-5 h-5" />
                Browse Articles
              </Button>
            </Link>
            <Link to="/collaborate">
              <Button size="lg" variant="secondary" className="gap-2 w-full sm:w-auto">
                <Users className="w-5 h-5" />
                Start Collaborating
              </Button>
            </Link>
          </div>
        </section>

        <ImpactMap stats={impactStats} />

        <section className="bg-card rounded-xl p-6 md:p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Discover by Sentiment</h2>
          <SentimentFilter 
            selectedSentiments={selectedSentiments} 
            onToggle={(s) => setSelectedSentiments(prev => 
              prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]
            )} 
          />
        </section>

        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3 text-foreground">
              <Sparkles className="w-6 md:w-8 h-6 md:h-8 text-primary" />
              Featured Articles
            </h2>
            <Link to="/browse">
              <Button variant="outline" className="gap-2">
                Browse All <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading articles...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          )}
        </section>

        <KarmaLeaderboard contributors={topContributors} limit={5} />
      </main>
    </div>
  );
};

export default Home;
