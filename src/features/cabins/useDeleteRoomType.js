import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRoomType } from "../../services/apiRooms";
import toast from "react-hot-toast";

export default function useDeleteRoomType() {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteRoomType1 } = useMutation({
    mutationFn: deleteRoomType,
    onSuccess: () => {
      toast.success("Room Deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["room_types"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isDeleting, deleteRoomType1 };
}
