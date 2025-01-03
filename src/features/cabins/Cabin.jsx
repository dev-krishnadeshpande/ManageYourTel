import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
import LoadingSpinner from "../../ui/LoadingSpinner";
import CabinTable from "./CabinTable";
import AddCabin from "./AddCabin";
import Filter from "../../ui/Filter";
import "./cabin.css";
import { useSearchParams } from "react-router-dom";
import SortBy from "../../ui/SortBy";

export default function Cabin() {
  const [searchParams] = useSearchParams();

  // Queries
  const { data: cabins, isLoading } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  //1. Filter
  const filterOptions = ["All", "No discount", "With discount"];
  const filterField = "discount";
  const selectedFilterOption = searchParams.get(filterField) || "all";
  let filteredCabins = [];

  if (selectedFilterOption === "all") {
    filteredCabins = cabins && Object.values(cabins);
  } else if (selectedFilterOption === "no-discount") {
    filteredCabins =
      cabins && Object.values(cabins).filter((cabin) => cabin.discount === 0);
  } else {
    filteredCabins =
      cabins && Object.values(cabins).filter((cabin) => cabin.discount > 0);
  }

  //2. Sort
  const sortOptions = [
    { value: "", label: "None" },
    { value: "name-asc", label: "Sort by name (A-Z)" },
    { value: "name-desc", label: "Sort by name (Z-A)" },
    { value: "regularPrice-asc", label: "Sort by price (low first)" },
    { value: "regularPrice-desc", label: "Sort by price (high first)" },
    { value: "maxCapacity-asc", label: "Sort by capacity (low first)" },
    { value: "maxCapacity-desc", label: "Sort by capacity (high first)" },
  ];

  const sortInput = { entityToSort: "Sort Rooms", sortOptions };
  const selectedSortOption = searchParams.get("sortBy") || "";

  const [sortByEntity, sortOrder] =
    selectedSortOption && selectedSortOption.split("-");
  const sortOrderModifier = sortOrder === "asc" ? 1 : -1;
  const sortedCabins = sortByEntity
    ? filteredCabins.sort(
        (a, b) => (a[sortByEntity] - b[sortByEntity]) * sortOrderModifier
      )
    : filteredCabins;

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <div className="cabin-content-header">
        <h2>All Rooms</h2>
        <div className="cabin-operations-container">
          <Filter filterField={filterField} filterOptions={filterOptions} />
          <SortBy {...sortInput} />
        </div>
      </div>
      <CabinTable cabins={sortedCabins} />
      <AddCabin />
    </>
  );
}
