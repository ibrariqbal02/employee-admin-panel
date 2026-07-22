import { Link, useParams } from "react-router-dom";
import useEmployee from "../../hook/useEmployee";

import "./EmployeeDetails.css";
const EmployeeDetails = () => {
  const { id } = useParams();

  const { data, isLoading, isError, error } = useEmployee(id ?? "");

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return (
      <h2>{error instanceof Error ? error.message : "Something went wrong"}</h2>
    );
  }

  const employee = data?.data;

  return (
    <div className="employee-details-page">
      <div className="employee-card">
        <h1>Employee Details</h1>

        <div className="detail-item">
          <span className="detail-label">Name</span>
          <span className="detail-value">{employee?.name}</span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Email</span>
          <span className="detail-value">{employee?.email}</span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Department</span>
          <span className="detail-value">{employee?.department}</span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Designation</span>
          <span className="detail-value">{employee?.designation}</span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Salary</span>
          <span className="detail-value">${employee?.salary}</span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Age</span>
          <span className="detail-value">{employee?.age}</span>
        </div>

        <Link className="back-btn" to="/">
          ← Back to Employees
        </Link>
      </div>
    </div>
  );
};

export default EmployeeDetails;
