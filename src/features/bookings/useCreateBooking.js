import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addBooking } from "../../services/apiBookings";

export default function useCreateBooking() {
  const queryClient = useQueryClient();
  const { mutate: createBooking, isLoading: isCreating } = useMutation({
    mutationFn: addBooking,
    onSuccess: () => {
      toast.success("Succesfully added new booking");
      queryClient.invalidateQueries({ queryKey: ["guests"] });
    },
    onError: () => {
      toast.error("Failed to add new booking");
    },
  });
  return { isCreating, createBooking };
}
