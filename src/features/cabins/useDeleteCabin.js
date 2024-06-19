import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRoom } from "../../services/apiRooms";
import toast from "react-hot-toast";

export default function useDeleteCabin() {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteRoom,
    onSuccess: () => {
      toast.success("Room Deleted successfully");
      queryClient.invalidateQueries({
        active: true,
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isDeleting, deleteCabin };
}
