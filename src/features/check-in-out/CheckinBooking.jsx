import { useEffect, useState } from "react";
import BookingData from "../bookings/BookingData";
import { useBooking } from "../bookings/useBooking";
import { useSettings } from "../settings/useSettings";
import "./checkin.css";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useCheckin } from "./useCheckin";
import LoadingSpinner from "../../ui/LoadingSpinner";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { formatCurrency } from "../../utils/helpers";
import Button from "../../ui/Button";

const CheckinBooking = () => {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  const moveBack = useMoveBack();
  const { checkin, isCheckingIn } = useCheckin();

  const { settings, isLoading: isLoadingSettings } = useSettings();
  const { booking, isLoading } = useBooking();

  useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking]);

  if (isLoading || isLoadingSettings) return <LoadingSpinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakfastPrice =
    settings?.breakfastPrice * numNights * numGuests;

  const breakfastLabel = `Want to add breakfast for ${formatCurrency(
    optionalBreakfastPrice
  )}?`;

  const breakfastAmount = !addBreakfast
    ? formatCurrency(totalPrice)
    : formatCurrency(totalPrice + optionalBreakfastPrice);

  const confirmPaidLabel = `I confirm that ${
    guests.fullName
  } has paid the total amount of ${breakfastAmount} (${formatCurrency(
    totalPrice
  )} + ${formatCurrency(optionalBreakfastPrice)}))`;

  function handleCheckin() {
    if (!confirmPaid) return;

    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    } else {
      checkin({ bookingId, breakfast: {} });
    }
  }

  return (
    <>
      <div className="checkin-header">
        <h3>Check in booking #{bookingId}</h3>
        <button className="back-btn" onClick={moveBack}>
          &larr; Back
        </button>
      </div>

      <BookingData booking={booking} />

      {!hasBreakfast && (
        <div className="checkbox-container">
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  color="success"
                  sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                  checked={addBreakfast}
                  onChange={() => {
                    setAddBreakfast((add) => !add);
                    setConfirmPaid(false);
                  }}
                  id="breakfast"
                />
              }
              label={breakfastLabel}
            />
          </FormGroup>
        </div>
      )}

      <div className="checkbox-container">
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                color="success"
                sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                checked={confirmPaid}
                onChange={() => setConfirmPaid((confirm) => !confirm)}
                disabled={confirmPaid || isCheckingIn}
                id="confirm"
              />
            }
            label={confirmPaidLabel}
          />
        </FormGroup>
      </div>

      <div className="checkin-actions">
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </div>
    </>
  );
};

export default CheckinBooking;
