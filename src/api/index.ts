import app from "../app";
import { seedSuperAdmin } from "../app/utils/seed";


let isSeeded = false;

export default async function handler(req: any, res: any) {
  if (!isSeeded) {
    try {
      await seedSuperAdmin();
      isSeeded = true;
    } catch (error) {
      console.log("Seed failed:", error);
    }
  }

  return app(req, res);
}
