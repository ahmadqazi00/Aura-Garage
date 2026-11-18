// import express from "express";
// import dotenv from "dotenv";
// import colors from "colors";
// import cors from "cors";
// import dns from "dns";

// import { carRouter } from "./apis/carApis.js";
// import { errorHandler } from "./middleWares/errorMiddleware.js";
// import { connectDB } from "./config/connect.js";

// dotenv.config();

// dns.setServers(["8.8.8.8"]);

// const app = express();

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//   }),
// );

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use("/uploads", express.static("uploads"));
// // Database
// connectDB();

// // Uploaded images
// app.use("/uploads", express.static("uploads"));

// // Car APIs
// app.use("/", carRouter);

// app.use(errorHandler);

// const PORT = process.env.PORT || 5174;

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`.bgGreen.black);
// });
import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import dns from "dns";

import { carRouter } from "./apis/carApis.js";
import { errorHandler } from "./middleWares/errorMiddleware.js";
import { connectDB } from "./config/connect.js";

dotenv.config();

dns.setServers(["8.8.8.8"]);

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database
connectDB();

// Uploaded images
app.use("/uploads", express.static("uploads"));

// Car APIs
app.use("/", carRouter);

app.use(errorHandler);

// Frontend uses 5274
const PORT = process.env.PORT || 5274;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.bgGreen.black);
});
