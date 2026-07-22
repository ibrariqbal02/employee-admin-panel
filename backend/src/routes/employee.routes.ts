import { Router } from "express";
import {
  createEmployee,
  deleteEmployee,
  getEmployee,
  getEmployeeById,
  updateEmployee,
} from "../controllers/employee.controller";

const router = Router();

router.post("/", createEmployee);
router.get("/", getEmployee);
router.get("/:id", getEmployeeById);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);
export default router;
