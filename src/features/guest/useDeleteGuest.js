import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteGuestApi } from "../../services/apiGuest";

export default function useDeleteGuest() {
  const queryClient = useQueryClient();
  const { mutate: deleteGuest, isLoading: isDeleting } = useMutation({
    mutationFn: deleteGuestApi,
    onSuccess: () => {
      toast.success("Guest Deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["guests"],
      });
    },
    onError: (error) => {
      toast.error("Failed to delete. Please try again");
      console.log(error.message);
    },
  });
  return { deleteGuest, isDeleting };
}
