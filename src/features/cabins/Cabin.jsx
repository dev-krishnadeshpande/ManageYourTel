import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
import LoadingSpinner from "../../ui/LoadingSpinner";
import CabinTable from "./CabinTable";

export default function Cabin() {
  // Queries
  const { data: cabins, isLoading } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <CabinTable cabins={cabins} />
    </>
  );
}
