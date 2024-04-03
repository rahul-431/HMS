import { useSearchParams } from "react-router-dom";
import Select from "./Select";

/* eslint-disable react/prop-types */
export default function SortBy({ options }) {
  const [searchParam, setSearchParam] = useSearchParams();
  const sortValue = searchParam.get("sortBy") || "";
  const handleChange = (e) => {
    searchParam.set("sortBy", e.target.value);
    setSearchParam(searchParam);
  };
  return (
    <Select
      options={options}
      type="white"
      onChange={handleChange}
      value={sortValue}
    />
  );
}
