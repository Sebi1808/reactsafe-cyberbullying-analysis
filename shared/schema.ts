import {
  pgTable,
  text,
  varchar,
  timestamp,
  jsonb,
  index,
  serial,
  integer,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table for Replit Auth
export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  userId: varchar("user_id"),
  analysisResult: jsonb("analysis_result").$type<AnalysisResult>(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
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

export const insertCommentSchema = createInsertSchema(comments).pick({
  content: true,
  userId: true,
});

export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

export const insertResponseSchema = createInsertSchema(responses).pick({
  commentId: true,
  strategyId: true,
  generatedText: true,
  context: true,
});

export type InsertComment = z.infer<typeof insertCommentSchema>;
export type Comment = typeof comments.$inferSelect;
export type InsertResponse = z.infer<typeof insertResponseSchema>;
export type Response = typeof responses.$inferSelect;
export type Strategy = typeof strategies.$inferSelect;

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
  linguisticAnalysis: z.object({
    pragmatic: z.object({
      speechActs: z.array(z.string()),
      griceMaxims: z.array(z.string()),
      implicatures: z.array(z.string()),
      presuppositions: z.array(z.string()),
      faceThreat: z.enum(['low', 'medium', 'high']),
      politenessStrategies: z.array(z.string()),
      deixis: z.array(z.string()),
    }),
    semantic: z.object({
      keyWords: z.array(z.string()),
      metaphors: z.array(z.string()),
      connotations: z.array(z.string()),
      emotionalLoad: z.number().min(0).max(100),
      frames: z.array(z.string()),
      modality: z.array(z.string()),
      argumentStructure: z.string(),
    }),
    syntactic: z.object({
      sentenceTypes: z.array(z.string()),
      modalVerbs: z.array(z.string()),
      intensifiers: z.array(z.string()),
      complexity: z.enum(['simple', 'medium', 'complex']),
      voiceStructure: z.string(),
      topicalization: z.array(z.string()),
      ellipses: z.array(z.string()),
    }),
    discourse: z.object({
      strategies: z.array(z.string()),
      powerDynamics: z.string(),
      exclusionMechanisms: z.array(z.string()),
      othering: z.array(z.string()),
      legitimation: z.array(z.string()),
      interdiscursivity: z.array(z.string()),
    }),
    psycholinguistic: z.object({
      manipulationTactics: z.array(z.string()),
      identityThreats: z.array(z.string()),
      emotionalImpact: z.string(),
      cognitiveDistortions: z.array(z.string()),
      persuasionStrategies: z.array(z.string()),
      arousalLevel: z.enum(['low', 'medium', 'high']),
    }),
    sociolinguistic: z.object({
      registerShifts: z.array(z.string()),
      socialMarkers: z.array(z.string()),
      culturalNorms: z.array(z.string()),
      powerRelations: z.string(),
    }),
  }).optional(),
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
