import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import toast from "react-hot-toast";

import "./CabinTable.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";

function createData({ id, name, maxCapacity, regularPrice, discount, image }) {
  return { id, name, maxCapacity, regularPrice, discount, image };
}

export default function CabinTable(cabins) {
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

  const cabinsData = Object.values(cabins)[0];

  const rows = cabinsData.map((cabin) => createData(cabin));
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="right">Cabin</TableCell>
            <TableCell align="right">Capacity</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Discount</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="right" className="cabin-image-container">
                <img
                  src={row.image}
                  alt="cabin-image"
                  className="cabin-image"
                />
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
