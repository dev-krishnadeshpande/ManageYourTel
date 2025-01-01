import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";

export function useAddCabin(reset = null, onCloseModal = null) {
  // Access the client
  const queryClient = useQueryClient();

  const { mutate: addCabinMutate, isLoading: isCreatingCabin } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      if (!reset && !onCloseModal) {
        toast.success("Cabin duplicated successfully!");
      }
      else {
        toast.success("Cabin created successfully!");
        reset();
        onCloseModal();
      }
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (error) => {
      toast.error(error.message);
      reset && reset();
      onCloseModal && onCloseModal();
    },
  });

  return { addCabinMutate, isCreatingCabin };
}

