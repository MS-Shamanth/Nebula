import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AccessibilityProvider } from "./contexts/AccessibilityContext";
import { AccessibilityPanel } from "./components/AccessibilityPanel";
import { ScrollToTop } from "./components/ScrollToTop";
import { Navigation } from "./components/Navigation";
import Home from "./pages/Home";
import Browse from "./pages/Browse";
import Collaborate from "./pages/Collaborate";
import About from "./pages/About";
import ImpactWall from "./pages/ImpactWall";
import Playlists from "./pages/Playlists";
import ArticleDetail from "./pages/ArticleDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AccessibilityProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navigation />
          <AccessibilityPanel />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/collaborate" element={<Collaborate />} />
            <Route path="/about" element={<About />} />
            <Route path="/impact-wall" element={<ImpactWall />} />
            <Route path="/playlists" element={<Playlists />} />
            <Route path="/article/:slug" element={<ArticleDetail />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ScrollToTop />
        </BrowserRouter>
      </TooltipProvider>
    </AccessibilityProvider>
  </QueryClientProvider>
);

export default App;
