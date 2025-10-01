import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArticleCard } from "@/components/ArticleCard";
import { SentimentFilter } from "@/components/SentimentFilter";
import { SearchBar } from "@/components/SearchBar";
import { Article, SentimentType } from "@/types/article";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import { fetchArticles, StoryblokArticle } from "@/lib/storyblok-client";

const Browse = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [selectedSentiments, setSelectedSentiments] = useState<SentimentType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"recent" | "karma" | "views">("recent");
  const [showFilters, setShowFilters] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticles = async () => {
      setLoading(true);
      const storyblokArticles = await fetchArticles();
      
      // Transform Storyblok articles to Article type
      const transformedArticles: Article[] = storyblokArticles.map((story: StoryblokArticle) => ({
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

  useEffect(() => {
    let filtered = [...articles];

    // Filter by sentiments
    if (selectedSentiments.length > 0) {
      filtered = filtered.filter(article => selectedSentiments.includes(article.sentiment));
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(query) || 
        article.excerpt.toLowerCase().includes(query) || 
        article.tags.some(tag => tag.toLowerCase().includes(query)) || 
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
    setSelectedSentiments(prev => 
      prev.includes(sentiment) ? prev.filter(s => s !== sentiment) : [...prev, sentiment]
    );
  };

  const handleKarma = (id: string) => {
    setArticles(prev => prev.map(article => 
      article.id === id ? { ...article, karma: article.karma + 1 } : article
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8 md:py-12 space-y-8">
        {/* Header */}
        <section className="text-center space-y-4">
          <h1 className="text-3xl md:text-5xl font-bold text-foreground">
            Browse Knowledge
          </h1>
          <p className="text-base md:text-lg max-w-2xl mx-auto text-muted-foreground">
            Discover verified articles, guides, and tutorials curated by the community.
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
                <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
                  Sort By
                </h3>
                <div className="flex flex-col gap-2">
                  {[
                    { value: "recent", label: "Most Recent" },
                    { value: "karma", label: "Highest Karma" },
                    { value: "views", label: "Most Viewed" }
                  ].map(option => (
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
            {loading ? (
              <div className="text-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading articles...</p>
              </div>
            ) : (
              <>
                <div className="mb-4 text-sm text-muted-foreground">
                  Showing {filteredArticles.length} {filteredArticles.length === 1 ? "article" : "articles"}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredArticles.map(article => (
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
                
                {filteredArticles.length > 0 && (
                  <div className="mt-12 text-center">
                    <Button size="lg" onClick={() => window.location.href = '/submit'}>
                      Share Your Story
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Browse;
