/* eslint-disable react/prop-types */
import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";
import {
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { useDarkMode } from "../../context/DarkModeContext";
import {
  differenceInDays,
  eachDayOfInterval,
  format,
  isSameDay,
  subDays,
} from "date-fns";
const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

export default function SalesChart({ bookings, numDays }) {
  const { isDarkMode } = useDarkMode();
  const { createdAt } = bookings[0];
  const newCreateAt = subDays(new Date(createdAt), 7).toISOString();
  const totalDays = differenceInDays(new Date(), newCreateAt);

  const allDates =
    !isNaN(numDays) && numDays !== "all"
      ? eachDayOfInterval({
          start: subDays(new Date(), numDays - 1),
          end: new Date(),
        })
      : eachDayOfInterval({
          start: subDays(new Date(), totalDays - 1),
          end: new Date(),
        });
  const data = allDates.map((date) => {
    return {
      label: format(date, "MMM dd"),
      roomCharge: bookings
        .filter((booking) => isSameDay(date, new Date(booking.createdAt)))
        .reduce((acc, cur) => acc + cur.roomCharge, 0),
      extraCharge: bookings
        .filter((booking) => isSameDay(date, new Date(booking.createdAt)))
        .reduce((acc, cur) => acc + cur.extraCharge, 0),
    };
  });
  const colors = isDarkMode
    ? {
        roomCharge: { stroke: "#4f46e5", fill: "#4f46e5" },
        extraCharge: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        roomCharge: { stroke: "#4f46e5", fill: "#c7d2fe" },
        extraCharge: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };
  return (
    <StyledSalesChart>
      <Heading as="h2">
        Sales ({format(allDates.at(0), "MMM dd yyyy")}&mdash;
        {format(allDates.at(-1), "MMM dd yyyy")})
      </Heading>

      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit="RS"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Area
            dataKey="roomCharge"
            type="monotone"
            stroke={colors.roomCharge.stroke}
            fill={colors.roomCharge.fill}
            strokeWidth={2}
            name="Room Sales"
            unit="RS"
          />
          <Area
            dataKey="extraCharge"
            type="monotone"
            stroke={colors.extraCharge.stroke}
            fill={colors.extraCharge.fill}
            strokeWidth={2}
            name="Other Sales"
            unit="RS"
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}
