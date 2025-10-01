import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Users, MessageSquare, GitBranch, Clock, CheckCircle, AlertCircle, ThumbsUp, Eye } from "lucide-react";
import { useState } from "react";
const Collaborate = () => {
  const [activeTab, setActiveTab] = useState<"editor" | "versions" | "qa">("editor");
  return <div className="min-h-screen bg-gradient-hero">
      <main className="container mx-auto px-4 py-12 space-y-8">
        {/* Header */}
        <section className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-purple-600">
            Collaborative Workspace
          </h1>
          <p className="text-lg max-w-2xl mx-auto text-zinc-950">
            Create, edit, and verify knowledge together with real-time collaboration, 
            version history, and community feedback.
          </p>
        </section>

        {/* Tab Navigation */}
        <div className="flex justify-center gap-2">
          <Button variant={activeTab === "editor" ? "default" : "outline"} onClick={() => setActiveTab("editor")} className="gap-2">
            <Users className="w-4 h-4" />
            Live Editor
          </Button>
          <Button variant={activeTab === "versions" ? "default" : "outline"} onClick={() => setActiveTab("versions")} className="gap-2">
            <Clock className="w-4 h-4" />
            Version History
          </Button>
          <Button variant={activeTab === "qa" ? "default" : "outline"} onClick={() => setActiveTab("qa")} className="gap-2">
            <MessageSquare className="w-4 h-4" />
            Expert Q&A
          </Button>
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {activeTab === "editor" && <Card className="p-6 bg-card">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Article Title
                    </label>
                    <Input placeholder="Enter your article title..." className="text-lg" />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Content
                    </label>
                    <Textarea placeholder="Start writing your article... (Markdown supported)" className="min-h-[400px] font-mono" />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Tags
                    </label>
                    <Input placeholder="Add tags separated by commas..." />
                  </div>

                  <div className="flex gap-2">
                    <Button className="gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Publish
                    </Button>
                    <Button variant="outline">Save Draft</Button>
                    <Button variant="outline">Preview</Button>
                  </div>
                </div>
              </Card>}

            {activeTab === "versions" && <Card className="p-6 bg-card">
                <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <GitBranch className="w-5 h-5 text-primary" />
                  Version History Timeline
                </h3>

                <div className="space-y-4">
                  {[{
                version: "v3.2",
                editor: "Dr. Maya Patel",
                time: "2 hours ago",
                changes: "Updated section on collaborative learning methodologies",
                status: "current"
              }, {
                version: "v3.1",
                editor: "Sophie Martinez",
                time: "5 hours ago",
                changes: "Added AR visualization examples and mobile compatibility notes",
                status: "verified"
              }, {
                version: "v3.0",
                editor: "Prof. David Kim",
                time: "1 day ago",
                changes: "Major revision: restructured content flow and added fact-checking section",
                status: "verified"
              }, {
                version: "v2.5",
                editor: "Dr. Maya Patel",
                time: "2 days ago",
                changes: "Fixed typos and improved readability",
                status: "verified"
              }].map(version => <div key={version.version} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge variant={version.status === "current" ? "default" : "secondary"}>
                            {version.version}
                          </Badge>
                          {version.status === "current" && <Badge variant="outline" className="bg-primary/10 text-primary">
                              Current
                            </Badge>}
                        </div>
                        <span className="text-xs text-muted-foreground">{version.time}</span>
                      </div>

                      <p className="text-sm text-foreground font-medium mb-1">
                        Edited by {version.editor}
                      </p>
                      <p className="text-sm text-muted-foreground mb-3">
                        {version.changes}
                      </p>

                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                        {version.status !== "current" && <Button size="sm" variant="outline">
                            Restore
                          </Button>}
                      </div>
                    </div>)}
                </div>
              </Card>}

            {activeTab === "qa" && <Card className="p-6 bg-card">
                <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  Expert Q&A Panel
                </h3>

                <div className="space-y-6">
                  {[{
                question: "How does the blockchain verification process work in practice?",
                askedBy: "Alex Thompson",
                answer: "The verification uses a SHA-256 hash of the article content at publish time. This hash is immutably stored and can be checked against the current content to detect any changes.",
                answeredBy: "Prof. David Kim",
                answeredByTitle: "Blockchain Security Expert",
                votes: 23
              }, {
                question: "Can this system scale to millions of concurrent collaborators?",
                askedBy: "Jamie Chen",
                answer: "Yes! The architecture uses WebSocket pools and Redis for state management, allowing horizontal scaling. We've tested with 50K+ concurrent users with sub-100ms latency.",
                answeredBy: "Dr. Maya Patel",
                answeredByTitle: "Distributed Systems Engineer",
                votes: 18
              }].map((qa, index) => <div key={index} className="border-l-4 border-primary pl-4 space-y-3">
                      <div>
                        <p className="font-semibold text-foreground mb-1">
                          Q: {qa.question}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Asked by {qa.askedBy}
                        </p>
                      </div>

                      <div className="bg-muted/30 rounded-lg p-4 space-y-2">
                        <p className="text-foreground">{qa.answer}</p>
                        <div className="flex items-center justify-between">
                          <div className="text-sm">
                            <p className="font-semibold text-primary">{qa.answeredBy}</p>
                            <p className="text-xs text-muted-foreground">{qa.answeredByTitle}</p>
                          </div>
                          <Button size="sm" variant="ghost" className="gap-1">
                            <ThumbsUp className="w-3 h-3" />
                            {qa.votes}
                          </Button>
                        </div>
                      </div>
                    </div>)}

                  <div className="pt-4 border-t border-border">
                    <h4 className="font-semibold text-foreground mb-3">Ask a Question</h4>
                    <Textarea placeholder="Type your question here..." className="mb-3" />
                    <Button>Submit Question</Button>
                  </div>
                </div>
              </Card>}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Active Collaborators */}
            <Card className="p-6 bg-card">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Active Now (4)
              </h3>
              <div className="space-y-3">
                {[{
                name: "Dr. Maya Patel",
                status: "Editing intro",
                color: "bg-sentiment-curious"
              }, {
                name: "Sophie Martinez",
                status: "Reviewing section 3",
                color: "bg-sentiment-inspiring"
              }, {
                name: "Alex Chen",
                status: "Adding references",
                color: "bg-sentiment-joyful"
              }, {
                name: "You",
                status: "Viewing",
                color: "bg-primary"
              }].map(user => <div key={user.name} className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${user.color} animate-pulse`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {user.status}
                      </p>
                    </div>
                  </div>)}
              </div>
            </Card>

            {/* Fact-Checking Status */}
            <Card className="p-6 bg-card">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                Fact Checks
              </h3>
              <div className="space-y-3">
                {[{
                section: "Introduction",
                status: "verified",
                count: 3
              }, {
                section: "Methodology",
                status: "pending",
                count: 1
              }, {
                section: "Case Studies",
                status: "verified",
                count: 5
              }].map(check => <div key={check.section} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {check.status === "verified" ? <CheckCircle className="w-4 h-4 text-sentiment-inspiring" /> : <AlertCircle className="w-4 h-4 text-sentiment-urgent" />}
                      <span className="text-sm text-foreground">{check.section}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {check.count} {check.status === "verified" ? "✓" : "pending"}
                    </Badge>
                  </div>)}
              </div>
            </Card>

            {/* Verification Badge */}
            
          </div>
        </div>
      </main>
    </div>;
};
export default Collaborate;