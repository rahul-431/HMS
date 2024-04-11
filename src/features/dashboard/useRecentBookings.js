import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBookingsAfterDate } from "../../services/apiBookings";
export default function useRecentBooking() {
  const [searchParams] = useSearchParams();
  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));
  const queryDate = subDays(new Date(), numDays).toISOString();
  const { data: recentBookings, isLoading } = useQuery({
    queryKey: ["recentBookings", `last-${numDays}days`],
    queryFn: () => getBookingsAfterDate(queryDate),
  });
  return { recentBookings, isLoading };
}
