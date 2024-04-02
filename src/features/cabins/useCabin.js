import { useQuery } from "@tanstack/react-query";
import { getRooms } from "../../services/apiRooms";

export default function useCabin() {
  const {
    data: cabins,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cabin"],
    queryFn: getRooms,
  });
  return { cabins, isLoading, error };
}
