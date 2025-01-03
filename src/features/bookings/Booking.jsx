import LoadingSpinner from "../../ui/LoadingSpinner";
import BookingTable from "./BookingTable";
import TableHeader from "../../ui/TableHeader";
import { filterBookingOptions, sortBookingOptions } from "../../utils/configs";
import useGetBookings from "./useGetBookings";

const Booking = () => {
  //1. Filter
  const filterField = "status";

  //2. Sort
  const sortInput = {
    entityToSort: "Sort Bookings",
    sortOptions: sortBookingOptions,
  };

  const { bookings, isLoading, selectedFilterOption, selectedSortOption } =
    useGetBookings(filterField);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <TableHeader
        tableEntity="Bookings"
        filterField={filterField}
        filterOptions={filterBookingOptions}
        sortInput={sortInput}
        selectedFilterOption={selectedFilterOption}
        selectedSortOption={selectedSortOption}
      />
      <BookingTable bookings={bookings} />
    </>
  );
};

export default Booking;
