import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRoomType } from "../../services/apiRooms";
import toast from "react-hot-toast";

export default function useCreateRoomType() {
  const queryClient = useQueryClient();

  const { mutate: addRoomType, isLoading: isCreating } = useMutation({
    mutationFn: createRoomType,
    onSuccess: () => {
      toast.success("New room Type created successfully");
      queryClient.invalidateQueries({ queryKey: ["room_types"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { addRoomType, isCreating };
}
