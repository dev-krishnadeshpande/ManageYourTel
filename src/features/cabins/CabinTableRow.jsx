/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button, TableCell, TableRow } from "@mui/material";

import AddCabin from "./AddCabin";
import { useDeleteCabin } from "./useDeleteCabin";

const CabinTableRow = ({ row }) => {
  const [showAddCabin, setShowAddCabin] = useState(false);

  const deleteCabinMutate = useDeleteCabin();

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
              deleteCabinMutate(row.id);
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
      {showAddCabin && (
        <TableRow>
          <TableCell>
            <AddCabin cabinToEdit={row} setShowAddCabin={setShowAddCabin} />
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default CabinTableRow;