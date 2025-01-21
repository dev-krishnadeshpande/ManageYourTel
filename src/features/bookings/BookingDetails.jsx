import "./bookingDetails.css";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import LoadingSpinner from "../../ui/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { HiArrowUpOnSquare } from "react-icons/hi2";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";
import ItemTag from "../../ui/ItemTag";
import BookingData from "./BookingData";
import Button from "../../ui/Button";

const BookingDetails = () => {
  const { booking, isLoading } = useBooking();
  const { checkout, isCheckingOut } = useCheckout();
  const { deleteBooking, isDeleting } = useDeleteBooking();

  const moveBack = useMoveBack();
  const navigate = useNavigate();

  if (isLoading) return <LoadingSpinner />;
  if (!booking) return <p>No booking could be found.</p>;

  const { status, id: bookingId } = booking;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  return (
    <>
      <div className="booking-details-header-container">
        <header className="booking-details-header">
          <h1>Booking #{bookingId}</h1>
          <ItemTag type={statusToTagName[status]}>
            {status.replace("-", " ")}
          </ItemTag>
        </header>
        <button className="back-btn" onClick={moveBack}>
          &larr; Back
        </button>
      </div>
      <BookingData booking={booking} />

      <div className="booking-actions">
        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            Check in
          </Button>
        )}

        {status === "checked-in" && (
          <Button
            icon={<HiArrowUpOnSquare />}
            onClick={() => checkout(bookingId)}
            disabled={isCheckingOut}
          >
            Check out
          </Button>
        )}

        <Button
          variation="danger"
          onClick={deleteBooking}
          disabled={isDeleting}
        >
          Delete booking
        </Button>
      </div>
    </>
  );
};

export default BookingDetails;
