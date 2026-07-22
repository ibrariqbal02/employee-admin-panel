import { useQuery } from "@tanstack/react-query";
import { getEmployeeById } from "../../api/employee.axios";

const useEmployee = (id: string) => {
  return useQuery({
    queryKey: ["employee", id],
    queryFn: () => getEmployeeById(id),
    enabled: !!id,
  });
};

export default useEmployee;
