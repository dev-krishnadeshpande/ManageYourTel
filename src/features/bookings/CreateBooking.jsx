import { useState } from "react";
import Button from "../../ui/Button";
import CreateGuestForm from "../guests/CreateGuestForm";
import CreateBookingForm from "./CreateBookingForm";
import "./createBooking.css";

const CreateBooking = ({ cabinId }) => {
  const [showCreateGuestForm, setShowCreateGuestForm] = useState(true);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [disableCreateBookingButton, setDisableCreateBookingButton] =
    useState(true);
  const [guestId, setGuestId] = useState();

  function createBookingHandler() {
    setShowBookingForm(true);
  }

  function onGuestCreate(id) {
    setShowCreateGuestForm(false);
    setDisableCreateBookingButton(false);
    setGuestId(id);
  }

  return (
    <div className="create-booking-container">
      <div className="create-booking-btn-container">
        {showCreateGuestForm && (
          <>
            <p>Add guest to create booking!</p>
            <CreateGuestForm onSuccessHandler={onGuestCreate} />
          </>
        )}

        {!showBookingForm && (
          <Button
            disabled={disableCreateBookingButton}
            onClick={createBookingHandler}
          >
            Create booking
          </Button>
        )}
        {showBookingForm && (
          <CreateBookingForm cabinId={cabinId} guestId={guestId} />
        )}
      </div>
    </div>
  );
};

export default CreateBooking;
