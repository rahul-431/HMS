import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signUp } from "../../services/apiAuth";
import toast from "react-hot-toast";
export default function useSignup() {
  const queryClient = useQueryClient();
  const { mutate: signup, isLoading: isSigningUp } = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      toast.success("successfully created new user");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err) => {
      toast.error(err);
    },
  });
  return { signup, isSigningUp };
}
