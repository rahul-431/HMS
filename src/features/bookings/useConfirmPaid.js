import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { confirmAllPayment } from "../../services/apiBookings";

export default function useConfirmPaid() {
  const queryClient = useQueryClient();
  const { mutate: confirmingPaid, isLoading: isConfirmingPaid } = useMutation({
    mutationFn: confirmAllPayment,
    onSuccess: () => {
      toast.success("Payment add successfull");
      queryClient.invalidateQueries({ active: true });
      //   queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (err) => {
      toast.error("Failed to confirm payment");
      console.log(err.message);
    },
  });
  return { confirmingPaid, isConfirmingPaid };
}
