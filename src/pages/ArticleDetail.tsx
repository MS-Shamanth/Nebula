import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchArticleBySlug, StoryblokArticle } from "@/lib/storyblok-client";
import { SentimentBadge } from "@/components/SentimentBadge";
import { RichTextRenderer } from "@/components/RichTextRenderer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, ArrowLeft, Calendar, User, Volume2, VolumeX, Share2, Bookmark } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { useAccessibility } from "@/contexts/AccessibilityContext";

const ArticleDetail = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState<StoryblokArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const { settings, readText, stopReading } = useAccessibility();

  useEffect(() => {
    const loadArticle = async () => {
      if (!slug) return;
      
      try {
        setLoading(true);
        const data = await fetchArticleBySlug(slug);
        setArticle(data);
      } catch (error) {
        console.error('Error fetching article:', error);
        toast.error('Failed to load article');
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [slug]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (!isLiked) {
      toast.success('Added to your favorites!');
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  const handleReadArticle = () => {
    if (!settings.voiceReaderEnabled) {
      toast.error('Please enable voice reader in accessibility settings');
      return;
    }

    if (isReading) {
      stopReading();
      setIsReading(false);
    } else {
      const textContent = [
        article?.content?.headline || article?.content?.title,
        article?.content?.excerpt || article?.content?.description,
        typeof article?.content?.text === 'string' ? article.content.text : ''
      ].filter(Boolean).join('. ');
      
      readText(textContent);
      setIsReading(true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="p-8 text-center max-w-md">
          <h2 className="text-2xl font-bold mb-4">Article Not Found</h2>
          <p className="text-muted-foreground mb-6">The article you're looking for doesn't exist.</p>
          <Link to="/browse">
            <Button className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Browse
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  const title = article.content.headline || article.content.title || 'Untitled';
  const content = article.content.text || article.content.body || article.content.content;
  const excerpt = article.content.excerpt || article.content.description;
  const imageUrl = article.content.image?.filename;
  const author = article.content.author || 'Anonymous';
  const publishedDate = article.published_at ? new Date(article.published_at) : new Date(article.created_at);
  const sentiment = article.content.sentiment || 'inspiring';
  const categories = article.content.categories || [];
  const tags = article.content.tags ? article.content.tags.split(',').map(t => t.trim()) : [];

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8 md:py-12">
        <Link to="/browse">
          <Button variant="ghost" className="mb-6 gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Browse
          </Button>
        </Link>

        <article className="max-w-4xl mx-auto">
          {imageUrl && (
            <div className="w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-8">
              <img
                src={imageUrl}
                alt={article.content.image?.alt || title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="space-y-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <SentimentBadge sentiment={sentiment as any} />
                {categories.length > 0 && categories.map((cat: any, i: number) => (
                  <Badge key={i} variant="outline">{cat.name || cat}</Badge>
                ))}
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-foreground leading-tight">
                {title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{format(publishedDate, 'MMMM d, yyyy')}</span>
                </div>
                {article.content.read_time && (
                  <span>{article.content.read_time} min read</span>
                )}
              </div>
            </div>

            {excerpt && (
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed border-l-4 border-primary pl-4">
                {excerpt}
              </p>
            )}

            <div className="prose prose-lg dark:prose-invert max-w-none py-6">
              {content ? (
                typeof content === 'string' ? (
                  <div className="whitespace-pre-wrap text-foreground/90 leading-relaxed">
                    {content}
                  </div>
                ) : (
                  <RichTextRenderer content={content} />
                )
              ) : (
                <p className="text-muted-foreground">No content available for this article.</p>
              )}
            </div>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-6 border-t">
                {tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">{tag}</Badge>
                ))}
              </div>
            )}

            {article.content.call_to_action && article.content.call_to_action.length > 0 && (
              <Card className="p-6 bg-primary/10 border-primary/20">
                <h3 className="text-lg font-semibold mb-3">Next Steps</h3>
                <div className="space-y-2">
                  {article.content.call_to_action.map((cta: any, i: number) => (
                    <div key={i} className="text-foreground/80">
                      {cta.text || cta}
                    </div>
                  ))}
                </div>
              </Card>
            )}

            <div className="flex flex-wrap items-center gap-3 pt-6 border-t">
              <Button
                variant={isLiked ? "default" : "outline"}
                onClick={handleLike}
                className="gap-2"
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                <span>{isLiked ? 'Liked' : 'Like'}</span>
              </Button>
              
              <Button
                variant="outline"
                onClick={handleShare}
                className="gap-2"
              >
                <Share2 className="w-4 h-4" />
                Share
              </Button>
              
              <Button
                variant="outline"
                onClick={() => setIsBookmarked(!isBookmarked)}
                className="gap-2"
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                {isBookmarked ? 'Saved' : 'Save'}
              </Button>
              
              <Button
                variant="outline"
                onClick={handleReadArticle}
                className="gap-2"
              >
                {isReading ? (
                  <>
                    <VolumeX className="w-4 h-4" />
                    Stop
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4" />
                    Read Aloud
                  </>
                )}
              </Button>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
};

export default ArticleDetail;
