import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBookingsAfterDate } from "../../services/apiBookings";
export default function useRecentBooking() {
  const [searchParams] = useSearchParams();
  // const numDays = !searchParams.get("last") ? "all" : searchParams.get("last");

  // const queryDate =
  //   !isNaN(numDays) && numDays !== "all"
  //     ? subDays(new Date(), Number(numDays)).toISOString()
  //     : numDays;

  const numDaysParam = searchParams.get("last");
  const numDays =
    numDaysParam && !isNaN(numDaysParam) ? Number(numDaysParam) : "all";

  let queryDate = "all";
  console.log(numDays);
  if (numDays !== "all") {
    console.log("i am inside");
    try {
      queryDate = subDays(new Date(), numDays).toISOString();
    } catch (error) {
      console.error("Error calculating queryDate:", error);
    }
  }
  console.log(queryDate);
  const { data: recentBookings, isLoading } = useQuery({
    queryKey: ["recentBookings", `last-${numDays}days`],
    queryFn: () => getBookingsAfterDate(queryDate),
  });
  return { recentBookings, isLoading };
}
