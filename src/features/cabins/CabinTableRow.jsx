import { useState } from "react";
import { Button, TableCell, TableRow } from "@mui/material";

import AddCabin from "./AddCabin";
import { useDeleteCabin } from "./useDeleteCabin";
import { useAddCabin } from "./useAddCabin";

const CabinTableRow = ({ row }) => {
  const [showAddCabin, setShowAddCabin] = useState(false);

  const deleteCabinMutate = useDeleteCabin();
  const { addCabinMutate } = useAddCabin();

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
          <Button
            onClick={() =>
              addCabinMutate({
                ...row,
                name: `Copy of ${row.name}`,
                id: row.id * 100,
              })
            }
            type="small"
          >
            Duplicate
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
