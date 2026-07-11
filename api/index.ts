import app from "../src/app";
import { seedSuperAdmin } from "../src/app/utils/seed";
import type { Request, Response } from "express";

let isSeeded = false;

export default async function handler(req: Request, res: Response) {
  if (!isSeeded) {
    try {
      await seedSuperAdmin();
      isSeeded = true;
    } catch (error) {
      console.log("Seed failed:", error);
    }
  }

  return (app as unknown as (req: Request, res: Response) => void)(req, res);
}
