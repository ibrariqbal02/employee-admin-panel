import { Link } from "react-router-dom";
import type { Employee } from "../../types/employee";
import "./EmployeeTable.css";

interface EmployeeTableProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
}

const EmployeeTable = ({ employees, onEdit, onDelete }: EmployeeTableProps) => {
  return (
    <div className="table-container">
      <table className="employee-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Salary</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees.length > 0 ? (
            employees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.department}</td>
                <td>{employee.designation}</td>
                <td>${employee.salary}</td>
                <td>{employee.age}</td>

                <td>
                  <div className="action-buttons">
                    <Link to={`/employees/${employee._id}`}>
                      <button className="view-btn">View</button>
                    </Link>

                    <button
                      className="edit-btn"
                      onClick={() => onEdit(employee)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => onDelete(employee)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} style={{ textAlign: "center" }}>
                No Employees Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
