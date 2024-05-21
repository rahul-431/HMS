import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteUser } from "../../services/apiAuth";

export default function useDeleteUser() {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteSingleUser } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      toast.success("User Deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isDeleting, deleteSingleUser };
}
