import { useState } from "react";
import { ArticleCard } from "@/components/ArticleCard";
import { KarmaLeaderboard } from "@/components/KarmaLeaderboard";
import { ImpactMap } from "@/components/ImpactMap";
import { SentimentFilter } from "@/components/SentimentFilter";
import { Article, SentimentType, Contributor } from "@/types/article";
import { Sparkles, BookOpen, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const featuredArticles: Article[] = [
  {
    id: "1",
    title: "The Art of Collaborative Learning in Digital Spaces",
    content: "Full content...",
    excerpt: "How modern knowledge platforms are transforming education through real-time collaboration and peer verification.",
    author: "Dr. Maya Patel",
    publishedAt: new Date("2025-02-01"),
    updatedAt: new Date("2025-02-01"),
    sentiment: "inspiring",
    tags: ["education", "collaboration", "digital"],
    readTime: 9,
    views: 4532,
    karma: 234,
    verifiedHash: "0xabc123",
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "Building Trust Through Transparent Content Verification",
    content: "Full content...",
    excerpt: "A comprehensive guide to implementing community-driven fact-checking systems.",
    author: "Prof. David Kim",
    publishedAt: new Date("2025-01-28"),
    updatedAt: new Date("2025-01-29"),
    sentiment: "analytical",
    tags: ["verification", "trust", "community"],
    readTime: 12,
    views: 3201,
    karma: 198,
    verifiedHash: "0xdef456",
  },
  {
    id: "3",
    title: "Quick Start: Your First AR Learning Experience",
    content: "Full content...",
    excerpt: "Create immersive augmented reality guides in under 30 minutes.",
    author: "Sophie Martinez",
    publishedAt: new Date("2025-01-30"),
    updatedAt: new Date("2025-01-30"),
    sentiment: "joyful",
    tags: ["AR", "tutorial", "hands-on"],
    readTime: 6,
    views: 5678,
    karma: 312,
    imageUrl: "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=800&auto=format&fit=crop",
  },
];

const topContributors: Contributor[] = [
  { id: "1", name: "Dr. Maya Patel", karma: 2456, contributions: 87, expertiseAreas: ["Education", "AI"] },
  { id: "2", name: "Prof. David Kim", karma: 2103, contributions: 64, expertiseAreas: ["Security"] },
  { id: "3", name: "Sophie Martinez", karma: 1876, contributions: 92, expertiseAreas: ["AR", "UX"] },
  { id: "4", name: "Alex Chen", karma: 1654, contributions: 56, expertiseAreas: ["Data Science"] },
  { id: "5", name: "Dr. Sarah Johnson", karma: 1432, contributions: 71, expertiseAreas: ["Psychology"] },
];

const Home = () => {
  const [selectedSentiments, setSelectedSentiments] = useState<SentimentType[]>([]);
  const [articles] = useState<Article[]>(featuredArticles);

  const impactStats = {
    totalArticles: 1247,
    totalContributors: 892,
    totalKarma: 45678,
    totalViews: 234567,
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <main className="container mx-auto px-4 py-12 space-y-16">
        <section className="text-center space-y-6 py-16">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground">
            Learn, Create, <span className="bg-gradient-accent bg-clip-text text-transparent">Collaborate</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A revolutionary platform where knowledge is created collaboratively, verified by the community.
          </p>
          <div className="flex gap-4 justify-center pt-6">
            <Link to="/browse">
              <Button size="lg" className="gap-2">
                <BookOpen className="w-5 h-5" />
                Browse Articles
              </Button>
            </Link>
            <Link to="/collaborate">
              <Button size="lg" variant="secondary" className="gap-2">
                <Users className="w-5 h-5" />
                Start Collaborating
              </Button>
            </Link>
          </div>
        </section>

        <ImpactMap stats={impactStats} />

        <section className="bg-card rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Discover by Sentiment</h2>
          <SentimentFilter selectedSentiments={selectedSentiments} onToggle={(s) => setSelectedSentiments(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])} />
        </section>

        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-primary" />
              Featured Articles
            </h2>
            <Link to="/browse"><Button variant="outline" className="gap-2">Browse All <ArrowRight className="w-4 h-4" /></Button></Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => <ArticleCard key={article.id} article={article} />)}
          </div>
        </section>

        <KarmaLeaderboard contributors={topContributors} limit={5} />
      </main>
    </div>
  );
};

export default Home;
