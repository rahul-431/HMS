import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getGuests } from "../../services/apiGuest";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export default function useGuests() {
  const [searchParam] = useSearchParams();
  const queryClient = useQueryClient();

  //server side searching
  const searchValue = searchParam.get("search");
  const search = !searchValue || searchValue === "" ? "" : searchValue;

  //server side filtering
  const filterValue = searchParam.get("nationality");
  const filter = !filterValue || filterValue === "all" ? "all" : filterValue;

  //server side pagination
  const page = !searchParam.get("page") ? 1 : Number(searchParam.get("page"));
  const {
    data: { data: guests, count } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["guests", filter, page, search],
    queryFn: () => getGuests({ filter, page, search }),
  });

  //PRE-Fetching
  //fething the data of the next page or previous page before clicking to the buttons
  const pageCount = Math.ceil(count * PAGE_SIZE);
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["guests", filter, page + 1],
      queryFn: () => getGuests({ filter, page: page + 1 }),
    });
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["guests", filter, page - 1],
      queryFn: () => getGuests({ filter, page: page - 1 }),
    });
  return { guests, count, isLoading, error };
}
