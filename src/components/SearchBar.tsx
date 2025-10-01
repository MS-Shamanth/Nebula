import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { useState } from "react";
interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}
export const SearchBar = ({
  onSearch,
  placeholder = "Search stories by title, tag, or impact..."
}: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };
  return <form onSubmit={handleSubmit} className="relative w-full">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
      <Input type="text" value={query} onChange={e => {
      setQuery(e.target.value);
      onSearch(e.target.value);
    }} placeholder={placeholder} aria-label="Search stories" className="pl-12 pr-4 py-6 text-base border-primary/30 focus:border-primary glow-hover bg-slate-900" />
    </form>;
};