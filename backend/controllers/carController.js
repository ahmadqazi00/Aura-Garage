import { Car } from "../models/carModel.js";

// ================= ADD CAR =================

export const registerCar = async (req, res) => {
  try {
    const { name, model, year, color, price, mileage, description } = req.body;

    // Images come from multer (upload.array)
    const files = req.files;

    if (
      !files ||
      files.length === 0 ||
      !name ||
      !model ||
      !year ||
      !color ||
      !price ||
      !mileage ||
      !description
    ) {
      return res.status(400).json({
        message: "Please fill all the fields and select at least one image",
      });
    }

    // Check duplicate
    const findCar = await Car.findOne({
      $or: [{ name: name }, { model: model }],
    });

    if (findCar) {
      return res.status(400).json({
        message: "Car with the same name or model already exists",
      });
    }

    const imageUrls = files.map((file) => `/uploads/${file.filename}`);

    const createCar = await Car.create({
      image: imageUrls[0], // cover photo
      images: imageUrls, // all photos
      name,
      model,
      year,
      color,
      price,
      mileage,
      description,
    });

    return res.status(201).json({
      message: "Car added successfully",
      car: createCar,
    });
  } catch (error) {
    console.log("REGISTER CAR ERROR:", error);

    return res.status(500).json({
      message: error.message || "Failed to add car",
    });
  }
};

// ================= GET ALL CARS =================

export const getCarsController = async (req, res) => {
  try {
    const { search } = req.query;

    let filter = {};

    // Search by name OR model
    if (search && search.trim()) {
      // Escape special characters like ( ) + * so search does not break
      const safeSearch = search.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

      filter = {
        $or: [
          { name: { $regex: safeSearch, $options: "i" } },
          { model: { $regex: safeSearch, $options: "i" } },
        ],
      };
    }

    const cars = await Car.find(filter).sort({ createdAt: -1 });

    res.status(200).json(cars);
  } catch (error) {
    console.log("GET CARS ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch cars",
    });
  }
};

// ================= GET SINGLE CAR =================

export const getSingleCarController = async (req, res) => {
  try {
    const { id } = req.params;

    const car = await Car.findById(id);

    if (!car) {
      return res.status(404).json({
        message: "Car not found",
      });
    }

    res.status(200).json(car);
  } catch (error) {
    console.log("GET SINGLE CAR ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch car",
    });
  }
};
