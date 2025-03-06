import { Book } from "@/lib/api";
import { BookCard } from "./BookCard";

interface BookGridProps {
  books: Book[];
  onSelectBook: (book: Book) => void;
  favorites?: Set<string>;
  onToggleFavorite?: (book: Book) => void;
}

export function BookGrid({ books, onSelectBook, favorites, onToggleFavorite }: BookGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onSelect={onSelectBook}
          isFavorite={favorites?.has(book.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}
