import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateExtraCharge } from "../../services/apiBookings";

export default function useOtherCharge() {
  const queryClient = useQueryClient();
  const { mutate: addExtraCharge, isLoading: isAdding } = useMutation({
    mutationFn: updateExtraCharge,
    onSuccess: () => {
      toast.success("Updated extra charge");
      queryClient.invalidateQueries({ queryKey: ["booking"] });
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (err) => {
      toast.error("Failed to update");
      console.log(err.message);
    },
  });
  return { addExtraCharge, isAdding };
}
