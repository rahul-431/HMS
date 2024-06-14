import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getGuest } from "../../services/apiGuest";

export default function useGuest() {
  const { id } = useParams();
  const {
    data: guest,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["guest", id],
    queryFn: () => getGuest(id),
  });
  return { guest, isLoading, error };
}
