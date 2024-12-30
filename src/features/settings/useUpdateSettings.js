import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting } from "../../services/apiSettings";

export function useUpdateSettings() {
  // Access the client
  const queryClient = useQueryClient();

  const { mutate: updateSettingsMutate, isLoading: processingSettingUpdates } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      toast.success("Settings updated successfully!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { updateSettingsMutate, processingSettingUpdates };
}