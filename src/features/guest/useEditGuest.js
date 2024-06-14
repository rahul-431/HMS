import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { editGuestApi } from "../../services/apiGuest";

export default function useEditGuest() {
  const queryClient = useQueryClient();
  const { mutate: editGuest, isLoading: isEditing } = useMutation({
    mutationFn: editGuestApi,
    onSuccess: () => {
      toast.success("Guest edited successfully");
      queryClient.invalidateQueries({ queryKey: ["guests"] });
      queryClient.invalidateQueries({ queryKey: ["guest"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { editGuest, isEditing };
}
