import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBookingsAfterDate } from "../../services/apiBookings";
export default function useRecentStays() {
  const [searchParams] = useSearchParams();
  const numDaysParam = searchParams.get("last");
  const numDays =
    numDaysParam && !isNaN(numDaysParam) ? Number(numDaysParam) : "all";

  let queryDate = "all";
  if (numDays !== "all") {
    console.log("i am inside");
    try {
      queryDate = subDays(new Date(), numDays).toISOString();
    } catch (error) {
      console.error("Error calculating queryDate:", error);
    }
  }
  console.log(queryDate);
  const { data: recentStays, isLoading } = useQuery({
    queryKey: ["recentStays", `last-${numDays}days`],
    queryFn: () => getBookingsAfterDate(queryDate),
  });

  const confirmedStays = recentStays?.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out"
  );
  const unConfirmedBooking = recentStays?.filter(
    (stay) => stay.status === "unconfirmed"
  );
  return { isLoading, confirmedStays, unConfirmedBooking, numDays };
}
