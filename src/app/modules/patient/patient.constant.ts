import { Prisma } from "../../../generated/prisma/client";

export const patientSearchableFields = [
  "name",
  "email",
  "contactNumber",
  "address",
];

export const patientFilterableFields = [
  "isDeleted",
  "user.role",
  "name",
  "email",
  "contactNumber",
];

export const patientIncludeConfig: Partial<
  Record<
    keyof Prisma.PatientInclude,
    Prisma.PatientInclude[keyof Prisma.PatientInclude]
  >
> = {
  user: true,
  patientHealthData: true,
  medicalReports: true,
};
