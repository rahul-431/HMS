import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export default function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isLoading: isLoggingIn, mutate: loginUser } = useMutation({
    mutationFn: login,
    onError: (err) => {
      toast.error("Provided email or password is incorrect");
      console.log(err);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data?.user);
      localStorage.setItem("accessToken", data?.token?.accessToken);
      localStorage.setItem("refreshToken", data?.token?.refreshToken);
      navigate("/dashboard", { replace: true });
    },
  });
  return { isLoggingIn, loginUser };
}
