import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { EmotionType } from "@/types/story";
import { PlusCircle, Send } from "lucide-react";
import { toast } from "sonner";
import { EmotionBadge } from "@/components/EmotionBadge";

const Submit = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    emotion: "joy" as EmotionType,
    impact: "",
    tags: "",
    hiddenChapter: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const emotions: EmotionType[] = ['joy', 'pride', 'hope', 'solidarity', 'excitement', 'regret'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission
    setTimeout(() => {
      toast.success("Your story has been submitted! ✨ It will appear on the timeline soon.");
      setFormData({
        title: "",
        description: "",
        date: "",
        emotion: "joy",
        impact: "",
        tags: "",
        hiddenChapter: "",
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Header */}
          <section className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30">
              <PlusCircle className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Share Your Impact</span>
            </div>
            
            <h1 className="text-5xl font-bold bg-gradient-aurora bg-clip-text text-transparent">
              Tell Your Story
            </h1>
            
            <p className="text-xl text-muted-foreground">
              Every moment matters. Share your journey and inspire others to create their own impact.
            </p>
          </section>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6 p-8 rounded-2xl bg-card border border-primary/20">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-foreground">
                Story Title *
              </Label>
              <Input
                id="title"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="What moment changed everything?"
                className="bg-background border-primary/30"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-foreground">
                Description *
              </Label>
              <Textarea
                id="description"
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Tell us what happened, who was involved, and why it matters..."
                className="bg-background border-primary/30 min-h-32"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="date" className="text-foreground">
                  Date *
                </Label>
                <Input
                  id="date"
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="bg-background border-primary/30"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="impact" className="text-foreground">
                  Measurable Impact
                </Label>
                <Input
                  id="impact"
                  value={formData.impact}
                  onChange={(e) => setFormData({ ...formData, impact: e.target.value })}
                  placeholder="e.g., 100 people helped, $5000 raised"
                  className="bg-background border-primary/30"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-foreground">
                Emotion *
              </Label>
              <div className="flex flex-wrap gap-2">
                {emotions.map((emotion) => (
                  <button
                    key={emotion}
                    type="button"
                    onClick={() => setFormData({ ...formData, emotion })}
                    className={`transition-all ${
                      formData.emotion === emotion ? 'scale-110 glow-primary' : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <EmotionBadge emotion={emotion} />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags" className="text-foreground">
                Tags
              </Label>
              <Input
                id="tags"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="community, tech, education (comma-separated)"
                className="bg-background border-primary/30"
              />
              <p className="text-xs text-muted-foreground">
                Separate tags with commas to help others discover your story
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="hidden" className="text-foreground flex items-center gap-2">
                🔓 Hidden Chapter <span className="text-xs text-muted-foreground">(Optional)</span>
              </Label>
              <Textarea
                id="hidden"
                value={formData.hiddenChapter}
                onChange={(e) => setFormData({ ...formData, hiddenChapter: e.target.value })}
                placeholder="Add a secret continuation that readers can unlock..."
                className="bg-background border-primary/30 min-h-24"
              />
              <p className="text-xs text-muted-foreground">
                This content will be hidden until readers engage with your story
              </p>
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="w-full gap-2 glow-hover"
            >
              <Send className="w-4 h-4" />
              {isSubmitting ? "Submitting..." : "Share Your Story"}
            </Button>
          </form>

          {/* Tips */}
          <div className="p-6 rounded-lg bg-secondary/30 border border-primary/10">
            <h3 className="font-semibold text-foreground mb-3">Tips for a Great Story</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Be specific about your impact - numbers tell powerful stories</li>
              <li>• Choose emotions that authentically reflect your experience</li>
              <li>• Add relevant tags to help others find inspiration in your journey</li>
              <li>• Consider what lessons or insights others might gain</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Submit;
