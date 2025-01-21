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
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";
import ItemTag from "../../ui/ItemTag";

const BookingTableRow = ({ row }) => {
  const {
    id: bookingId,
    cabinName,
    fullName,
    email,
    startDate,
    endDate,
    status,
    totalPrice,
    numNights,
  } = row;

  const navigate = useNavigate();
  const { checkout, isCheckingOut } = useCheckout();
  const { deleteBooking, isDeleting } = useDeleteBooking();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <TableRow
        key={bookingId}
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
          <ItemTag type={statusToTagName[status]}>{status}</ItemTag>
        </TableCell>
        <TableCell
          align="center"
          sx={{ fontSize: "1.3rem", textAlign: "center" }}
        >
          {formatCurrency(totalPrice)}
        </TableCell>
        <TableCell sx={{ fontSize: "1.3rem", textAlign: "start" }}>
          <CustomTooltip title="See details" placement="top-end">
            <IconButton onClick={() => navigate(`/bookings/${bookingId}`)}>
              <HiEye />
            </IconButton>
          </CustomTooltip>
          {status === "unconfirmed" && (
            <CustomTooltip title="Check in" placement="top-end">
              <IconButton onClick={() => navigate(`/checkin/${bookingId}`)}>
                <HiArrowDownOnSquare />
              </IconButton>
            </CustomTooltip>
          )}
          {status === "checked-in" && (
            <CustomTooltip title="Check out" placement="top-end">
              <IconButton
                disabled={isCheckingOut}
                onClick={() => checkout(bookingId)}
              >
                <HiArrowUpOnSquare />
              </IconButton>
            </CustomTooltip>
          )}
          <CustomTooltip title="Delete booking" placement="top-end">
            <IconButton
              disabled={isDeleting}
              onClick={() => deleteBooking(bookingId)}
            >
              <HiTrash />
            </IconButton>
          </CustomTooltip>
        </TableCell>
      </TableRow>
    </>
  );
};

export default BookingTableRow;
