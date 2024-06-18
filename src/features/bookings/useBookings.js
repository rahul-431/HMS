import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export default function useBookings() {
  const [searchParam] = useSearchParams();
  const queryClient = useQueryClient();
  //Server side filtering
  const filterValue = searchParam.get("status");
  const filter = !filterValue || filterValue === "all" ? "all" : filterValue;

  //server side searching
  const searchValue = searchParam.get("search");
  const search = !searchValue || searchValue === "" ? "" : searchValue;

  //server side pagination
  const page = !searchParam.get("page") ? 1 : Number(searchParam.get("page"));

  //QUERY
  const {
    data: { bookings, count } = {},
    // data,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, page, search],
    queryFn: () => getBookings({ filter, page, search }),
  });

  //PRE-Fetching
  //fething the data of the next page or previous page before clicking to the buttons
  const pageCount = Math.ceil(count * PAGE_SIZE);
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, page + 1],
      queryFn: () => getBookings({ filter, page: page + 1 }),
    });
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, page - 1],
      queryFn: () => getBookings({ filter, page: page - 1 }),
    });

  return { bookings, count, isLoading, error };
}
