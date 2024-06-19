import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { checkoutApi } from "../../services/apiBookings";

export function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: ({ bookingId, roomId }) =>
      checkoutApi(bookingId, {
        _roomId: roomId,
        status: "checked-out",
      }),
    onSuccess: () => {
      toast.success(`Booking # checked Out successfully`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => {
      toast.error("Error while check out");
    },
  });
  return { checkout, isCheckingOut };
}
