import { useCabins } from "../cabins/useCabins";
import "./dashboard.css";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import LoadingSpinner from "../../ui/LoadingSpinner";
import GeneralStatistics from "./GeneralStatistics";
import TodayActivity from "./TodayActivity";
import DurationChart from "./DurationChart";
import SalesChart from "./SalesChart";

const Dashboard = () => {
  const { bookings, isLoading: isLoading1 } = useRecentBookings();
  const { confirmedStays, isLoading: isLoading2, numDays } = useRecentStays();
  const { cabins, isLoading: isLoading3 } = useCabins();

  if (isLoading1 || isLoading2 || isLoading3) return <LoadingSpinner />;
  return (
    <div className="dashboard-container">
      <GeneralStatistics
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />

      <TodayActivity />

      <DurationChart confirmedStays={confirmedStays} />

      <SalesChart bookings={bookings} numDays={numDays} />
    </div>
  );
};

export default Dashboard;
