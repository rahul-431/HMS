import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getGuestBooking } from "../../services/apiGuest";

export default function useGuestBooking() {
  const { id } = useParams();
  console.log(id);
  const {
    data: bookings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["booking", id],
    queryFn: () => getGuestBooking(id),
    retry: false,
  });
  return { bookings, isLoading, error };
}
