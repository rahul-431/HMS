import { useMutation } from "@tanstack/react-query";
import { signUp } from "../../services/apiAuth";
import toast from "react-hot-toast";
export default function useSignup() {
  const { mutate: signup, isLoading: isSigningUp } = useMutation({
    mutationFn: signUp,
    onSuccess: () => toast.success("successfully created new user"),
    onError: (err) => {
      toast.error(err);
    },
  });
  return { signup, isSigningUp };
}
