import express from "express";
import multer from "multer";

import {
  registerCar,
  getCarsController,
  getSingleCarController,
} from "../controllers/carController.js";

export const carRouter = express.Router();

// ================= MULTER =================

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1000000);

    cb(null, uniqueName + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,

  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB per image
  },

  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});

// ================= ROUTES =================

// Add car (field name "images", max 10 photos)
carRouter.post("/register-car", upload.array("images", 10), registerCar);

// Get all cars / search cars
carRouter.get("/cars", getCarsController);

// Get single car
carRouter.get("/cars/:id", getSingleCarController);
