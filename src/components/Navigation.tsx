import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Home, Search, Users, Lightbulb, BookOpen } from "lucide-react";

export const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/browse", label: "Browse", icon: Search },
    { path: "/collaborate", label: "Collaborate", icon: Users },
    { path: "/about", label: "About", icon: Lightbulb },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 group">
            <BookOpen className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
            <div className="text-2xl font-bold bg-gradient-accent bg-clip-text text-transparent">
              Nebula Copilot
            </div>
          </Link>

          <div className="flex items-center gap-2">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link key={path} to={path}>
                <Button
                  variant={location.pathname === path ? "default" : "ghost"}
                  size="sm"
                  className="gap-2"
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{label}</span>
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
