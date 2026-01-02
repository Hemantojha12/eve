import { pgTable, text, serial, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";
import { users } from "./models/auth";

export * from "./models/auth";

export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  date: timestamp("date").notNull(),
  location: text("location").notNull(),
  imageUrl: text("image_url").notNull(),
  price: integer("price").notNull(), // in cents
  totalSeats: integer("total_seats").notNull(),
  organizerId: text("organizer_id").references(() => users.id),
});

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id),
  eventId: integer("event_id").notNull().references(() => events.id),
  bookingDate: timestamp("booking_date").defaultNow(),
  status: text("status").notNull().default("confirmed"), // confirmed, cancelled
});

export const eventsRelations = relations(events, ({ one, many }) => ({
  organizer: one(users, {
    fields: [events.organizerId],
    references: [users.id],
  }),
  bookings: many(bookings),
}));

export const bookingsRelations = relations(bookings, ({ one }) => ({
  event: one(events, {
    fields: [bookings.eventId],
    references: [events.id],
  }),
  user: one(users, {
    fields: [bookings.userId],
    references: [users.id],
  }),
}));

export const insertEventSchema = createInsertSchema(events).omit({ id: true });
export const insertBookingSchema = createInsertSchema(bookings).omit({ id: true, bookingDate: true, status: true });

export type Event = typeof events.$inferSelect;
export type Booking = typeof bookings.$inferSelect;
export type InsertEvent = z.infer<typeof insertEventSchema>;
export type InsertBooking = z.infer<typeof insertBookingSchema>;
