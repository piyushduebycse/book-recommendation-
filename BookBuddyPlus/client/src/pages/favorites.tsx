import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { BookGrid } from "@/components/BookGrid";
import { BookDetailModal } from "@/components/BookDetailModal";
import { type Book, removeFavorite, getBookDetails } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";

export default function Favorites() {
  const [selectedBook, setSelectedBook] = useState<Book>();
  const { toast } = useToast();

  const { data: favoriteIds, isLoading: isLoadingFavorites } = useQuery({
    queryKey: ["/api/favorites"],
  });

  const { data: favoriteBooks = [], isLoading: isLoadingBooks } = useQuery({
    queryKey: ["/api/favorites/books", favoriteIds],
    queryFn: async () => {
      if (!favoriteIds?.length) return [];
      return Promise.all(
        favoriteIds.map((id: string) => getBookDetails(id))
      );
    },
    enabled: !!favoriteIds?.length,
  });

  const handleRemoveFavorite = async (book: Book) => {
    try {
      await removeFavorite(book.id);
      queryClient.invalidateQueries({ queryKey: ["/api/favorites"] });
      toast({
        title: "Success",
        description: "Book removed from favorites",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove book from favorites",
        variant: "destructive",
      });
    }
  };

  if (isLoadingFavorites || isLoadingBooks) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
        {Array(4).fill(0).map((_, i) => (
          <div key={i} className="h-[400px] bg-muted animate-pulse rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Favorite Books</h1>
        
        {favoriteBooks.length > 0 ? (
          <BookGrid
            books={favoriteBooks}
            onSelectBook={setSelectedBook}
            favorites={new Set(favoriteIds)}
            onToggleFavorite={handleRemoveFavorite}
          />
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">
              You haven't added any favorites yet
            </p>
          </div>
        )}
      </div>

      <BookDetailModal
        book={selectedBook}
        isOpen={!!selectedBook}
        onClose={() => setSelectedBook(undefined)}
        isFavorite={true}
        onToggleFavorite={handleRemoveFavorite}
      />
    </div>
  );
}
