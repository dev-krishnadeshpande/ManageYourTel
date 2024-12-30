import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCabin } from "../../services/apiCabins";

export function useDeleteCabin() {
  const queryClient = useQueryClient();
  // Mutations
  const { mutate: deleteCabinMutate } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      toast.success("Cabin deleted successfully!");
    },
    onError: () => {
      toast.error("Coudn't delete the cabin with given id");
    },
  });

  return deleteCabinMutate;
}

