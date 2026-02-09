import { NextFunction, Request, RequestHandler, Response } from "express";
import { SpecialityService } from "./speciality.service";
import catchAsync from "../../shared/catchAsync";

const createSpeciality = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await SpecialityService.createSpeciality(payload);
  res.status(201).json({
    success: true,
    message: "Speciality Created Sucessfully",
    data: result,
  });
});

const getAllSpeciality = catchAsync(async (req: Request, res: Response) => {
  const result = await SpecialityService.getAllSpeciality();
  res.status(200).json({
    success: true,
    message: "specialty fetched successfully",
    data: result,
  });
});

const deleteSpeciality = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await SpecialityService.deleteSpeciality(id as string);
  res.status(200).json({
    success: true,
    message: "Speciality delete Sucessfully",
    data: result,
  });
});

const updateSpeciality = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;

  const result = await SpecialityService.updateSpeciality(
    id as string,
    payload,
  );
  res.status(200).json({
    success: true,
    message: "Speciality update Sucessfully",
    data: result,
  });
});

export const SpecialityController = {
  createSpeciality,
  getAllSpeciality,
  deleteSpeciality,
  updateSpeciality,
};
