import express, { Application, Request, Response } from "express";
import app from "./app";

const port = 5000; // The port your express server will be running on.

const bootstrap = () => {
  try {
    app.listen(5000, () => {
      console.log(`server is running on 5000`);
    });
  } catch (error) {
    console.log("Failed To Start Server");
  }
};

bootstrap();
