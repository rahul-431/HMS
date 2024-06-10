import { useQuery } from "@tanstack/react-query";
import { getRoomTypes } from "../../services/apiRooms";

export default function useRoomType() {
  const {
    data: roomTypes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["room_types"],
    queryFn: getRoomTypes,
  });
  return { roomTypes, isLoading, error };
}
