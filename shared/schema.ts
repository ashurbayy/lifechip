import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const medicalProfiles = pgTable("medical_profiles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  chipId: text("chip_id").notNull().unique(),
  bloodType: text("blood_type"),
  allergies: text("allergies").array(),
  medications: text("medications").array(),
  conditions: text("conditions").array(),
  emergencyContacts: json("emergency_contacts"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Insert schema for users
export const insertUserSchema = createInsertSchema(users)
  .pick({
    username: true,
    email: true,
    password: true,
    fullName: true,
  })
  .extend({
    confirmPassword: z.string(),
  });

// Insert schema for medical profiles
export const insertMedicalProfileSchema = createInsertSchema(medicalProfiles)
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  });

// Insert schema for contact messages
export const insertContactMessageSchema = createInsertSchema(contactMessages)
  .omit({
    id: true,
    createdAt: true,
  });

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertMedicalProfile = z.infer<typeof insertMedicalProfileSchema>;
export type MedicalProfile = typeof medicalProfiles.$inferSelect;

export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;

// Emergency contact type
export type EmergencyContact = {
  name: string;
  relationship: string;
  phone: string;
};

// Login schema
export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginCredentials = z.infer<typeof loginSchema>;
