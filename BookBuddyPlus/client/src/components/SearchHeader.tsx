import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface SearchHeaderProps {
  onSearch: (query: string) => void;
}

export function SearchHeader({ onSearch }: SearchHeaderProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div 
      className="relative bg-cover bg-center py-16 mb-8"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://images.unsplash.com/photo-1456315138460-858d1089ddba)`
      }}
    >
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 text-center">
          Discover Your Next Favorite Book
        </h1>
        <form 
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto flex gap-2"
        >
          <Input
            type="text"
            placeholder="Search for books..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-white"
          />
          <Button type="submit">
            <Search className="mr-2" />
            Search
          </Button>
        </form>
      </div>
    </div>
  );
}
