import type { Employee, EmployeeFormData, EmployeeResponse, SingleEmployeeResponse } from "../component/types/employee";
import axiosInstance from "./axios";


export const getEmployees = async (
  page: number,
  limit: number,
  search: string = ""
): Promise<EmployeeResponse> => {
  const response = await axiosInstance.get<EmployeeResponse>(
    `/employees?page=${page}&limit=${limit}&search=${search}`
  );

  return response.data;
};


export const getEmployeeById = async (
  id: string
): Promise<SingleEmployeeResponse> => {
  const response = await axiosInstance.get<SingleEmployeeResponse>(
    `/employees/${id}`
  );

  return response.data;
};


export const createEmployee = async (
  employee: EmployeeFormData
): Promise<Employee> => {
  const response = await axiosInstance.post<{ data: Employee }>(
    "/employees",
    employee
  );

  return response.data.data;
};


export const updateEmployee = async (
  id: string,
  employee: EmployeeFormData
): Promise<Employee> => {
  const response = await axiosInstance.put<{ data: Employee }>(
    `/employees/${id}`,
    employee
  );

  return response.data.data;
};


export const deleteEmployee = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/employees/${id}`);
};