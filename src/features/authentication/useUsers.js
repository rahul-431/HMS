import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../services/apiAuth";

export default function useUsers() {
  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
  console.log(users);
  return { users, isLoading, error };
}
