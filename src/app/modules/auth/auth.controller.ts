import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { authService } from "./auth.service";
import { sendResponse } from "../../shared/sendResponse";

const resgisterPatient = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await authService.resgisterPatient(payload);
  sendResponse(res, {
    httpStatusCode: 201,
    success: true,
    message: "patient Resgiters successfully",
    data: result,
  });
});
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await authService.loginUser(payload);
  sendResponse(res, {
    httpStatusCode: 201,
    success: true,
    message: "patient login successfully",
    data: result,
  });
});

export const authController = {
  resgisterPatient,
  loginUser,
};
