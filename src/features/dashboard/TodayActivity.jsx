import { useTodayActivity } from "./useTodayActivity";
import "./todayActivity.css";
import LoadingSpinner from "../../ui/LoadingSpinner";
import TodayItem from "./TodayItem";

const TodayActivity = () => {
  const { activities, isLoading } = useTodayActivity();

  return (
    <div className="today-activity-container">
      <h3>Today</h3>

      {!isLoading ? (
        activities?.length > 0 ? (
          <ul className="today-list">
            {activities.map((activity) => (
              <TodayItem activity={activity} key={activity.id} />
            ))}
          </ul>
        ) : (
          <p className="no-activity">No activity today...</p>
        )
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};

export default TodayActivity;
