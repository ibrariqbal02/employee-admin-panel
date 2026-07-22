import { useState } from "react";
import useEmployees from "../../hook/useEmployees";
import EmployeeTable from "../../organsims/EmployeeTable";
import SearchBar from "../../molecules/SearchBar";
import Pagination from "../../atom/Pagination";
import Modal from "../../molecules/Modal";
import EmployeeForm from "../../organsims/EmployeeForm";
import type { Employee } from "../../types/employee";
import useDeleteEmployee from "../../hook/useDeleteEmployee";
import "./Employees.css";

const Employees = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );

  const [mode, setMode] = useState<"create" | "edit">("create");

  const { data, isLoading, isError, error } = useEmployees(
    currentPage,
    5,
    search
  );
  const { mutate: deleteEmployee } = useDeleteEmployee();

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return (
      <h2>{error instanceof Error ? error.message : "Something went wrong"}</h2>
    );
  }

  const handleCreate = () => {
    setMode("create");
    setSelectedEmployee(null);
    setIsModalOpen(true);
  };

  const handleEdit = (employee: Employee) => {
    setMode("edit");
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
  };
  const handleDelete = (employee: Employee) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${employee.name}?`
    );

    if (!confirmDelete) return;

    deleteEmployee(employee._id);
  };

  return (
    <div className="employee-page">
      <div className="employee-header">
        <h1>Employee Admin Panel</h1>

        <button className="add-btn" onClick={handleCreate}>
          Add Employee
        </button>
      </div>

      <SearchBar
        search={search}
        setSearch={setSearch}
        setCurrentPage={setCurrentPage}
      />

      <p className="employee-count">Total Employees: {data?.totalEmployees}</p>

      <EmployeeTable
        employees={data?.data ?? []}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={data?.totalPages ?? 1}
        onPageChange={setCurrentPage}
      />

      <Modal
        isOpen={isModalOpen}
        title={mode === "create" ? "Create Employee" : "Update Employee"}
        onClose={handleClose}
      >
        <EmployeeForm
          mode={mode}
          employee={selectedEmployee ?? undefined}
          onSuccess={handleClose}
        />
      </Modal>
    </div>
  );
};

export default Employees;
