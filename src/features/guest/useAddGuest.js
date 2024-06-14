import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addGuest } from "../../services/apiGuest";
import toast from "react-hot-toast";

export default function useAddGuest() {
  const queryClient = useQueryClient();
  const { mutate: createGuest, isLoading: isCreating } = useMutation({
    mutationFn: addGuest,
    onSuccess: () => {
      toast.success("New guest added successfully");
      queryClient.invalidateQueries({ queryKey: ["guests"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { createGuest, isCreating };
}
