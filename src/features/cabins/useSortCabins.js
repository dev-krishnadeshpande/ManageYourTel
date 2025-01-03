import { useSearchParams } from "react-router-dom";

export default function useSortCabins(filteredCabins) {
  const [searchParams] = useSearchParams();
  const selectedSortOption = searchParams.get("sortBy") || "";

  const [sortByEntity, sortOrder] =
    selectedSortOption && selectedSortOption.split("-");
  const sortOrderModifier = sortOrder === "asc" ? 1 : -1;
  const sortedCabins = sortByEntity
    ? filteredCabins.sort(
      (a, b) => (a[sortByEntity] - b[sortByEntity]) * sortOrderModifier
    )
    : filteredCabins;

  return sortedCabins;
}