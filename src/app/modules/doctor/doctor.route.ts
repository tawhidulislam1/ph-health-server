import { Router } from "express";
import { DoctorController } from "./doctor.controller";

const router = Router();

router.post("create-doctor", DoctorController.createDoctor);

export const DoctorRouter = router;
