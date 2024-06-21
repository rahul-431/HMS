/* eslint-disable react/prop-types */
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineBuildingStorefront,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";
import { differenceInDays, subDays } from "date-fns";

function Stats({
  bookings,
  confirmedStays,
  numDays,
  cabinCount,
  availableRoom,
  unconfirmed,
}) {
  // 1.
  const numBookings = bookings.length;

  // 2.
  const sales = bookings.reduce((acc, cur) => acc + cur.roomCharge, 0);
  const otherSales = bookings.reduce(
    (acc, cur) => acc + cur.extraCharge + cur.otherCharge,
    0
  );

  // 3.
  const checkins = confirmedStays.length;

  // 4.
  const { createdAt } = bookings[0];
  // const totalDays = differenceInDays(new Date(), new Date(createdAt));
  const newCreateAt = subDays(new Date(createdAt), 7).toISOString();
  const totalDays = differenceInDays(new Date(), newCreateAt);
  const occupation =
    !isNaN(numDays) && numDays !== "all"
      ? confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
        (numDays * cabinCount)
      : confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
        (totalDays * cabinCount);
  console.log(totalDays, numDays, occupation, cabinCount);
  // num checked in nights / all available nights (num days * num cabins)

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Room Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Other Sales"
        color="red"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(otherSales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title="Unconfirmed Booking"
        color="red"
        icon={<HiOutlineCalendarDays />}
        value={unconfirmed}
      />
      <Stat
        title="Total Rooms"
        color="yellow"
        icon={<HiOutlineBuildingStorefront />}
        value={cabinCount}
      />
      <Stat
        title="Available Rooms"
        color="green"
        icon={<HiOutlineBuildingStorefront />}
        value={availableRoom}
      />
      <Stat
        title="Occupied rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupation * 100) + "%"}
      />
    </>
  );
}

export default Stats;
