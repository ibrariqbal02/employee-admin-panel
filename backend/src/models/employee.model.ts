import mongoose, { model, Schema, Document } from "mongoose";

export interface IEmployee extends Document {
  name: string;
  email: string;
  department: string;
  designation: string;
  salary: number;
  age: number;
}

const employeeSchecma = new Schema<IEmployee>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    department: {
      type: String,
      required: true,
      trim: true,
    },
    designation: {
      type: String,
      required: true,
      trim: true,
    },
    salary: {
      type: Number,
      required: true,
      min: 0,
    },
    age: {
      type: Number,
      required: true,
      min: 18,
    },
  },
  {
    timestamps: true,
  }
);

const Employee = model<IEmployee>("Employee", employeeSchecma);

export default Employee;
