import { users, favorites, type User, type InsertUser, type Favorite, type InsertFavorite } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getFavorites(userId: number): Promise<string[]>;
  addFavorite(favorite: InsertFavorite): Promise<Favorite>;
  removeFavorite(userId: number, bookId: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private favorites: Map<number, Favorite>;
  currentId: number;
  currentFavoriteId: number;

  constructor() {
    this.users = new Map();
    this.favorites = new Map();
    this.currentId = 1;
    this.currentFavoriteId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getFavorites(userId: number): Promise<string[]> {
    return Array.from(this.favorites.values())
      .filter(f => f.userId === userId)
      .map(f => f.bookId);
  }

  async addFavorite(insertFavorite: InsertFavorite): Promise<Favorite> {
    const id = this.currentFavoriteId++;
    const favorite: Favorite = { ...insertFavorite, id };
    this.favorites.set(id, favorite);
    return favorite;
  }

  async removeFavorite(userId: number, bookId: string): Promise<void> {
    const favorite = Array.from(this.favorites.values())
      .find(f => f.userId === userId && f.bookId === bookId);
    if (favorite) {
      this.favorites.delete(favorite.id);
    }
  }
}

export const storage = new MemStorage();
