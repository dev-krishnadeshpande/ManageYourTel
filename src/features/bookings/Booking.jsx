import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import LoadingSpinner from "../../ui/LoadingSpinner";
import BookingTable from "./BookingTable";

const Booking = () => {
  // Queries
  const { data: bookings, isLoading } = useQuery({
    queryKey: ["bookings"],
    queryFn: getBookings,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <BookingTable bookings={bookings} />
    </>
  );
};

export default Booking;
