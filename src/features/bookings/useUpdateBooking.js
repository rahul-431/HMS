import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateBookingApi } from "../../services/apiBookings";

export default function useUpdateBooking() {
  const queryClient = useQueryClient();
  const { mutate: updateBookingInfo, isLoading: isUpdating } = useMutation({
    mutationFn: updateBookingApi,
    onSuccess: () => {
      toast.success("Booking updated successfully");
      queryClient.invalidateQueries({ active: true });
    },
    onError: (err) => {
      toast.error("Failed to update booking info");
      console.log(err.message);
    },
  });
  return { updateBookingInfo, isUpdating };
}
