import { Router } from "express";
import { SpecialityRoutes } from "../modules/speciality/speciality.router";

const router = Router();

router.use("/specialties", SpecialityRoutes);

export const IndexRoutes = router;
