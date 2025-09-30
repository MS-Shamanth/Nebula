import { Lightbulb, Sparkles, Award, Globe } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-16">
          <section className="text-center space-y-4">
            <h1 className="text-5xl font-bold text-foreground">
              The <span className="bg-gradient-accent bg-clip-text text-transparent">Living Knowledge</span> Playground
            </h1>
            <p className="text-xl text-muted-foreground">
              Where knowledge comes alive through collaboration, verification, and community-driven innovation.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-primary" />
              Our Mission
            </h2>
            <p className="text-lg text-foreground/80">
              Nebula Copilot reimagines how knowledge is created and shared through collaborative effort, 
              real-time feedback, and community-driven validation.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <Award className="w-8 h-8 text-primary" />
              Revolutionary Features
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { sentiment: "curious", title: "Sentiment-Driven Filters", desc: "Browse by emotional tone" },
                { sentiment: "inspiring", title: "Live Collaboration", desc: "Real-time editing with teams" },
                { sentiment: "analytical", title: "Community Fact-Checking", desc: "Crowdsourced verification" },
                { sentiment: "urgent", title: "Version History", desc: "Complete transparency" },
              ].map((feature) => (
                <Card key={feature.title} className="p-6 space-y-3 bg-gradient-card hover:shadow-lg transition-shadow">
                  <Badge className={`bg-sentiment-${feature.sentiment}/20 text-sentiment-${feature.sentiment}`}>
                    {feature.sentiment}
                  </Badge>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-foreground/70">{feature.desc}</p>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default About;
