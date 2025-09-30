import { useState, useEffect } from "react";
import { EventCard } from "@/components/EventCard";
import { Story, EmotionType } from "@/types/story";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Heart, Plus, List, Share2, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Playlist {
  id: string;
  name: string;
  description: string;
  storyIds: string[];
  createdAt: Date;
}

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
];

const Playlists = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [selectedStories, setSelectedStories] = useState<string[]>([]);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [newPlaylistDesc, setNewPlaylistDesc] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    // Load playlists from localStorage
    const saved = localStorage.getItem("playlists");
    if (saved) {
      const parsed = JSON.parse(saved);
      setPlaylists(parsed.map((p: any) => ({
        ...p,
        createdAt: new Date(p.createdAt)
      })));
    }
  }, []);

  const savePlaylists = (updatedPlaylists: Playlist[]) => {
    localStorage.setItem("playlists", JSON.stringify(updatedPlaylists));
    setPlaylists(updatedPlaylists);
  };

  const handleToggleStory = (storyId: string) => {
    setSelectedStories(prev =>
      prev.includes(storyId)
        ? prev.filter(id => id !== storyId)
        : [...prev, storyId]
    );
  };

  const handleCreatePlaylist = () => {
    if (!newPlaylistName.trim()) {
      toast.error("Please enter a playlist name");
      return;
    }

    if (selectedStories.length === 0) {
      toast.error("Please select at least one story");
      return;
    }

    const newPlaylist: Playlist = {
      id: Date.now().toString(),
      name: newPlaylistName,
      description: newPlaylistDesc,
      storyIds: selectedStories,
      createdAt: new Date(),
    };

    savePlaylists([...playlists, newPlaylist]);
    toast.success(`Playlist "${newPlaylistName}" created!`);
    setNewPlaylistName("");
    setNewPlaylistDesc("");
    setSelectedStories([]);
    setDialogOpen(false);
  };

  const handleDeletePlaylist = (id: string) => {
    savePlaylists(playlists.filter(p => p.id !== id));
    toast.success("Playlist deleted");
  };

  const handleSharePlaylist = (playlist: Playlist) => {
    const shareText = `Check out my playlist "${playlist.name}" with ${playlist.storyIds.length} inspiring stories!`;
    if (navigator.share) {
      navigator.share({ title: playlist.name, text: shareText });
    } else {
      navigator.clipboard.writeText(shareText);
      toast.success("Playlist link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-12 space-y-12">
        <section className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30">
            <List className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Curated Collections</span>
          </div>
          
          <h1 className="text-5xl font-bold bg-gradient-aurora bg-clip-text text-transparent">
            Your Playlists
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create and curate playlists of impactful stories. Mix and match moments that inspire you and share them with the community.
          </p>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="gap-2">
                <Plus className="w-5 h-5" />
                Create New Playlist
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Playlist</DialogTitle>
                <DialogDescription>
                  Give your playlist a name and select the stories you want to include.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="playlist-name">Playlist Name</Label>
                  <Input
                    id="playlist-name"
                    value={newPlaylistName}
                    onChange={(e) => setNewPlaylistName(e.target.value)}
                    placeholder="My Inspiration Collection"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="playlist-desc">Description (Optional)</Label>
                  <Input
                    id="playlist-desc"
                    value={newPlaylistDesc}
                    onChange={(e) => setNewPlaylistDesc(e.target.value)}
                    placeholder="Stories that motivate me to make a difference"
                  />
                </div>

                <div className="space-y-4">
                  <Label>Select Stories ({selectedStories.length} selected)</Label>
                  <div className="grid grid-cols-1 gap-4">
                    {sampleStories.map(story => (
                      <Card
                        key={story.id}
                        className={`p-4 cursor-pointer transition-all ${
                          selectedStories.includes(story.id)
                            ? 'border-primary bg-primary/10'
                            : 'hover:border-primary/50'
                        }`}
                        onClick={() => handleToggleStory(story.id)}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground">{story.title}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                              {story.description}
                            </p>
                          </div>
                          <input
                            type="checkbox"
                            checked={selectedStories.includes(story.id)}
                            onChange={() => handleToggleStory(story.id)}
                            className="mt-1"
                          />
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                <Button onClick={handleCreatePlaylist} className="w-full" size="lg">
                  Create Playlist
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </section>

        {playlists.length === 0 ? (
          <Card className="p-12 text-center">
            <List className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-2xl font-semibold mb-2">No playlists yet</h3>
            <p className="text-muted-foreground mb-6">
              Create your first playlist to start curating your favorite stories
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {playlists.map(playlist => (
              <Card key={playlist.id} className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground">{playlist.name}</h3>
                    {playlist.description && (
                      <p className="text-sm text-muted-foreground mt-1">{playlist.description}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Heart className="w-4 h-4" />
                  <span>{playlist.storyIds.length} stories</span>
                  <span>•</span>
                  <span>{playlist.createdAt.toLocaleDateString()}</span>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 gap-2"
                    onClick={() => handleSharePlaylist(playlist)}
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeletePlaylist(playlist.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Playlists;