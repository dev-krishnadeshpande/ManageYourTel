import { useMutation } from "@tanstack/react-query";
import { signup as apiSignup } from "../../services/apiAuthentication";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isPending } = useMutation({
    mutationFn: apiSignup, onSuccess: () => {
      toast.success('Signup is successful!')
    }
  });

  return { signup, isPending }
}