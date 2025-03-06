import { Book } from "@/lib/api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTranslation } from "@/lib/i18n";

interface BookDetailModalProps {
  book?: Book;
  isOpen: boolean;
  onClose: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: (book: Book) => void;
}

export function BookDetailModal({
  book,
  isOpen,
  onClose,
  isFavorite,
  onToggleFavorite,
}: BookDetailModalProps) {
  const t = useTranslation();

  if (!book) return null;

  const { volumeInfo } = book;
  const coverUrl = volumeInfo.imageLinks?.thumbnail?.replace('http:', 'https:') || 
    'https://images.unsplash.com/photo-1502700807168-484a3e7889d0';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {volumeInfo.title}
          </DialogTitle>
          <DialogDescription>
            {t.book.by} {volumeInfo.authors?.join(", ") || t.book.unknownAuthor}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[calc(85vh-8rem)] pr-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="aspect-[2/3] relative overflow-hidden rounded-lg">
              <img
                src={coverUrl}
                alt={volumeInfo.title}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <h3 className="font-semibold">{t.book.publisher}</h3>
                <p>{volumeInfo.publisher || t.book.unknownPublisher}</p>
                <p className="text-sm text-muted-foreground">
                  {volumeInfo.publishedDate}
                </p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold">{t.book.categories}</h3>
                <p>{volumeInfo.categories?.join(", ") || t.book.uncategorized}</p>
              </div>
              {volumeInfo.pageCount && (
                <>
                  <Separator />
                  <div>
                    <h3 className="font-semibold">{t.book.length}</h3>
                    <p>{volumeInfo.pageCount} {t.book.pages}</p>
                  </div>
                </>
              )}
              {onToggleFavorite && (
                <Button
                  variant={isFavorite ? "default" : "outline"}
                  onClick={() => onToggleFavorite(book)}
                  className="mt-auto"
                >
                  <Heart
                    className={`mr-2 ${isFavorite ? "fill-primary-foreground" : ""}`}
                  />
                  {isFavorite ? t.book.removeFromFavorites : t.book.addToFavorites}
                </Button>
              )}
            </div>
          </div>

          {volumeInfo.description && (
            <div className="mt-6">
              <h3 className="font-semibold mb-2">{t.book.description}</h3>
              <p className="text-sm whitespace-pre-line">
                {volumeInfo.description}
              </p>
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}