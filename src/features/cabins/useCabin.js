import { useQuery } from "@tanstack/react-query";
import { getRooms } from "../../services/apiRooms";

export default function useCabin(isBooking) {
  const {
    data: cabins,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cabin", isBooking],
    queryFn: () => getRooms(isBooking),
  });
  return { cabins, isLoading, error };
}
