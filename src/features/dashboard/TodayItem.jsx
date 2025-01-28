import { Link } from "react-router-dom";
import Button from "../../ui/Button";
import ItemTag from "../../ui/ItemTag";
import CheckOut from "../check-in-out/Checkout";
import "./todayItem.css";

const TodayItem = ({ activity }) => {
  const { id, status, guests, numNights } = activity;

  return (
    <li className="today-item">
      {status === "unconfirmed" && <ItemTag type="green">Arriving</ItemTag>}
      {status === "checked-in" && <ItemTag type="blue">Departing</ItemTag>}
      <div style={{ fontWeight: 500 }}>{guests.fullName}</div>
      <div>{numNights} nights </div>

      {status === "unconfirmed" && (
        <Button size="small" variation="primary">
          <Link
            to={`/checkin/${id}`}
            style={{ textDecoration: "none", borderTop: "none" }}
          >
            Check in
          </Link>
        </Button>
      )}
      {status === "checked-in" && <CheckOut bookingId={id} />}
    </li>
  );
};

export default TodayItem;
