import { useQuery } from "@tanstack/react-query";
import { searchGuest } from "../../services/apiGuest";
import { useSearchParams } from "react-router-dom";

export default function useSearchGuest() {
  const [searchParam] = useSearchParams();
  const searchValue = searchParam.get("search");
  const search = !searchValue || searchValue === "" ? "" : searchValue;
  const {
    data: searchedGuest,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["searchedGuest", search],
    queryFn: () => searchGuest(search),
    retry: false,
  });
  return { searchedGuest, isLoading, error };
}
