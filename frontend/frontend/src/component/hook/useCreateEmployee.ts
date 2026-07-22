import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEmployee } from "../../api/employee.axios";

const useCreateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createEmployee,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["employees"],
      });
    },
  });
};

export default useCreateEmployee;
