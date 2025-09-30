import { useState, useEffect } from "react";
import { EventCard } from "@/components/EventCard";
import { Story } from "@/types/story";
import { Heart, Award, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ImpactWall = () => {
  const [curatedStories, setCuratedStories] = useState<Story[]>([]);
  const [selectedStories, setSelectedStories] = useState<string[]>([]);

  useEffect(() => {
    // Load top impactful stories
    const topStories: Story[] = [
      {
        id: "2",
        title: "First app reached 10,000 users",
        description: "Our mental health support app crossed 10k active users today. Started as a weekend project, now it's helping people cope with anxiety and stress daily.",
        date: new Date(2024, 10, 2),
        emotion: "excitement",
        impact: "10,000+ users supported, 4.8★ rating",
        tags: ["tech", "mental health", "milestone"],
        inspirationCount: 234,
      },
      {
        id: "3",
        title: "Ocean cleanup initiative",
        description: "Our team organized a coastal cleanup that removed 2 tons of plastic from local beaches. Volunteers of all ages came together for a cleaner future.",
        date: new Date(2024, 6, 20),
        emotion: "hope",
        impact: "2 tons of plastic removed, 200+ volunteers",
        tags: ["environment", "ocean", "volunteer"],
        inspirationCount: 189,
      },
      {
        id: "5",
        title: "Team won regional hackathon",
        description: "Built an accessibility tool in 48 hours that judges loved.",
        date: new Date(2024, 11, 10),
        emotion: "excitement",
        impact: "$5000 prize won",
        tags: ["tech", "competition"],
        inspirationCount: 201,
      },
      {
        id: "1",
        title: "Launched our community garden",
        description: "After months of planning, we transformed an empty lot into a thriving community space where neighbors grow vegetables together.",
        date: new Date(2024, 8, 15),
        emotion: "pride",
        impact: "Fed 50+ families, reduced food waste by 200kg/month",
        tags: ["community", "sustainability", "food"],
        inspirationCount: 127,
      },
    ];

    setCuratedStories(topStories);
  }, []);

  const handleCuratePlaylist = () => {
    if (selectedStories.length === 0) {
      toast.error("Select at least one story for your playlist!");
      return;
    }
    toast.success(`Created playlist with ${selectedStories.length} stories! 🎉`);
  };

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-12 space-y-12">
        {/* Header */}
        <section className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 glow-primary">
            <Heart className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Community Curated</span>
          </div>
          
          <h1 className="text-5xl font-bold bg-gradient-aurora bg-clip-text text-transparent">
            Impact Wall
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A handpicked collection of the most inspiring moments from our community.
            Create your own playlist of stories that resonate with you.
          </p>

          <div className="flex flex-wrap justify-center gap-6 pt-4">
            <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-card border border-primary/20">
              <Award className="w-5 h-5 text-emotion-pride" />
              <div className="text-left">
                <p className="text-sm text-muted-foreground">Total Impact</p>
                <p className="text-lg font-bold text-foreground">10,000+ Lives</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-card border border-primary/20">
              <Users className="w-5 h-5 text-emotion-solidarity" />
              <div className="text-left">
                <p className="text-sm text-muted-foreground">Stories</p>
                <p className="text-lg font-bold text-foreground">{curatedStories.length}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-card border border-primary/20">
              <Heart className="w-5 h-5 text-emotion-excitement" />
              <div className="text-left">
                <p className="text-sm text-muted-foreground">Total Inspiration</p>
                <p className="text-lg font-bold text-foreground">
                  {curatedStories.reduce((sum, s) => sum + s.inspirationCount, 0)}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Curated Stories Grid */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">
              Most Impactful Stories
            </h2>
            
            {selectedStories.length > 0 && (
              <Button
                onClick={handleCuratePlaylist}
                className="gap-2 glow-hover"
              >
                <Heart className="w-4 h-4" />
                Create Playlist ({selectedStories.length})
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {curatedStories.map((story) => (
              <div key={story.id} className="relative">
                <EventCard story={story} />
              </div>
            ))}
          </div>
        </section>

        {/* Community Stats */}
        <section className="rounded-2xl bg-gradient-nebula p-8 text-center space-y-4">
          <h3 className="text-3xl font-bold text-white">
            Join the Movement
          </h3>
          <p className="text-white/90 max-w-xl mx-auto">
            Every story on this wall has inspired real change. Share yours and become part of the impact.
          </p>
          <Button
            size="lg"
            className="bg-white text-primary hover:bg-white/90 glow-hover"
            onClick={() => window.location.href = '/submit'}
          >
            Share Your Story
          </Button>
        </section>
      </main>
    </div>
  );
};

export default ImpactWall;
