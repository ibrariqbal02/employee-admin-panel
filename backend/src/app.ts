import express, { Application, Request, Response } from "express";

import cors from "cors";
import dotenv from "dotenv";
import employeeRoutes from "./routes/employee.routes";
import connectDb from "./config/bd";
dotenv.config();
const app: Application = express();

// Middleware

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDb();

app.use("/api/employees", employeeRoutes);

// Test routs

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Employee API is running...",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is Listing on Port ${PORT}`);
});
