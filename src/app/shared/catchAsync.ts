import { NextFunction, Request, RequestHandler, Response } from "express";

const catchAsync = (fn: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error: any) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "failed to get specialty",
        error: error.message,
      });
    }
  };
};

export default catchAsync;
