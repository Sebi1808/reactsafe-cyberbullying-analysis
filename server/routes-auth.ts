import type { Express } from "express";
import { setupAuth, isAuthenticated } from "./replitAuth";

// This file contains auth routes that will be activated when Replit Auth is configured
// Currently commented out because no SESSION_SECRET or REPL_ID is configured

export async function setupAuthRoutes(app: Express) {
  // Uncomment when Replit Auth is configured:
  
  // await setupAuth(app);
  
  // User profile route
  // app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
  //   try {
  //     const userId = req.user.claims.sub;
  //     const user = await storage.getUser(userId);
  //     res.json(user);
  //   } catch (error) {
  //     console.error("Error fetching user:", error);
  //     res.status(500).json({ message: "Failed to fetch user" });
  //   }
  // });

  // User history routes
  // app.get('/api/history', isAuthenticated, async (req: any, res) => {
  //   try {
  //     const userId = req.user.claims.sub;
  //     const history = await storage.getUserHistory(userId);
  //     res.json(history);
  //   } catch (error) {
  //     res.status(500).json({ message: "Failed to fetch history" });
  //   }
  // });

  // app.get('/api/history/stats', isAuthenticated, async (req: any, res) => {
  //   try {
  //     const userId = req.user.claims.sub;
  //     const stats = await storage.getUserStats(userId);
  //     res.json(stats);
  //   } catch (error) {
  //     res.status(500).json({ message: "Failed to fetch stats" });
  //   }
  // });

  console.log("Auth routes ready but disabled - configure Replit Auth to enable");
}