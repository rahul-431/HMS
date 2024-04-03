import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import useCabin from "./useCabin";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
  const { isLoading, error, cabins } = useCabin();
  const [searchParam] = useSearchParams();
  if (isLoading) {
    return <Spinner />;
  }
  if (error) {
    console.log(error);
  }
  const filterValue = searchParam.get("discount") || "all";
  let filteredCabins;
  if (filterValue === "all") filteredCabins = cabins;
  if (filterValue === "no-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  if (filterValue === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount !== 0);
  return (
    <Menus>
      <Table columns="0.6fr 1fr 1fr 1fr 1fr 2.2fr 1fr">
        <Table.Header>
          <div>Image</div>
          <div>Name</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div>Description</div>
          <div>Action</div>
        </Table.Header>
        <Table.Body
          data={filteredCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
