import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBookings } from "../../services/apiBookings";

export default function useGetBookings(filterField) {
  const [searchParams] = useSearchParams();

  const selectedFilterOption = searchParams.get(filterField) || "all";

  const selectedSortOption = searchParams.get("sortBy") || "";
  const [sortBy, sortOrder] = selectedSortOption && selectedSortOption.split("-");

  // PAGINATION
  const selectedPage = !searchParams.get("page") ? 0 : Number(searchParams.get("page"));

  const { data: { data: bookings, count } = {}, isLoading } = useQuery({
    queryKey: ["bookings", selectedFilterOption, selectedSortOption, selectedPage],
    queryFn: () => getBookings(selectedFilterOption, sortBy, sortOrder, selectedPage),
  });

  return { bookings, count, isLoading, selectedFilterOption, selectedSortOption, selectedPage };
}