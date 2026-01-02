import { db } from "./db";
import { users, events, bookings, type User, type Event, type InsertEvent, type Booking, type InsertBooking } from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  // App-specific methods
  getEvents(): Promise<Event[]>;
  getEvent(id: number): Promise<Event | undefined>;
  createEvent(event: InsertEvent): Promise<Event>;
  
  getBookings(userId: string): Promise<(Booking & { event: Event })[]>;
  createBooking(booking: InsertBooking): Promise<Booking>;
}

export class DatabaseStorage implements IStorage {
  async getEvents(): Promise<Event[]> {
    return await db.select().from(events);
  }

  async getEvent(id: number): Promise<Event | undefined> {
    const [event] = await db.select().from(events).where(eq(events.id, id));
    return event;
  }

  async createEvent(event: InsertEvent): Promise<Event> {
    const [newEvent] = await db.insert(events).values(event).returning();
    return newEvent;
  }

  async getBookings(userId: string): Promise<(Booking & { event: Event })[]> {
    const results = await db.query.bookings.findMany({
      where: eq(bookings.userId, userId),
      with: {
        event: true
      }
    });
    return results as (Booking & { event: Event })[];
  }

  async createBooking(booking: InsertBooking): Promise<Booking> {
    const [newBooking] = await db.insert(bookings).values(booking).returning();
    return newBooking;
  }
}

export const storage = new DatabaseStorage();
