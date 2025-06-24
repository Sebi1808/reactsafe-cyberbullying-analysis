import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { analyzeCyberbullyingComment, generateResponse } from "./services/openai";
import { insertCommentSchema, analysisParametersSchema, contextInfoSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup Replit Auth
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // User history routes
  app.get('/api/history', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const history = await storage.getUserHistory(userId);
      res.json(history);
    } catch (error) {
      console.error("Error fetching history:", error);
      res.status(500).json({ message: "Failed to fetch history" });
    }
  });

  app.get('/api/history/stats', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const stats = await storage.getUserStats(userId);
      res.json(stats);
    } catch (error) {
      console.error("Error fetching stats:", error);
      res.status(500).json({ message: "Failed to fetch stats" });
    }
  });
  
  // Analyze comment endpoint
  app.post("/api/analyze", async (req, res) => {
    try {
      const { comment, mode, parameters, context } = req.body;
      
      if (!comment || typeof comment !== 'string') {
        return res.status(400).json({ message: "Comment is required" });
      }

      // Validate parameters if provided
      let validatedParameters;
      if (parameters) {
        try {
          validatedParameters = analysisParametersSchema.parse(parameters);
        } catch (error) {
          return res.status(400).json({ message: "Invalid analysis parameters" });
        }
      }

      // Validate context if provided
      let validatedContext;
      if (context) {
        try {
          validatedContext = contextInfoSchema.parse(context);
        } catch (error) {
          return res.status(400).json({ message: "Invalid context information" });
        }
      }

      // Create comment record
      // Get user ID if authenticated
      const userId = (req as any).user?.claims?.sub || null;

      const commentData = insertCommentSchema.parse({
        content: comment,
        userId: userId,
      });

      const createdComment = await storage.createComment(commentData);

      // Analyze the comment
      const analysis = await analyzeCyberbullyingComment(
        comment,
        validatedParameters,
        validatedContext
      );

      // Update comment with analysis
      const updatedComment = await storage.updateCommentAnalysis(createdComment.id, analysis);

      // Get recommended strategies
      const strategies = await storage.getStrategiesByIds(analysis.recommendedStrategies);

      res.json({
        comment: updatedComment,
        analysis,
        recommendedStrategies: strategies,
      });
    } catch (error) {
      console.error('Analysis error:', error);
      res.status(500).json({ 
        message: error instanceof Error ? error.message : "Failed to analyze comment" 
      });
    }
  });

  // Generate response endpoint
  app.post("/api/generate-response", async (req, res) => {
    try {
      const { commentId, strategyId, context } = req.body;

      if (!commentId || !strategyId) {
        return res.status(400).json({ message: "Comment ID and strategy ID are required" });
      }

      const comment = await storage.getComment(commentId);
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }

      const strategy = await storage.getStrategy(strategyId);
      if (!strategy) {
        return res.status(404).json({ message: "Strategy not found" });
      }

      // Validate context if provided
      let validatedContext;
      if (context) {
        try {
          validatedContext = contextInfoSchema.parse(context);
        } catch (error) {
          return res.status(400).json({ message: "Invalid context information" });
        }
      }

      // Generate response
      const generatedText = await generateResponse(
        comment.content,
        strategy.name,
        strategy.description,
        validatedContext
      );

      // Save response
      const response = await storage.createResponse({
        commentId,
        strategyId,
        generatedText,
        context: validatedContext,
      });

      res.json({
        response,
        strategy,
      });
    } catch (error) {
      console.error('Response generation error:', error);
      res.status(500).json({ 
        message: error instanceof Error ? error.message : "Failed to generate response" 
      });
    }
  });

  // Get all strategies
  app.get("/api/strategies", async (req, res) => {
    try {
      const strategies = await storage.getAllStrategies();
      res.json(strategies);
    } catch (error) {
      console.error('Error fetching strategies:', error);
      res.status(500).json({ message: "Failed to fetch strategies" });
    }
  });

  // Get strategy by ID
  app.get("/api/strategies/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid strategy ID" });
      }

      const strategy = await storage.getStrategy(id);
      if (!strategy) {
        return res.status(404).json({ message: "Strategy not found" });
      }

      res.json(strategy);
    } catch (error) {
      console.error('Error fetching strategy:', error);
      res.status(500).json({ message: "Failed to fetch strategy" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
