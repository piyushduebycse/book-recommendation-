import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import axios from "axios";
import { z } from "zod";

const GOOGLE_BOOKS_API = "https://www.googleapis.com/books/v1/volumes";
const API_KEY = process.env.GOOGLE_BOOKS_API_KEY || "";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/books/search", async (req, res) => {
    try {
      const { q = "", subject = "", startIndex = "0", language = "", orderBy = "relevance" } = req.query;
      let queryString = q as string;

      // If subject is provided, add it to the query string
      if (subject) {
        queryString = queryString ? `${queryString}+subject:${subject}` : `subject:${subject}`;
      }

      // Ensure we get results even with empty query
      if (!queryString.trim()) {
        queryString = "popular books"; // Default search term to get recommended books
      }

      const params: Record<string, string> = {
        q: queryString,
        startIndex: startIndex.toString(),
        maxResults: "20",
        orderBy: orderBy as string,
        key: API_KEY,
      };

      // Add language filter if specified and not 'all'
      if (language && language !== 'all') {
        params.langRestrict = language;
      }

      const response = await axios.get(GOOGLE_BOOKS_API, { params });
      res.json(response.data);
    } catch (error) {
      console.error("Google Books API error:", error);
      res.status(500).json({ message: "Failed to fetch books" });
    }
  });

  app.get("/api/books/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const response = await axios.get(`${GOOGLE_BOOKS_API}/${id}`, {
        params: { key: API_KEY }
      });
      res.json(response.data);
    } catch (error) {
      console.error("Google Books API error:", error);
      res.status(500).json({ message: "Failed to fetch book details" });
    }
  });

  app.get("/api/favorites", async (req, res) => {
    const userId = 1; // Mock user ID for demo
    const favorites = await storage.getFavorites(userId);
    res.json(favorites);
  });

  app.post("/api/favorites", async (req, res) => {
    try {
      const userId = 1; // Mock user ID for demo
      const schema = z.object({ bookId: z.string() });
      const { bookId } = schema.parse(req.body);

      const favorite = await storage.addFavorite({ userId, bookId });
      res.json(favorite);
    } catch (error) {
      res.status(400).json({ message: "Invalid request" });
    }
  });

  app.delete("/api/favorites/:bookId", async (req, res) => {
    const userId = 1; // Mock user ID for demo
    const { bookId } = req.params;
    await storage.removeFavorite(userId, bookId);
    res.status(204).send();
  });

  const httpServer = createServer(app);
  return httpServer;
}