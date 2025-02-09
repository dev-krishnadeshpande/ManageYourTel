import { useQuery } from "@tanstack/react-query";
import { getCabin } from "../../services/apiCabins";

export function useCabin(cabinId) {
  const {
    isLoading,
    data: cabin,
    error,
  } = useQuery({
    queryKey: ["cabin", cabinId],
    queryFn: () => getCabin(cabinId),
    retry: false,
  });

  return { isLoading, error, cabin };
}
