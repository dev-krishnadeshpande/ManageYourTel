import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
import LoadingSpinner from "../../ui/LoadingSpinner";
import CabinTable from "./CabinTable";
import AddCabin from "./AddCabin";
import Filter from "../../ui/Filter";
import "./cabin.css";
import { useSearchParams } from "react-router-dom";

export default function Cabin() {
  const [searchParams] = useSearchParams();

  // Queries
  const { data: cabins, isLoading } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  const filterOptions = ["All", "No discount", "With discount"];
  const discountOption = searchParams.get("discount") || "all";
  let filteredCabins = [];

  if (discountOption === "all") {
    filteredCabins = cabins && Object.values(cabins);
  } else if (discountOption === "no-discount") {
    filteredCabins =
      cabins && Object.values(cabins).filter((cabin) => cabin.discount === 0);
  } else {
    filteredCabins =
      cabins && Object.values(cabins).filter((cabin) => cabin.discount > 0);
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <div className="cabin-content-header">
        <h2>All Rooms</h2>
        <Filter optionsList={filterOptions} />
      </div>
      <CabinTable cabins={filteredCabins} />
      <AddCabin />
    </>
  );
}
