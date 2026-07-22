import { Request, Response } from "express";
import Employee from "../models/employee.model";

export const createEmployee = async (req: Request, res: Response) => {
  try {
    const { name, email, department, designation, salary, age } = req.body;

    if (!name || !email || !department || !designation || !salary || !age) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const employeeExist = await Employee.findOne({ email });

    if (employeeExist) {
      return res.status(400).json({
        success: false,
        message: "Employee already exists",
      });
    }

    const employee = await Employee.create({
      name,
      email,
      department,
      designation,
      salary,
      age,
    });

    return res.status(201).json({
      success: true,
      message: "Employee created successfully",
      data: employee,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getEmployee = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const search = (req.query.search as string) || "";

    const skip = (page - 1) * limit;

    const query = {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { department: { $regex: search, $options: "i" } },
        { designation: { $regex: search, $options: "i" } },
      ],
    };

    const employees = await Employee.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalEmployees = await Employee.countDocuments(query);

    return res.status(200).json({
      success: true,
      message: "Employees fetched successfully",
      currentPage: page,
      totalPages: Math.ceil(totalEmployees / limit),
      totalEmployees,
      data: employees,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getEmployeeById = async (req: Request, res: Response) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: employee,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch employee",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const updateEmployee = async (req: Request, res: Response) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      data: employee,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update employee",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
export const deleteEmployee = async (req: Request, res: Response) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Employee deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete employee",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
