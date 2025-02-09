import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createGuest } from "../../services/apiGuest";

export function useCreateGuest(onSuccessHandler) {
  const { mutate: createGuestMutate, isLoading: isCreatingGuest } = useMutation({
    mutationFn: createGuest,
    onSuccess: (data) => {
      toast.success("Guest created successfully!");
      onSuccessHandler(data[0].id);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { createGuestMutate, isCreatingGuest };
}

