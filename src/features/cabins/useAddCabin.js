import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";

export function useAddCabin(reset, setShowAddCabin) {
  // Access the client
  const queryClient = useQueryClient();

  const { mutate: addCabinMutate, isLoading: isCreatingCabin } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      toast.success("Cabin created successfully!");
      reset();
      setShowAddCabin(false);
    },
    onError: (error) => {
      toast.error(error.message);
      reset();
      setShowAddCabin(false);
    },
  });

  return { addCabinMutate, isCreatingCabin };
}

