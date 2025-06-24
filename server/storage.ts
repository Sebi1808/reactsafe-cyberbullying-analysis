import { comments, strategies, responses, type Comment, type InsertComment, type Strategy, type Response, type InsertResponse, type AnalysisResult } from "@shared/schema";

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

export class MemStorage implements IStorage {
  private comments: Map<number, Comment>;
  private strategies: Map<number, Strategy>;
  private responses: Map<number, Response>;
  private currentCommentId: number;
  private currentResponseId: number;

  constructor() {
    this.comments = new Map();
    this.strategies = new Map();
    this.responses = new Map();
    this.currentCommentId = 1;
    this.currentResponseId = 1;
    
    // Initialize predefined strategies
    this.initializeStrategies();
  }

  private initializeStrategies() {
    const predefinedStrategies: Omit<Strategy, 'id'>[] = [
      {
        name: "Deeskalation",
        description: "Ruhige, sachliche Antwort die zur Beruhigung der Situation beiträgt",
        icon: "fas fa-dove",
        category: "defensive",
        pros: ["Vermeidet weitere Eskalation", "Professionelle Reaktion", "Bewahrt Ruhe"],
        cons: ["Könnte als Schwäche interpretiert werden", "Langsamere Konfliktlösung"],
        riskLevel: "low"
      },
      {
        name: "Direkte Konfrontation",
        description: "Klare Grenzen setzen und das Verhalten direkt ansprechen",
        icon: "fas fa-shield",
        category: "assertive",
        pros: ["Klare Kommunikation", "Setzt Grenzen", "Zeigt Stärke"],
        cons: ["Kann Konflikt verstärken", "Erhöhte Emotionalität", "Unvorhersagbare Reaktion"],
        riskLevel: "high"
      },
      {
        name: "Ignorieren",
        description: "Keine Reaktion zeigen und dem Angreifer keine Aufmerksamkeit schenken",
        icon: "fas fa-eye-slash",
        category: "passive",
        pros: ["Entzieht Aufmerksamkeit", "Vermeidet Eskalation", "Emotionale Distanz"],
        cons: ["Könnte Verhalten verstärken", "Keine Problemlösung", "Mögliche Eskalation"],
        riskLevel: "medium"
      },
      {
        name: "Humor/Ironie",
        description: "Mit Humor oder Ironie antworten um die Situation zu entschärfen",
        icon: "fas fa-smile",
        category: "deflective",
        pros: ["Entschärft Situation", "Zeigt Gelassenheit", "Kann Sympathie erzeugen"],
        cons: ["Kann missverstanden werden", "Risiko der Verharmlosung", "Timing wichtig"],
        riskLevel: "medium"
      },
      {
        name: "Sachliche Korrektur",
        description: "Faktische Fehler korrigieren ohne emotional zu werden",
        icon: "fas fa-check-circle",
        category: "informative",
        pros: ["Stellt Fakten klar", "Professionell", "Bildend"],
        cons: ["Kann als belehrend wirken", "Ignoriert emotionale Ebene", "Möglicherweise wirkungslos"],
        riskLevel: "low"
      },
      {
        name: "Empathische Reaktion",
        description: "Verständnis für mögliche Gründe des Verhaltens zeigen",
        icon: "fas fa-heart",
        category: "empathetic",
        pros: ["Zeigt Menschlichkeit", "Kann Aggression reduzieren", "Fördert Dialog"],
        cons: ["Kann als Schwäche interpretiert werden", "Rechtfertigt möglicherweise Verhalten", "Emotional belastend"],
        riskLevel: "low"
      }
    ];

    predefinedStrategies.forEach((strategy, index) => {
      const strategyWithId: Strategy = { ...strategy, id: index + 1 };
      this.strategies.set(strategyWithId.id, strategyWithId);
    });
  }

  async createComment(insertComment: InsertComment): Promise<Comment> {
    const id = this.currentCommentId++;
    const comment: Comment = {
      ...insertComment,
      id,
      analysis: null,
      parameters: insertComment.parameters || null,
      createdAt: new Date(),
    };
    this.comments.set(id, comment);
    return comment;
  }

  async getComment(id: number): Promise<Comment | undefined> {
    return this.comments.get(id);
  }

  async updateCommentAnalysis(id: number, analysis: AnalysisResult): Promise<Comment> {
    const comment = this.comments.get(id);
    if (!comment) {
      throw new Error(`Comment with id ${id} not found`);
    }
    const updatedComment: Comment = { ...comment, analysis };
    this.comments.set(id, updatedComment);
    return updatedComment;
  }

  async getAllStrategies(): Promise<Strategy[]> {
    return Array.from(this.strategies.values());
  }

  async getStrategy(id: number): Promise<Strategy | undefined> {
    return this.strategies.get(id);
  }

  async getStrategiesByIds(ids: number[]): Promise<Strategy[]> {
    return ids.map(id => this.strategies.get(id)).filter(Boolean) as Strategy[];
  }

  async createResponse(insertResponse: InsertResponse): Promise<Response> {
    const id = this.currentResponseId++;
    const response: Response = {
      ...insertResponse,
      id,
      context: insertResponse.context || null,
      commentId: insertResponse.commentId || null,
      strategyId: insertResponse.strategyId || null,
      createdAt: new Date(),
    };
    this.responses.set(id, response);
    return response;
  }

  async getResponsesByComment(commentId: number): Promise<Response[]> {
    return Array.from(this.responses.values()).filter(
      (response) => response.commentId === commentId
    );
  }
}

export const storage = new MemStorage();
