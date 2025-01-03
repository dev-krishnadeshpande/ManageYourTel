import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBookings } from "../../services/apiBookings";

export default function useGetBookings(filterField) {
  const [searchParams] = useSearchParams();

  const selectedFilterOption = searchParams.get(filterField) || "all";

  const selectedSortOption = searchParams.get("sortBy") || "";
  const [sortBy, sortOrder] = selectedSortOption && selectedSortOption.split("-");


  const { data: bookings = {}, isLoading } = useQuery({
    queryKey: ["bookings", selectedFilterOption, selectedSortOption],
    queryFn: () => getBookings(selectedFilterOption, sortBy, sortOrder),
  });

  return { bookings, isLoading, selectedFilterOption, selectedSortOption };
}