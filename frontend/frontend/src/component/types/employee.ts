export interface Employee {
  _id: string;
  name: string;
  email: string;
  department: string;
  designation: string;
  salary: number;
  age: number;
  createdAt: string;
  updatedAt: string;
}

export interface EmployeeResponse {
  success: boolean;
  currentPage: number;
  totalPages: number;
  totalEmployees: number;
  data: Employee[];
}

export interface SingleEmployeeResponse {
  success: boolean;
  data: Employee;
}

export interface EmployeeFormData {
  name: string;
  email: string;
  department: string;
  designation: string;
  salary: number;
  age: number;
}
