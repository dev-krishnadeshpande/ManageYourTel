import { TableCell, TableRow } from "@mui/material";
import { format, isToday } from "date-fns";
import "./bookingTableRow.css";
import { formatDistanceFromNow, formatCurrency } from "../../utils/helpers";
import IconButton from "@mui/material/IconButton";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiTrash,
} from "react-icons/hi2";
import CustomTooltip from "../../ui/CustomTooltip";

const BookingTableRow = ({ row }) => {
  const {
    id,
    cabinName,
    fullName,
    email,
    startDate,
    endDate,
    status,
    totalPrice,
    numNights,
  } = row;

  return (
    <>
      <TableRow
        key={id}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell
          align="center"
          sx={{ fontSize: "1.3rem", textAlign: "center" }}
        >
          {cabinName}
        </TableCell>
        <TableCell
          align="center"
          sx={{ fontSize: "1.3rem", textAlign: "center" }}
        >
          <div className="custom-span-container">
            <span>{fullName}</span>
            <span>{email}</span>
          </div>
        </TableCell>
        <TableCell
          align="center"
          sx={{ fontSize: "1.3rem", textAlign: "center" }}
        >
          <div className="custom-span-container">
            <span>
              {isToday(new Date(startDate))
                ? "Today"
                : formatDistanceFromNow(startDate)}{" "}
              &rarr; {numNights} night stay
            </span>
            <span>
              {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
              {format(new Date(endDate), "MMM dd yyyy")}
            </span>
          </div>
        </TableCell>
        <TableCell
          align="center"
          sx={{ fontSize: "1.3rem", textAlign: "center" }}
        >
          {status}
        </TableCell>
        <TableCell
          align="center"
          sx={{ fontSize: "1.3rem", textAlign: "center" }}
        >
          {formatCurrency(totalPrice)}
        </TableCell>
        <TableCell
          align="center"
          sx={{ fontSize: "1.3rem", textAlign: "center" }}
        >
          <CustomTooltip title="See details" placement="top-end">
            <IconButton>
              <HiEye />
            </IconButton>
          </CustomTooltip>
          <CustomTooltip title="Check in" placement="top-end">
            <IconButton>
              <HiArrowDownOnSquare />
            </IconButton>
          </CustomTooltip>
          <CustomTooltip title="Check out" placement="top-end">
            <IconButton>
              <HiArrowUpOnSquare />
            </IconButton>
          </CustomTooltip>
          <CustomTooltip title="Delete booking" placement="top-end">
            <IconButton>
              <HiTrash />
            </IconButton>
          </CustomTooltip>
        </TableCell>
      </TableRow>
    </>
  );
};

export default BookingTableRow;
