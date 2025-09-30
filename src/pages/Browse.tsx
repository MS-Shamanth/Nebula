import { useState, useEffect } from "react";
import { ArticleCard } from "@/components/ArticleCard";
import { SentimentFilter } from "@/components/SentimentFilter";
import { SearchBar } from "@/components/SearchBar";
import { Article, SentimentType } from "@/types/article";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";

// Sample data for demo
const sampleArticles: Article[] = [
  {
    id: "1",
    title: "The Future of Collaborative Knowledge Sharing",
    content: "Full article content...",
    excerpt: "Exploring how modern platforms are revolutionizing the way we create, share, and verify knowledge in real-time.",
    author: "Dr. Sarah Chen",
    publishedAt: new Date("2025-01-15"),
    updatedAt: new Date("2025-01-15"),
    sentiment: "inspiring",
    tags: ["collaboration", "future", "technology"],
    readTime: 8,
    views: 1245,
    karma: 89,
    verifiedHash: "0x1a2b3c4d",
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "Understanding Blockchain Authenticity in Content",
    content: "Full article content...",
    excerpt: "A deep dive into how blockchain technology can verify and protect the integrity of digital content.",
    author: "Prof. Michael Torres",
    publishedAt: new Date("2025-01-20"),
    updatedAt: new Date("2025-01-22"),
    sentiment: "analytical",
    tags: ["blockchain", "security", "verification"],
    readTime: 12,
    views: 892,
    karma: 67,
    verifiedHash: "0x5e6f7g8h",
  },
  {
    id: "3",
    title: "Quick Guide: Getting Started with AR Content",
    content: "Full article content...",
    excerpt: "Learn the basics of creating augmented reality experiences for educational content in just 15 minutes.",
    author: "Emma Rodriguez",
    publishedAt: new Date("2025-01-25"),
    updatedAt: new Date("2025-01-25"),
    sentiment: "joyful",
    tags: ["AR", "tutorial", "education"],
    readTime: 5,
    views: 2103,
    karma: 134,
    imageUrl: "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=800&auto=format&fit=crop",
  },
  {
    id: "4",
    title: "The Psychology of Community Fact-Checking",
    content: "Full article content...",
    excerpt: "Why crowdsourced verification works better than traditional editorial models, backed by recent studies.",
    author: "Dr. James Liu",
    publishedAt: new Date("2025-01-28"),
    updatedAt: new Date("2025-01-28"),
    sentiment: "curious",
    tags: ["psychology", "fact-checking", "community"],
    readTime: 10,
    views: 1567,
    karma: 98,
    verifiedHash: "0x9i0j1k2l",
  },
  {
    id: "5",
    title: "Critical Update: Security Best Practices for 2025",
    content: "Full article content...",
    excerpt: "Essential security measures every content creator and platform must implement immediately.",
    author: "Alex Kowalski",
    publishedAt: new Date("2025-01-30"),
    updatedAt: new Date("2025-01-30"),
    sentiment: "urgent",
    tags: ["security", "updates", "best-practices"],
    readTime: 6,
    views: 3421,
    karma: 187,
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop",
  },
  {
    id: "6",
    title: "Mindful Content Creation: A Holistic Approach",
    content: "Full article content...",
    excerpt: "Creating meaningful content that respects both creators and consumers through intentional design.",
    author: "Priya Sharma",
    publishedAt: new Date("2025-02-02"),
    updatedAt: new Date("2025-02-02"),
    sentiment: "calm",
    tags: ["mindfulness", "content", "design"],
    readTime: 7,
    views: 876,
    karma: 72,
  },
];

const Browse = () => {
  const [articles, setArticles] = useState<Article[]>(sampleArticles);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>(sampleArticles);
  const [selectedSentiments, setSelectedSentiments] = useState<SentimentType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"recent" | "karma" | "views">("recent");
  const [showFilters, setShowFilters] = useState(true);

  useEffect(() => {
    let filtered = [...articles];

    // Filter by sentiments
    if (selectedSentiments.length > 0) {
      filtered = filtered.filter((article) =>
        selectedSentiments.includes(article.sentiment)
      );
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(query) ||
          article.excerpt.toLowerCase().includes(query) ||
          article.tags.some((tag) => tag.toLowerCase().includes(query)) ||
          article.author.toLowerCase().includes(query)
      );
    }

    // Sort articles
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "karma":
          return b.karma - a.karma;
        case "views":
          return b.views - a.views;
        case "recent":
        default:
          return b.publishedAt.getTime() - a.publishedAt.getTime();
      }
    });

    setFilteredArticles(filtered);
  }, [articles, selectedSentiments, searchQuery, sortBy]);

  const handleSentimentToggle = (sentiment: SentimentType) => {
    setSelectedSentiments((prev) =>
      prev.includes(sentiment)
        ? prev.filter((s) => s !== sentiment)
        : [...prev, sentiment]
    );
  };

  const handleKarma = (id: string) => {
    setArticles((prev) =>
      prev.map((article) =>
        article.id === id ? { ...article, karma: article.karma + 1 } : article
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <main className="container mx-auto px-4 py-12 space-y-8">
        {/* Header */}
        <section className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Browse Knowledge
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover verified articles, guides, and tutorials filtered by sentiment and curated by the community.
          </p>
        </section>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto">
          <SearchBar
            onSearch={setSearchQuery}
            placeholder="Search by title, author, tags, or content..."
          />
        </div>

        {/* Filters & Sort */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 space-y-6">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="w-full lg:hidden"
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              {showFilters ? "Hide" : "Show"} Filters
            </Button>

            <div className={`space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}>
              <SentimentFilter
                selectedSentiments={selectedSentiments}
                onToggle={handleSentimentToggle}
              />

              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                  Sort By
                </h3>
                <div className="flex flex-col gap-2">
                  {[
                    { value: "recent", label: "Most Recent" },
                    { value: "karma", label: "Highest Karma" },
                    { value: "views", label: "Most Viewed" },
                  ].map((option) => (
                    <Button
                      key={option.value}
                      variant={sortBy === option.value ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSortBy(option.value as typeof sortBy)}
                      className="justify-start"
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Articles Grid */}
          <div className="flex-1">
            <div className="mb-4 text-sm text-muted-foreground">
              Showing {filteredArticles.length} {filteredArticles.length === 1 ? "article" : "articles"}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredArticles.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  onKarma={handleKarma}
                />
              ))}
            </div>

            {filteredArticles.length === 0 && (
              <div className="text-center py-16">
                <p className="text-lg text-muted-foreground">
                  No articles found matching your criteria.
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSelectedSentiments([]);
                    setSearchQuery("");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Browse;
