import express from "express";
import { registerCar, getCarController } from "../controllers/carController.js";

export const carRouter = express.Router();

carRouter.post("/register-car", registerCar);
carRouter.get("/car", getCarController);
