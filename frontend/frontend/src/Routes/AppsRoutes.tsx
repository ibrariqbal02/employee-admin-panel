import { Routes, Route } from "react-router-dom";
import Employees from "../component/pages/Employees";
import EmployeeDetails from "../component/pages/Employees/EmployeeDetails";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Employees />} />
      <Route path="/employees/:id" element={<EmployeeDetails/>}/>
    </Routes>
  );
};

export default AppRoutes;