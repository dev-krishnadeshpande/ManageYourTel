import { login as loginApi } from "../../services/apiAuthentication";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      toast.success("Login successful!");
      queryClient.setQueryData(["user"], user.user)
      navigate("/dashboard");
    },
    onError: () => {
      toast.error("Email or password are incorrect");
    },
  });

  return { login, isLoading };
}