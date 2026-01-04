import type { Express } from "express";
import { createServer, type Server } from "http";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Static frontend-only setup
  // The backend is managed externally by the user
  
  return httpServer;
}
