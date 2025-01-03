import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
import LoadingSpinner from "../../ui/LoadingSpinner";
import CabinTable from "./CabinTable";
import AddCabin from "./AddCabin";
import "./cabin.css";
import useFilterCabins from "./useFilterCabins";
import TableHeader from "../../ui/TableHeader";
import useSortCabins from "./useSortCabins";
import { filterCabinOptions, sortCabinOptions } from "../../utils/configs";

export default function Cabin() {
  // Query
  const { data: cabins = {}, isLoading } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  //1. Filter
  const filterField = "discount";
  const filteredCabins = useFilterCabins(Object.values(cabins), filterField);

  //2. Sort
  const sortInput = {
    entityToSort: "Sort Rooms",
    sortOptions: sortCabinOptions,
  };
  const sortedCabins = useSortCabins(filteredCabins);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <TableHeader
        tableEntity="Rooms"
        filterField={filterField}
        filterOptions={filterCabinOptions}
        sortInput={sortInput}
      />
      <CabinTable cabins={sortedCabins} />
      <AddCabin />
    </>
  );
}
