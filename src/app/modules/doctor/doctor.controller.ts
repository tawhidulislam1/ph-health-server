import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { DoctorService } from "./doctor.service";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";

const createDoctor = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await DoctorService.createDoctor(payload);
  sendResponse(res, {
    httpStatusCode: status.CREATED,
    success: true,
    message: "patient Resgiters successfully",
    data: result,
  });
});

export const DoctorController = {
  createDoctor,
};
