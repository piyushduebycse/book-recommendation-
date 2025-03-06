import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { SearchHeader } from "@/components/SearchHeader";
import { CategoryFilter } from "@/components/CategoryFilter";
import { FilterPanel, type FilterOptions } from "@/components/FilterPanel";
import { BookGrid } from "@/components/BookGrid";
import { BookDetailModal } from "@/components/BookDetailModal";
import { searchBooks, type Book, type SearchOptions, addFavorite, removeFavorite } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";

const currentYear = new Date().getFullYear();

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBook, setSelectedBook] = useState<Book>();
  const [filters, setFilters] = useState<FilterOptions>({
    sortBy: "relevance",
    language: "all",
    yearRange: [1800, currentYear],
    isExpanded: false
  });

  const { toast } = useToast();

  const { data: favorites } = useQuery({
    queryKey: ["/api/favorites"],
    select: (data: string[]) => new Set(data)
  });

  const searchOptions: SearchOptions = {
    query: searchQuery,
    category: selectedCategory,
    sortBy: filters.sortBy,
    language: filters.language,
    startYear: filters.yearRange[0],
    endYear: filters.yearRange[1]
  };

  const { data, isLoading } = useQuery({
    queryKey: ["/api/books/search", searchOptions],
    queryFn: () => searchBooks(searchOptions),
    enabled: !!searchQuery
  });

  const addFavoriteMutation = useMutation({
    mutationFn: (bookId: string) => addFavorite(bookId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/favorites"] });
      toast({
        title: "Success",
        description: "Book added to favorites"
      });
    }
  });

  const removeFavoriteMutation = useMutation({
    mutationFn: (bookId: string) => removeFavorite(bookId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/favorites"] });
      toast({
        title: "Success",
        description: "Book removed from favorites"
      });
    }
  });

  const handleToggleFavorite = (book: Book) => {
    if (favorites?.has(book.id)) {
      removeFavoriteMutation.mutate(book.id);
    } else {
      addFavoriteMutation.mutate(book.id);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SearchHeader onSearch={setSearchQuery} />

      <main className="container mx-auto px-4 pb-16">
        <div className="space-y-4">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          <FilterPanel
            filters={filters}
            onFilterChange={setFilters}
          />
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
            {Array(8).fill(0).map((_, i) => (
              <div key={i} className="h-[400px] bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        )}

        {data?.items && (
          <div className="mt-6">
            <BookGrid
              books={data.items}
              onSelectBook={setSelectedBook}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
            />
          </div>
        )}

        {!isLoading && !data?.items && searchQuery && (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">No books found</p>
          </div>
        )}

        {!searchQuery && (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">
              Search for books to get started
            </p>
          </div>
        )}
      </main>

      <BookDetailModal
        book={selectedBook}
        isOpen={!!selectedBook}
        onClose={() => setSelectedBook(undefined)}
        isFavorite={selectedBook ? favorites?.has(selectedBook.id) : false}
        onToggleFavorite={handleToggleFavorite}
      />
    </div>
  );
}