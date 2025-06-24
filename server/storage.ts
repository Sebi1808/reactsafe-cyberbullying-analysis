import { comments, strategies, responses, type Comment, type InsertComment, type Strategy, type Response, type InsertResponse, type AnalysisResult } from "@shared/schema";
import { db } from "./db";
import { eq, inArray } from "drizzle-orm";

export interface IStorage {
  // Comments
  createComment(comment: InsertComment): Promise<Comment>;
  getComment(id: number): Promise<Comment | undefined>;
  updateCommentAnalysis(id: number, analysis: AnalysisResult): Promise<Comment>;
  
  // Strategies
  getAllStrategies(): Promise<Strategy[]>;
  getStrategy(id: number): Promise<Strategy | undefined>;
  getStrategiesByIds(ids: number[]): Promise<Strategy[]>;
  
  // Responses
  createResponse(response: InsertResponse): Promise<Response>;
  getResponsesByComment(commentId: number): Promise<Response[]>;
}

export class DatabaseStorage implements IStorage {
  private initialized = false;

  constructor() {
    // Initialize predefined strategies in database asynchronously
    this.ensureInitialized();
  }

  private async ensureInitialized() {
    if (!this.initialized) {
      await this.initializeStrategies();
      this.initialized = true;
    }
  }

  private async initializeStrategies() {
    try {
      // Check if strategies already exist
      const existingStrategies = await db.select().from(strategies).limit(1);
      if (existingStrategies.length > 0) {
        return; // Strategies already initialized
      }

      const predefinedStrategies = [
        {
          name: "Deeskalation",
          description: "Beruhigt die Situation und reduziert Spannungen durch ruhige, verständnisvolle Kommunikation.",
          icon: "🕊️",
          category: "defensive",
          pros: ["Vermeidet weitere Eskalation", "Professionelle Reaktion", "Bewahrt Ruhe"],
          cons: ["Könnte als Schwäche interpretiert werden", "Langsamere Konfliktlösung"],
          riskLevel: "low"
        },
        {
          name: "Ignorieren",
          description: "Keine Reaktion zeigen und dem Angreifer ins Leere laufen lassen.",
          icon: "🚫",
          category: "passive",
          pros: ["Entzieht Aufmerksamkeit", "Vermeidet Eskalation", "Emotionale Distanz"],
          cons: ["Könnte Verhalten verstärken", "Keine Problemlösung", "Mögliche Eskalation"],
          riskLevel: "medium"
        },
        {
          name: "Direkte Konfrontation",
          description: "Klare Grenzen setzen und sich selbstbewusst zur Wehr setzen.",
          icon: "⚔️",
          category: "assertive",
          pros: ["Klare Kommunikation", "Setzt Grenzen", "Zeigt Stärke"],
          cons: ["Kann Konflikt verstärken", "Erhöhte Emotionalität", "Unvorhersagbare Reaktion"],
          riskLevel: "high"
        },
        {
          name: "Dokumentieren",
          description: "Screenshots und Beweise sammeln für spätere rechtliche oder disziplinarische Schritte.",
          icon: "📝",
          category: "informative",
          pros: ["Rechtliche Absicherung", "Professioneller Ansatz", "Langfristige Lösung"],
          cons: ["Keine sofortige Hilfe", "Zeitaufwendig", "Erfordert Mut"],
          riskLevel: "low"
        },
        {
          name: "Hilfe holen",
          description: "Vertrauenspersonen, Beratungsstellen oder Autoritäten um Unterstützung bitten.",
          icon: "🆘",
          category: "supportive",
          pros: ["Professionelle Unterstützung", "Geteilte Verantwortung", "Expertise"],
          cons: ["Abhängigkeit von anderen", "Mögliche Verzögerung", "Verlust der Kontrolle"],
          riskLevel: "low"
        },
        {
          name: "Humor/Deflection",
          description: "Mit Humor oder Ironie antworten um die Situation zu entschärfen.",
          icon: "😄",
          category: "deflective",
          pros: ["Entschärft Situation", "Zeigt Gelassenheit", "Kann Sympathie erzeugen"],
          cons: ["Kann missverstanden werden", "Risiko der Verharmlosung", "Timing wichtig"],
          riskLevel: "medium"
        },
        {
          name: "Sachliche Korrektur",
          description: "Faktische Fehler korrigieren ohne emotional zu werden.",
          icon: "✅",
          category: "informative",
          pros: ["Stellt Fakten klar", "Professionell", "Bildend"],
          cons: ["Kann als belehrend wirken", "Ignoriert emotionale Ebene", "Möglicherweise wirkungslos"],
          riskLevel: "low"
        },
        {
          name: "Empathische Reaktion",
          description: "Verständnis für mögliche Gründe des Verhaltens zeigen.",
          icon: "❤️",
          category: "empathetic",
          pros: ["Zeigt Menschlichkeit", "Kann Aggression reduzieren", "Fördert Dialog"],
          cons: ["Kann als Schwäche interpretiert werden", "Rechtfertigt möglicherweise Verhalten", "Emotional belastend"],
          riskLevel: "low"
        }
      ];

      await db.insert(strategies).values(predefinedStrategies);
      console.log('Strategies initialized in database');
    } catch (error) {
      console.error('Failed to initialize strategies:', error);
    }
  }

  async createComment(insertComment: InsertComment): Promise<Comment> {
    const [comment] = await db
      .insert(comments)
      .values({
        ...insertComment,
        parameters: insertComment.parameters || null,
        title: insertComment.title || null,
        platform: insertComment.platform || null,
      })
      .returning();
    return comment;
  }

  async getComment(id: number): Promise<Comment | undefined> {
    const [comment] = await db.select().from(comments).where(eq(comments.id, id));
    return comment || undefined;
  }

  async updateCommentAnalysis(id: number, analysis: AnalysisResult): Promise<Comment> {
    const [updatedComment] = await db
      .update(comments)
      .set({ analysis })
      .where(eq(comments.id, id))
      .returning();
    
    if (!updatedComment) {
      throw new Error(`Comment with id ${id} not found`);
    }
    
    return updatedComment;
  }

  async getAllStrategies(): Promise<Strategy[]> {
    await this.ensureInitialized();
    return await db.select().from(strategies);
  }

  async getStrategy(id: number): Promise<Strategy | undefined> {
    const [strategy] = await db.select().from(strategies).where(eq(strategies.id, id));
    return strategy || undefined;
  }

  async getStrategiesByIds(ids: number[]): Promise<Strategy[]> {
    if (ids.length === 0) return [];
    return await db.select().from(strategies).where(inArray(strategies.id, ids));
  }

  async createResponse(insertResponse: InsertResponse): Promise<Response> {
    const [response] = await db
      .insert(responses)
      .values({
        ...insertResponse,
        context: insertResponse.context || null,
        commentId: insertResponse.commentId || null,
        strategyId: insertResponse.strategyId || null,
      })
      .returning();
    return response;
  }

  async getResponsesByComment(commentId: number): Promise<Response[]> {
    return await db.select().from(responses).where(eq(responses.commentId, commentId));
  }
}

export const storage = new DatabaseStorage();
