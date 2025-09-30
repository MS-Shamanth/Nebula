import { useState, useEffect } from "react";
import { EventCard } from "@/components/EventCard";
import { EmotionFilter } from "@/components/EmotionFilter";
import { SearchBar } from "@/components/SearchBar";
import { Story, EmotionType } from "@/types/story";
import { Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const Timeline = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [selectedEmotions, setSelectedEmotions] = useState<EmotionType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<'date' | 'inspiration'>('date');

  useEffect(() => {
    // Sample stories with different dates
    const sampleStories: Story[] = [
      {
        id: "1",
        title: "Launched our community garden",
        description: "After months of planning, we transformed an empty lot into a thriving community space.",
        date: new Date(2024, 8, 15),
        emotion: "pride",
        impact: "Fed 50+ families",
        tags: ["community", "sustainability"],
        inspirationCount: 127,
      },
      {
        id: "2",
        title: "First app reached 10,000 users",
        description: "Our mental health support app crossed 10k active users today.",
        date: new Date(2024, 10, 2),
        emotion: "excitement",
        impact: "10,000+ users",
        tags: ["tech", "mental health"],
        inspirationCount: 234,
      },
      {
        id: "3",
        title: "Ocean cleanup initiative",
        description: "Our team organized a coastal cleanup that removed 2 tons of plastic.",
        date: new Date(2024, 6, 20),
        emotion: "hope",
        impact: "2 tons removed",
        tags: ["environment", "ocean"],
        inspirationCount: 189,
      },
      {
        id: "4",
        title: "Started teaching coding to kids",
        description: "Free weekend coding classes for underprivileged children in our neighborhood.",
        date: new Date(2024, 2, 5),
        emotion: "joy",
        impact: "30+ kids learning",
        tags: ["education", "tech"],
        inspirationCount: 156,
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
    ];

    setStories(sampleStories);
  }, []);

  const handleEmotionToggle = (emotion: EmotionType) => {
    setSelectedEmotions((prev) =>
      prev.includes(emotion)
        ? prev.filter((e) => e !== emotion)
        : [...prev, emotion]
    );
  };

  const filteredAndSortedStories = stories
    .filter((story) => {
      const matchesEmotion = selectedEmotions.length === 0 || selectedEmotions.includes(story.emotion);
      const matchesSearch = searchQuery === "" || 
        story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesEmotion && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return b.date.getTime() - a.date.getTime();
      }
      return b.inspirationCount - a.inspirationCount;
    });

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-12 space-y-12">
        {/* Header */}
        <section className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30">
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Interactive Timeline</span>
          </div>
          
          <h1 className="text-5xl font-bold bg-gradient-aurora bg-clip-text text-transparent">
            Journey Through Time
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore stories chronologically and witness the evolution of impact moments.
          </p>
        </section>

        {/* Controls */}
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex gap-2">
              <Button
                variant={sortBy === 'date' ? 'default' : 'outline'}
                onClick={() => setSortBy('date')}
                className="gap-2"
              >
                <Calendar className="w-4 h-4" />
                By Date
              </Button>
              <Button
                variant={sortBy === 'inspiration' ? 'default' : 'outline'}
                onClick={() => setSortBy('inspiration')}
                className="gap-2"
              >
                <Clock className="w-4 h-4" />
                Most Inspiring
              </Button>
            </div>
          </div>

          <SearchBar onSearch={setSearchQuery} />
          <EmotionFilter selectedEmotions={selectedEmotions} onToggle={handleEmotionToggle} />
        </section>

        {/* Timeline */}
        <section className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-nebula hidden md:block"></div>

          <div className="space-y-12 md:pl-24">
            {filteredAndSortedStories.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                No stories match your filters. Try adjusting your search!
              </div>
            ) : (
              filteredAndSortedStories.map((story, index) => (
                <div key={story.id} className="relative">
                  {/* Timeline dot */}
                  <div className="absolute -left-16 top-8 w-8 h-8 rounded-full bg-gradient-nebula glow-primary hidden md:block"></div>
                  
                  <div className="max-w-3xl">
                    <EventCard story={story} />
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Timeline;
