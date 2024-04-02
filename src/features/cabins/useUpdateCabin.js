import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRoom } from "../../services/apiRooms";
import toast from "react-hot-toast";

export default function useUpdateCabin() {
  const queryClient = useQueryClient();
  const { mutate: updateCabin, isLoading: isUpdating } = useMutation({
    mutationFn: updateRoom,
    onSuccess: () => {
      toast.success("Room data updated successfully");
      queryClient.invalidateQueries({ queryKey: ["cabin"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { isUpdating, updateCabin };
}
