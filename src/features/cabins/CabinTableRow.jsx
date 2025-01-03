import { TableCell, TableRow } from "@mui/material";

import { useDeleteCabin } from "./useDeleteCabin";
import { useAddCabin } from "./useAddCabin";
import Modal from "../../ui/Modal";
import CreateEditCabinForm from "./CreateEditCabinForm";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import "./cabin-table-row.css";

const CabinTableRow = ({ row }) => {
  const deleteCabinMutate = useDeleteCabin();
  const { addCabinMutate } = useAddCabin();

  return (
    <>
      <TableRow
        key={row.name}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell align="center" className="cabin-image-container">
          <img src={row.image} alt="cabin-image" className="cabin-image" />
        </TableCell>
        <TableCell
          align="center"
          sx={{ fontSize: "1.2rem", textAlign: "center" }}
        >
          {row.name}
        </TableCell>
        <TableCell
          align="center"
          sx={{ fontSize: "1.2rem", textAlign: "center" }}
        >
          {`Fits upto to ${row.maxCapacity} guests`}
        </TableCell>
        <TableCell
          align="center"
          sx={{ fontSize: "1.2rem", textAlign: "center" }}
        >
          {row.regularPrice}
        </TableCell>
        <TableCell
          align="center"
          sx={{ fontSize: "1.2rem", textAlign: "center" }}
        >
          {row.discount === 0 ? <span>-</span> : row.discount}
        </TableCell>
        <TableCell
          align="center"
          sx={{ fontSize: "1.2rem", textAlign: "center" }}
        >
          <button
            onClick={() =>
              addCabinMutate({
                ...row,
                name: `Copy of ${row.name}`,
                id: row.id * 100,
              })
            }
            className="action-btn"
          >
            <HiSquare2Stack />
          </button>
          <Modal>
            <Modal.Open opens="edit-cabin-form">
              <button className="action-btn">
                <HiPencil />
              </button>
            </Modal.Open>
            <Modal.Window name="edit-cabin-form">
              <CreateEditCabinForm cabinToEdit={row} />
            </Modal.Window>
          </Modal>
          <button
            onClick={() => {
              deleteCabinMutate(row.id);
            }}
            className="action-btn"
          >
            <HiTrash />
          </button>
        </TableCell>
      </TableRow>
    </>
  );
};

export default CabinTableRow;
