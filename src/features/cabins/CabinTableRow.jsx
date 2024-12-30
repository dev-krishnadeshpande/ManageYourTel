/* eslint-disable react/prop-types */
import { Button, TableCell, TableRow } from "@mui/material";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import { useState } from "react";
import AddCabin from "./AddCabin";
import toast from "react-hot-toast";

const CabinTableRow = ({ row }) => {
  const [showAddCabin, setShowAddCabin] = useState(false);
  // Access the client
  const queryClient = useQueryClient();

  // Mutations
  const mutation = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      toast.success("Cabin deleted successfully!");
    },
    onError: () => {
      toast.error("Coudn't delete the cabin with given id");
    },
  });

  return (
    <>
      <TableRow
        key={row.name}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell align="right" className="cabin-image-container">
          <img src={row.image} alt="cabin-image" className="cabin-image" />
        </TableCell>
        <TableCell align="right">{row.name}</TableCell>
        <TableCell align="right">{row.maxCapacity}</TableCell>
        <TableCell align="right">{row.regularPrice}</TableCell>
        <TableCell align="right">{row.discount}</TableCell>
        <TableCell align="right">
          <Button
            onClick={() => {
              mutation.mutate(row.id);
            }}
            type="small"
          >
            Delete
          </Button>
          <Button
            onClick={() => {
              setShowAddCabin(true);
            }}
            type="small"
          >
            Edit
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          {showAddCabin && (
            <AddCabin cabinToEdit={row} setShowAddCabin={setShowAddCabin} />
          )}
        </TableCell>
      </TableRow>
    </>
  );
};

export default CabinTableRow;
