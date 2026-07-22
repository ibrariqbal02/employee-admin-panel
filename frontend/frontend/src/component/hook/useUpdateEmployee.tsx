import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateEmployee } from "../../api/employee.axios";
import type { EmployeeFormData } from "../types/employee";

interface UpdateEmployeeParams {
  id: string;
  employee: EmployeeFormData;
}

const useUpdateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, employee }: UpdateEmployeeParams) =>
      updateEmployee(id, employee),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["employees"],
      });

      queryClient.invalidateQueries({
        queryKey: ["employee"],
      });
    },
  });
};

export default useUpdateEmployee;
