import { Book } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

interface BookCardProps {
  book: Book;
  onSelect: (book: Book) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (book: Book) => void;
}

export function BookCard({ book, onSelect, isFavorite, onToggleFavorite }: BookCardProps) {
  const { volumeInfo } = book;
  const coverUrl = volumeInfo.imageLinks?.thumbnail?.replace('http:', 'https:') || 
    'https://images.unsplash.com/photo-1502700807168-484a3e7889d0';

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
      <CardHeader className="p-4">
        <div className="aspect-[2/3] relative overflow-hidden rounded-md mb-4">
          <img 
            src={coverUrl}
            alt={volumeInfo.title}
            className="object-cover w-full h-full"
          />
        </div>
        <CardTitle className="text-lg line-clamp-2">{volumeInfo.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between gap-4 p-4 pt-0">
        <div>
          <p className="text-sm text-muted-foreground line-clamp-1">
            {volumeInfo.authors?.join(", ") || "Unknown Author"}
          </p>
          <p className="text-sm line-clamp-3 mt-2">
            {volumeInfo.description || "No description available"}
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="default" 
            className="flex-1"
            onClick={() => onSelect(book)}
          >
            Details
          </Button>
          {onToggleFavorite && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => onToggleFavorite(book)}
            >
              <Heart 
                className={isFavorite ? "fill-primary" : ""}
                size={20}
              />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
