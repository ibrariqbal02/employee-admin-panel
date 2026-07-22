import { useEffect, useState, type FormEvent } from "react";
import useCreateEmployee from "../hook/useCreateEmployee";
import useUpdateEmployee from "../hook/useUpdateEmployee";
import type { Employee, EmployeeFormData } from "../types/employee";

import "./EmployeeTable/EmployeeForm.css";

interface EmployeeFormProps {
  mode: "create" | "edit";
  employee?: Employee;
  onSuccess: () => void;
}

const EmployeeForm = ({ mode, employee, onSuccess }: EmployeeFormProps) => {
  const { mutate: createEmployee, isPending: isCreating } = useCreateEmployee();

  const { mutate: updateEmployee, isPending: isUpdating } = useUpdateEmployee();

  const [formData, setFormData] = useState<EmployeeFormData>({
    name: "",
    email: "",
    department: "",
    designation: "",
    salary: 0,
    age: 0,
  });

  useEffect(() => {
    if (mode === "edit" && employee) {
      setFormData({
        name: employee.name,
        email: employee.email,
        department: employee.department,
        designation: employee.designation,
        salary: employee.salary,
        age: employee.age,
      });
    }
  }, [mode, employee]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "salary" || name === "age" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (mode === "create") {
      createEmployee(formData, {
        onSuccess: () => {
          resetForm();
          onSuccess();
        },
      });
    }

    if (mode === "edit" && employee) {
      updateEmployee(
        {
          id: employee._id,
          employee: formData,
        },
        {
          onSuccess: () => {
            onSuccess();
          },
        }
      );
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      department: "",
      designation: "",
      salary: 0,
      age: 0,
    });
  };

  return (
    <form className="employee-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name</label>
        <input
          name="name"
          placeholder="Enter employee name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Email</label>
        <input
          name="email"
          placeholder="Enter employee email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Department</label>
        <input
          name="department"
          placeholder="Enter department"
          value={formData.department}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Designation</label>
        <input
          name="designation"
          placeholder="Enter designation"
          value={formData.designation}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Salary</label>
        <input
          type="number"
          name="salary"
          placeholder="Enter salary"
          value={formData.salary}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Age</label>
        <input
          type="number"
          name="age"
          placeholder="Enter age"
          value={formData.age}
          onChange={handleChange}
        />
      </div>

      <button
        className="submit-btn"
        type="submit"
        disabled={isCreating || isUpdating}
      >
        {mode === "create"
          ? isCreating
            ? "Creating..."
            : "Create Employee"
          : isUpdating
            ? "Updating..."
            : "Update Employee"}
      </button>
    </form>
  );
};

export default EmployeeForm;
