import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  analysis: jsonb("analysis"),
  mode: text("mode").notNull(), // 'manual' | 'autopilot'
  parameters: jsonb("parameters"),
  title: text("title"),
  platform: text("platform"), // 'instagram', 'twitter', 'facebook', etc.
  createdAt: timestamp("created_at").defaultNow(),
});

export const strategies = pgTable("strategies", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  category: text("category").notNull(),
  pros: jsonb("pros").notNull(),
  cons: jsonb("cons").notNull(),
  riskLevel: text("risk_level").notNull(), // 'low' | 'medium' | 'high'
});

export const responses = pgTable("responses", {
  id: serial("id").primaryKey(),
  commentId: integer("comment_id").references(() => comments.id),
  strategyId: integer("strategy_id").references(() => strategies.id),
  generatedText: text("generated_text").notNull(),
  context: jsonb("context"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Zod schemas
export const insertCommentSchema = createInsertSchema(comments).pick({
  content: true,
  mode: true,
  parameters: true,
  title: true,
  platform: true,
});

export const insertResponseSchema = createInsertSchema(responses).pick({
  commentId: true,
  strategyId: true,
  generatedText: true,
  context: true,
});

// Analysis parameters schema
export const analysisParametersSchema = z.object({
  severityLevels: z.array(z.enum(['light', 'medium', 'severe'])),
  categories: z.array(z.enum(['insult', 'threat', 'discrimination', 'harassment'])),
  context: z.array(z.enum(['public', 'private', 'professional'])),
});

// Context information schema
export const contextInfoSchema = z.object({
  relationship: z.enum(['unknown', 'colleague', 'friend', 'family', 'other']),
  desiredReaction: z.enum(['deescalate', 'confront', 'ignore', 'report']),
  additionalInfo: z.string().optional(),
});

// Analysis result schema
export const analysisResultSchema = z.object({
  riskScore: z.number().min(0).max(10),
  riskLevel: z.enum(['low', 'medium', 'high']),
  categories: z.object({
    linguistic: z.object({
      negativeLanguage: z.number().min(0).max(100),
      aggressiveWords: z.number().min(0).max(100),
      emotionalIntensity: z.number().min(0).max(100),
    }),
    cyberbullying: z.object({
      degradation: z.enum(['low', 'medium', 'high']),
      isolation: z.enum(['low', 'medium', 'high']),
      powerImbalance: z.enum(['low', 'medium', 'high']),
    }),
    communication: z.object({
      tone: z.string(),
      intention: z.string(),
      escalationPotential: z.enum(['low', 'medium', 'high']),
    }),
  }),
  recommendedStrategies: z.array(z.number()),
});

// Types
export type InsertComment = z.infer<typeof insertCommentSchema>;
export type Comment = typeof comments.$inferSelect;
export type InsertResponse = z.infer<typeof insertResponseSchema>;
export type Response = typeof responses.$inferSelect;
export type Strategy = typeof strategies.$inferSelect;
export type AnalysisParameters = z.infer<typeof analysisParametersSchema>;
export type ContextInfo = z.infer<typeof contextInfoSchema>;
export type AnalysisResult = z.infer<typeof analysisResultSchema>;
