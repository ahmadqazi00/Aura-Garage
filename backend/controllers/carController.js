import { Car } from "../models/carModel.js";

export const registerCar = async (req, res) => {
  const { name, model, year, color, price, mileage, description, image } =
    req.body || {};

  if (
    !image ||
    !name ||
    !model ||
    !year ||
    !color ||
    !price ||
    !mileage ||
    !description
  ) {
    return res.status(400).json({
      message: "Please fill all the fields",
    });
  }

  let findCar = await Car.findOne({
    $or: [{ name }, { model }, { year }],
  });

  if (findCar) {
    res.status(400);
    throw new Error("Car with the same name, model, or year already exists");
  }

  let createCar = await Car.create({
    image,
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
};

// export const getCarController = async (req, res) => {
//   const { name, model } = req.body;

//   let findCar = await Car.findOne({ name, model });

//   if (!findCar) {
//     res.status(404);
//     throw new Error("Invalid car name or model");
//   }

//   if (model == findCar.model) {
//     res.send(findCar);
//   } else {
//     res.status(401);
//     throw new Error("Invalid Creddentials");
//   }
// };
export const getCarController = async (req, res) => {
  const { name, model } = req.query;

  let findCar = await Car.findOne({ name, model });

  if (!findCar) {
    res.status(404);
    throw new Error("Invalid car name or model");
  }

  res.send(findCar);
};
