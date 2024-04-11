import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";
export default function useTodayActivity() {
  const {
    data: todayActivity,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["today-activity"],
    queryFn: getStaysTodayActivity,
  });
  if (error) throw new Error(error.message);
  return { todayActivity, isLoading };
}
