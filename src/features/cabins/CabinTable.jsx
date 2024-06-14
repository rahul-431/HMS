import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import useCabin from "./useCabin";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

function CabinTable() {
  const { isLoading, error, cabins } = useCabin();
  const [searchParam] = useSearchParams();
  if (isLoading) {
    return <Spinner />;
  }
  if (error) {
    console.log(error);
  }

  //client side filtering
  const filterValue = searchParam.get("cb") || "all";
  let filteredCabins;
  if (filterValue === "all") filteredCabins = cabins;
  if (filterValue === "clean")
    filteredCabins = cabins.filter((cabin) => cabin.cleanStatus === "Clean");
  if (filterValue === "not-clean")
    filteredCabins = cabins.filter(
      (cabin) => cabin.cleanStatus === "Not Clean"
    );
  if (filterValue === "not-booked")
    filteredCabins = cabins.filter(
      (cabin) => cabin.roomStatus === "Not Booked"
    );
  if (filterValue === "booked")
    filteredCabins = cabins.filter((cabin) => cabin.roomStatus === "Booked");

  //client side sorting feature
  const sortBy = searchParam.get("sortBy") || "number-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );
  if (!cabins.length) return <Empty resource="cabins" />;
  return (
    <Menus>
      <Table columns="0.6fr 0.8fr 1fr 0.6fr 1fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Number</div>
          <div>Category</div>
          <div>Capacity</div>
          <div>Clean Status</div>
          <div>Room Status</div>
          <div>Added By</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin._id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
