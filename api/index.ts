import { Request, Response } from "express";
import app from "../src/expressApp";
import { seedSuperAdmin } from "../src/app/utils/seed";

let seedPromise: Promise<void> | null = null;

export default async function handler(req: Request, res: Response) {
  if (!seedPromise) {
    seedPromise = seedSuperAdmin().catch((err) => {
      console.log("Seed failed:", err);
      seedPromise = null; // allow retry on next cold start if it failed
    });
  }
  await seedPromise;
  return app(req as Request, res as Response);
}
