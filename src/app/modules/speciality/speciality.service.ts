import { Speciality } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createSpeciality = async (payload: Speciality): Promise<Speciality> => {
  const speciality = await prisma.speciality.create({
    data: payload,
  });
  return speciality;
};
const getAllSpeciality = async (): Promise<Speciality[]> => {
  const speciality = await prisma.speciality.findMany();
  return speciality;
};
const deleteSpeciality = async (id: string): Promise<Speciality> => {
  const speciality = await prisma.speciality.delete({
    where: { id },
  });
  return speciality;
};
const updateSpeciality = async (
  id: string,
  payload: Speciality,
): Promise<Speciality> => {
  const speciality = await prisma.speciality.update({
    where: { id },
    data: payload,
  });
  return speciality;
};

export const SpecialityService = {
  createSpeciality,
  getAllSpeciality,
  deleteSpeciality,
  updateSpeciality,
};
