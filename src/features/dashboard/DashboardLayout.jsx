import styled from "styled-components";
import useRecentBooking from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import useRecentStays from "./useRecentStays";
import Stats from "./Stats";
import useCabin from "../cabins/useCabin";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export default function DashboardLayout() {
  const { recentBookings, isLoading: isLoadingBooking } = useRecentBooking();
  const {
    isLoading: isLoadingStays,
    recentStays,
    confirmedStays,
    numDays,
  } = useRecentStays();
  const { cabins, isLoading: isLoadingCabins } = useCabin();
  if (isLoadingBooking || isLoadingStays || isLoadingCabins) return <Spinner />;
  console.log("recent Bookings are ", recentBookings);
  console.log("confirm stays", confirmedStays);
  console.log("all recent stays", recentStays);
  return (
    <StyledDashboardLayout>
      <Stats
        bookings={recentBookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      <div>todays activity</div>
      <div>chart stay duration</div>
      <div>chartsales</div>
    </StyledDashboardLayout>
  );
}
