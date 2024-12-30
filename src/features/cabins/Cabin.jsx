import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
import LoadingSpinner from "../../ui/LoadingSpinner";
import CabinTable from "./CabinTable";
import AddCabin from "./AddCabin";
import { Button } from "@mui/material";
import { useState } from "react";

export default function Cabin() {
  const [showAddCabin, setShowAddCabin] = useState(false);
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
      <CabinTable
        cabins={cabins}
        showAddCabin={showAddCabin}
        setShowAddCabin={setShowAddCabin}
      />
      <Button type="primary" onClick={() => setShowAddCabin(true)}>
        Add Cabin
      </Button>
      {showAddCabin && <AddCabin setShowAddCabin={setShowAddCabin} />}
    </>
  );
}
