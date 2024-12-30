import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";

export function useEditCabin(reset, setShowAddCabin) {
  // Access the client
  const queryClient = useQueryClient();

  const { mutate: editCabinMutate, isLoading: isEditingCabin } = useMutation({
    mutationFn: ({ editedCabinData, id }) =>
      createEditCabin(editedCabinData, id),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      toast.success("Cabin updated successfully!");
      reset();
      setShowAddCabin(false);
    },
    onError: (error) => {
      toast.error(error.message);
      reset();
      setShowAddCabin(false);
    },
  });

  return { editCabinMutate, isEditingCabin };
}

