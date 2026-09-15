import express from "express";
import dotenv from "dotenv";
dotenv.config();
import colors from "colors";
import { carRouter } from "./apis/carApis.js";
import { errorHandler } from "./middleWares/errorMiddleware.js";
import { connectDB } from "./config/connect.js";
import dns from "dns";
dns.setServers(["8.8.8.8"]);

const app = express();

//convert/parse to join
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//connect to database

connectDB();

//apis => cars
app.use("/", carRouter);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`.bgGreen.black);
});

// details:
// 2 navbar at first, with search bar and filter options,
// 2nd navbar with car brands and with brand cars are filtered and displayed in the home page,
// then the home page scrolling horrizontally with the cards of the cars,
// available cars option and below them there should be cars of all category...
// in the last there should be a footer with the contact us and about us and other details,
