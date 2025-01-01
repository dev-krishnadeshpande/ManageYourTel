import { Button, TableCell, TableRow } from "@mui/material";

import { useDeleteCabin } from "./useDeleteCabin";
import { useAddCabin } from "./useAddCabin";
import Modal from "../../ui/Modal";
import CreateEditCabinForm from "./CreateEditCabinForm";

const CabinTableRow = ({ row }) => {
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
          <Modal>
            <Modal.Open opens="edit-cabin-form">
              <Button>Edit</Button>
            </Modal.Open>
            <Modal.Window name="edit-cabin-form">
              <CreateEditCabinForm cabinToEdit={row} />
            </Modal.Window>
          </Modal>
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
    </>
  );
};

export default CabinTableRow;
