import mongoose from "mongoose";

const carSchema = mongoose.Schema(
  {
    // Cover photo (first image)
    image: {
      type: String,
      default: "",
    },

    // All gallery photos
    images: {
      type: [String],
      default: [],
    },

    name: {
      type: String,
      required: true,
    },

    model: {
      type: String,
      required: true,
    },

    year: {
      type: Number,
      required: true,
    },

    color: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    mileage: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Car = mongoose.model("Car", carSchema);
