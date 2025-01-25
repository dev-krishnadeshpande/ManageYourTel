import LoadingSpinner from "../../ui/LoadingSpinner";
import BookingTable from "./BookingTable";
import TableHeader from "../../ui/TableHeader";
import { filterBookingOptions, sortBookingOptions } from "../../utils/configs";
import useGetBookings from "./useGetBookings";
import "./booking.css";
import TablePaginationComponent from "../../ui/TablePaginationComponent";

const Booking = () => {
  //1. Filter
  const filterField = "status";

  //2. Sort
  const sortInput = {
    entityToSort: "Sort Bookings",
    sortOptions: sortBookingOptions,
  };

  const {
    bookings,
    count: bookingsCount,
    isLoading,
    selectedFilterOption,
    selectedSortOption,
  } = useGetBookings(filterField);

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
      <div className="pagination-control">
        <TablePaginationComponent totalRowCount={bookingsCount} />
      </div>
    </>
  );
};

export default Booking;
