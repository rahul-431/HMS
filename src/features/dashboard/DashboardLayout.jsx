import styled from "styled-components";
import useRecentBooking from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import useRecentStays from "./useRecentStays";
import Stats from "./Stats";
import useCabin from "../cabins/useCabin";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto auto 34rem auto;
  gap: 2.4rem;
`;

export default function DashboardLayout() {
  const { recentBookings, isLoading: isLoadingBooking } = useRecentBooking();
  const {
    isLoading: isLoadingStays,
    confirmedStays,
    unConfirmedBooking,
    numDays,
  } = useRecentStays();
  const { cabins: availableRoom, isLoading: isLoadingAvailableRoom } =
    useCabin(true);
  const { cabins, isLoading: isLoadingCabins } = useCabin();
  if (
    isLoadingBooking ||
    isLoadingStays ||
    isLoadingCabins ||
    isLoadingAvailableRoom
  )
    return <Spinner />;
  return (
    <StyledDashboardLayout>
      <Stats
        bookings={recentBookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
        availableRoom={availableRoom.length}
        unconfirmed={unConfirmedBooking.length}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={recentBookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}
