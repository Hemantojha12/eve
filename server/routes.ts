import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth, registerAuthRoutes } from "./replit_integrations/auth";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(httpServer: Server, app: Express): Promise<Server> {
  await setupAuth(app);
  registerAuthRoutes(app);

  app.get(api.events.list.path, async (req, res) => {
    const events = await storage.getEvents();
    res.json(events);
  });

  app.get(api.events.get.path, async (req, res) => {
    const event = await storage.getEvent(Number(req.params.id));
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  });

  app.post(api.events.create.path, async (req, res) => {
    // Basic protection: only logged in users can create events (or maybe just check auth)
    if (!req.isAuthenticated()) return res.status(401).send();
    try {
      const input = api.events.create.input.parse(req.body);
      const event = await storage.createEvent(input);
      res.status(201).json(event);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      throw err;
    }
  });

  app.get(api.bookings.list.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).send();
    // Replit Auth user ID is in req.user.claims.sub or just req.user.id depending on implementation
    const userId = (req.user as any).id || (req.user as any).claims?.sub;
    const bookings = await storage.getBookings(userId);
    res.json(bookings);
  });

  app.post(api.bookings.create.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).send();
    try {
      const input = api.bookings.create.input.parse(req.body);
      // Force the userId to match the logged-in user
      const userId = (req.user as any).id || (req.user as any).claims?.sub;
      const booking = await storage.createBooking({ ...input, userId });
      res.status(201).json(booking);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      throw err;
    }
  });

  // Seed data
  if ((await storage.getEvents()).length === 0) {
    await storage.createEvent({
      title: "Tech Conference 2024",
      description: "The biggest tech conference of the year featuring top speakers.",
      date: new Date("2024-09-15T09:00:00Z"),
      location: "Convention Center, San Francisco",
      imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87",
      price: 29900, // $299.00
      totalSeats: 500,
      organizerId: null, // Placeholder or fetch a user
    });
    await storage.createEvent({
      title: "Music Festival",
      description: "A weekend of music, food, and fun.",
      date: new Date("2024-10-05T12:00:00Z"),
      location: "Central Park, New York",
      imageUrl: "https://images.unsplash.com/photo-1459749411177-287ce371c015",
      price: 15000, // $150.00
      totalSeats: 1000,
      organizerId: null,
    });
    await storage.createEvent({
      title: "Art Gallery Opening",
      description: "Exclusive opening of the new modern art exhibit.",
      date: new Date("2024-11-20T18:30:00Z"),
      location: "Modern Art Museum, Chicago",
      imageUrl: "https://images.unsplash.com/photo-1518998053901-5348d3969105",
      price: 0, // Free
      totalSeats: 100,
      organizerId: null,
    });
  }

  return httpServer;
}
