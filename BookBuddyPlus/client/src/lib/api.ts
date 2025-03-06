import { apiRequest } from "./queryClient";

export interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    description?: string;
    imageLinks?: {
      thumbnail: string;
    };
    categories?: string[];
    publishedDate?: string;
    publisher?: string;
    pageCount?: number;
    language?: string;
  };
}

export interface SearchResponse {
  items: Book[];
  totalItems: number;
}

export interface SearchOptions {
  query: string;
  category?: string;
  sortBy?: string;
  language?: string;
  startYear?: number;
  endYear?: number;
  startIndex?: number;
}

export const categories = [
  "Fiction",
  "Mystery",
  "Science Fiction",
  "Fantasy",
  "Romance",
  "Thriller",
  "Biography",
  "History",
  "Science",
  "Technology"
];

export async function searchBooks(options: SearchOptions): Promise<SearchResponse> {
  const {
    query,
    category,
    sortBy = "relevance",
    language,
    startYear,
    endYear,
    startIndex = 0
  } = options;

  const params = new URLSearchParams();

  // Build base query
  if (query.trim()) {
    params.append('q', query);
  } else {
    // If no search query, use a broader search term
    params.append('q', category ? `subject:${category}` : 'popular books');
  }

  // Add other parameters
  params.append('startIndex', startIndex.toString());
  params.append('orderBy', sortBy);

  // Add category as a separate parameter if provided
  if (category) {
    params.append('subject', category.toLowerCase());
  }

  // Add language filter if specified
  if (language && language !== 'all') {
    params.append('langRestrict', language);
  }

  // Add date range if specified
  if (startYear && endYear) {
    const currentQuery = params.get('q') || '';
    params.set('q', `${currentQuery}+publishedDate:${startYear}-${endYear}`);
  }

  const response = await fetch(`/api/books/search?${params}`);
  if (!response.ok) throw new Error("Failed to search books");
  return response.json();
}

export async function getBookDetails(id: string): Promise<Book> {
  const response = await fetch(`/api/books/${id}`);
  if (!response.ok) throw new Error("Failed to fetch book details");
  return response.json();
}

export async function addFavorite(bookId: string) {
  return apiRequest("POST", "/api/favorites", { bookId });
}

export async function removeFavorite(bookId: string) {
  return apiRequest("DELETE", `/api/favorites/${bookId}`);
}