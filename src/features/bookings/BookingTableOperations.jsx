import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";
// import AddNewBooking from "./AddNewBooking";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";
import Heading from "../../ui/Heading";
import Search from "../../ui/Search";

function BookingTableOperations() {
  const navigate = useNavigate();
  return (
    <TableOperations>
      <Button size="small" onClick={() => navigate("/addBooking")}>
        Add Booking
      </Button>
      <Heading as="h4" style={{ fontWeight: "normal" }}>
        Search By(Guest Name)
      </Heading>
      <Search />
      <Filter
        filterField="status"
        options={[
          { value: "all", label: "All" },
          { value: "checked-out", label: "Checked out" },
          { value: "checked-in", label: "Checked in" },
          { value: "unconfirmed", label: "Unconfirmed" },
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
