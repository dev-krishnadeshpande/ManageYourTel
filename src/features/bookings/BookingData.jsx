import "./bookingData.css";
import { format, isToday } from "date-fns";
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from "react-icons/hi2";

import { formatDistanceFromNow, formatCurrency } from "../../utils/helpers";
import DisplayData from "../../ui/DisplayData";

const BookingData = ({ booking }) => {
  const {
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    cabinPrice,
    extrasPrice,
    totalPrice,
    hasBreakfast,
    observations,
    isPaid,
    guests: { fullName: guestName, email, nationalID },
    cabins: { name: cabinName },
  } = booking;

  return (
    <section className="booking-data-container">
      <header className="booking-data-header">
        <div>
          <HiOutlineHomeModern />
          <p>
            {numNights} nights in Cabin <span>{cabinName}</span>
          </p>
        </div>

        <p>
          {format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
        </p>
      </header>
      <section className="booking-data-content">
        <div className="guest-details">
          <p>
            {guestName} {numGuests > 1 ? `+ ${numGuests - 1} guests` : ""}
          </p>
          <span>&bull;</span>
          <p>{email}</p>
          <span>&bull;</span>
          <p>National ID {nationalID}</p>
        </div>

        {observations && (
          <DisplayData
            icon={<HiOutlineChatBubbleBottomCenterText />}
            label="Observations"
          >
            {observations}
          </DisplayData>
        )}

        <DisplayData
          icon={<HiOutlineCheckCircle />}
          label="Breakfast included?"
        >
          {hasBreakfast ? "Yes" : "No"}
        </DisplayData>

        <div
          className={isPaid ? "pricing-details paid" : "pricing-details unpaid"}
        >
          <DisplayData icon={<HiOutlineCurrencyDollar />} label={`Total price`}>
            {formatCurrency(totalPrice)}

            {hasBreakfast &&
              ` (${formatCurrency(cabinPrice)} cabin + ${formatCurrency(
                extrasPrice
              )} breakfast)`}
          </DisplayData>

          <p>{isPaid ? "Paid" : "Will pay at property"}</p>
        </div>
      </section>

      <footer className="booking-data-footer">
        <p>Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}</p>
      </footer>
    </section>
  );
};

export default BookingData;
