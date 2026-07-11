import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { PatientController } from "./patient.controller";
import { PatientValidation } from "./patient.validation";
import { multerUpload } from "../../../config/multer.config";
import { checkAuth } from "../../middlewere/checkAuth";
import { validateRequest } from "../../middlewere/validateRequest";
import { updateMyPatientProfileMiddleware } from "./patient.middlewares";

const router = Router();

router.get(
  "/",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  PatientController.getAllPatients,
);

router.get(
  "/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  PatientController.getPatientById,
);

router.patch(
  "/update-my-profile",
  checkAuth(Role.PATIENT),
  multerUpload.fields([
    { name: "profilePhoto", maxCount: 1 },
    { name: "medicalReports", maxCount: 5 },
  ]),
  updateMyPatientProfileMiddleware,
  validateRequest(PatientValidation.updatePatientProfileZodSchema),
  PatientController.updateMyProfile,
);

router.delete(
  "/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  PatientController.deletePatient,
);

export const PatientRoutes = router;
