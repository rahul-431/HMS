import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRoom } from "../../services/apiRooms";
import toast from "react-hot-toast";

export default function useCreateCabin() {
  const queryClient = useQueryClient();

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createRoom,
    onSuccess: () => {
      toast.success("New room created successfully");
      queryClient.invalidateQueries({ queryKey: ["cabin"] });
      //   reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { createCabin, isCreating };
}
