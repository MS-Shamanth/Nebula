import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { storyblok } from "@/lib/storyblok";
import { StoryblokStory, Story, EmotionType } from "@/types/story";
import { SentimentBadge } from "@/components/SentimentBadge";
import { EmotionBadge } from "@/components/EmotionBadge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Tag, TrendingUp, ArrowLeft, Lock, Unlock } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const ArticleDetail = () => {
  const { id } = useParams();
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);
  const [isInspired, setIsInspired] = useState(false);
  const [showHidden, setShowHidden] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        setLoading(true);
        const response = await storyblok.get(`cdn/stories/${id}`);
        const storyData: StoryblokStory = response.data.story;
        
        const transformedStory: Story = {
          id: storyData.uuid,
          title: storyData.content.title,
          description: storyData.content.description,
          date: new Date(storyData.content.date),
          emotion: storyData.content.emotion as EmotionType,
          impact: storyData.content.impact,
          tags: storyData.content.tags ? storyData.content.tags.split(',').map(t => t.trim()) : [],
          inspirationCount: 0,
          hidden: storyData.content.hidden_chapter,
          imageUrl: storyData.content.image?.filename,
        };

        setStory(transformedStory);

        // Analyze tone if not already analyzed
        const { data: analysisData, error } = await supabase.functions.invoke('analyze-tone', {
          body: { text: transformedStory.description }
        });

        if (!error && analysisData) {
          setAiAnalysis(analysisData);
        }
      } catch (error) {
        console.error('Error fetching story:', error);
        toast.error('Failed to load article');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchStory();
    }
  }, [id]);

  const handleInspire = () => {
    setIsInspired(!isInspired);
    if (!isInspired) {
      toast.success('Added to your inspiration collection!');
    }
  };

  const handleUnlockHidden = () => {
    setShowHidden(true);
    toast.success('Hidden chapter unlocked!');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
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

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-12">
        <Link to="/browse">
          <Button variant="ghost" className="mb-6 gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Browse
          </Button>
        </Link>

        <article className="max-w-4xl mx-auto">
          {story.imageUrl && (
            <div className="w-full h-96 rounded-2xl overflow-hidden mb-8">
              <img
                src={story.imageUrl}
                alt={story.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-foreground mb-4">
                  {story.title}
                </h1>
                <p className="text-muted-foreground">
                  {format(story.date, 'MMMM d, yyyy')}
                </p>
              </div>
              <EmotionBadge emotion={story.emotion} />
            </div>

            {aiAnalysis && (
              <Card className="p-4 bg-primary/10 border-primary/20">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  AI Tone Analysis
                </h3>
                <p className="text-sm text-foreground/80">
                  Detected emotion: <span className="font-medium">{aiAnalysis.emotion}</span>
                </p>
                <p className="text-sm text-foreground/80 mt-1">
                  {aiAnalysis.impact}
                </p>
              </Card>
            )}

            <div className="prose prose-invert max-w-none">
              <p className="text-lg leading-relaxed text-foreground/90">
                {story.description}
              </p>
            </div>

            {story.impact && (
              <Card className="p-4 bg-secondary/30">
                <div className="flex items-center gap-2 text-primary">
                  <TrendingUp className="w-5 h-5" />
                  <span className="font-semibold">Impact: {story.impact}</span>
                </div>
              </Card>
            )}

            {story.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {story.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-secondary/50 text-sm text-foreground"
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {story.hidden && (
              <Card className="p-6 border-primary/20">
                {!showHidden ? (
                  <div className="text-center space-y-4">
                    <Lock className="w-12 h-12 mx-auto text-primary" />
                    <h3 className="text-xl font-semibold">Hidden Chapter Available</h3>
                    <p className="text-muted-foreground">
                      Unlock the rest of the story to discover what happened next
                    </p>
                    <Button onClick={handleUnlockHidden} className="gap-2">
                      <Unlock className="w-4 h-4" />
                      Unlock Hidden Chapter
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4 animate-fade-in">
                    <div className="flex items-center gap-2 text-primary">
                      <Unlock className="w-5 h-5" />
                      <h3 className="text-xl font-semibold">What Happened Next</h3>
                    </div>
                    <p className="text-foreground/80 leading-relaxed italic">
                      {story.hidden}
                    </p>
                  </div>
                )}
              </Card>
            )}

            <div className="flex items-center justify-between pt-6 border-t border-border">
              <Button
                variant={isInspired ? "default" : "outline"}
                onClick={handleInspire}
                className="gap-2"
                size="lg"
              >
                <Heart className={`w-5 h-5 ${isInspired ? 'fill-current' : ''}`} />
                <span>
                  {isInspired ? 'Inspired!' : 'Mark as Inspiring'}
                </span>
              </Button>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
};

export default ArticleDetail;