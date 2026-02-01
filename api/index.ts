import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createApp } from "../server/app";

let appPromise: Promise<ReturnType<typeof createApp>> | null = null;

async function getApp() {
  if (!appPromise) {
    appPromise = createApp();
  }
  const { app } = await appPromise;
  return app;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const app = await getApp();
  return app(req, res);
}

