import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { getEmployees } from "../../api/employee.axios";

const useEmployees = (page: number, limit: number, search: string) => {
  return useQuery({
    queryKey: ["employees", page, limit, search],
    queryFn: () => getEmployees(page, limit, search),
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  });
};

export default useEmployees;
