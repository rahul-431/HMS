/* eslint-disable react/prop-types */
import styled from "styled-components";
import { format, isToday } from "date-fns";
import {
  HiOutlineChatBubbleBottomCenterText,
  // HiOutlineCheckCircle,
  // HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from "react-icons/hi2";

import DataItem from "../../ui/DataItem";
// import { Flag } from "../../ui/Flag";

import {
  formatDistanceFromNow,
  formatCurrency,
  toCapitalize,
} from "../../utils/helpers";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useState } from "react";
import useOtherCharge from "./useOtherCharge";
import { Box } from "../check-in-out/CheckinBooking";
import Checkbox from "../../ui/Checkbox";
import useConfirmPaid from "./useConfirmPaid";

const StyledBookingDataBox = styled.section`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  overflow: hidden;
`;

export const Header = styled.header`
  background-color: var(--color-brand-500);
  padding: 2rem 4rem;
  color: #e0e7ff;
  font-size: 1.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    height: 3.2rem;
    width: 3.2rem;
  }

  & div:first-child {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    font-weight: 600;
    font-size: 1.8rem;
  }

  & span {
    font-family: "Sono";
    font-size: 2rem;
    margin-left: 4px;
  }
`;

export const Section = styled.section`
  padding: 3.2rem 4rem 1.2rem;
`;

const Guest = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  gap: 0.2rem;
  margin-bottom: 1.6rem;
  color: var(--color-grey-700);
`;

const Price = styled.div`
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem 3.2rem;
  border-radius: var(--border-radius-sm);
  margin-top: 2.4rem;

  background-color: ${(props) =>
    props.isPaid ? "var(--color-green-100)" : "var(--color-yellow-100)"};
  color: ${(props) =>
    props.isPaid ? "var(--color-green-700)" : "var(--color-yellow-700)"};

  & p:last-child {
    text-transform: uppercase;
    font-size: 1.4rem;
    font-weight: 600;
    /* color: green; */
  }

  svg {
    height: 2.4rem;
    width: 2.4rem;
    color: currentColor !important;
  }
`;

export const Footer = styled.footer`
  padding: 1.6rem 4rem;
  font-size: 1.4rem;
  color: var(--color-grey-500);
  text-align: right;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

// A purely presentational component
function BookingDataBox({ booking }) {
  const {
    _id: bookingId,
    createdAt,
    updatedAt,
    checkInDate,
    checkoutDate,
    totalGuest,
    roomCharge,
    extraCharge,
    otherCharge: newOtherCharge,
    observations,
    isPaid,
    otherPaid,
    guest: {
      fullName: guestName,
      email,
      nationality,
      identityTypeNumber,
      identityType,
      phoneNumber,
    },
    room: { roomNumber },
  } = booking;
  const [otherCharge, setOtherCharge] = useState(0);
  const [confirmPaid, setConfirmPaid] = useState(isPaid && otherPaid);
  const { addExtraCharge, isAdding } = useOtherCharge();
  const { confirmingPaid, isConfirmingPaid } = useConfirmPaid();

  const handleConfirm = () => {
    confirmingPaid(bookingId, {
      onSuccess: () => {
        setConfirmPaid(!confirmPaid);
      },
    });
  };
  const handleAddCharge = () => {
    if (otherCharge > 0) {
      const value = {
        otherCharge: otherCharge,
      };
      addExtraCharge(
        { value, bookingId },
        {
          onSuccess: () => {
            setOtherCharge(0);
          },
        }
      );
    }
  };
  return (
    <StyledBookingDataBox>
      <Header>
        <div>
          <HiOutlineHomeModern />
          <p>
            {1} nights in Room <span>{roomNumber}</span>
          </p>
        </div>

        <p>
          {format(new Date(checkInDate), " EEE, MMM dd yyyy")} (
          {isToday(new Date(checkInDate))
            ? "Today"
            : formatDistanceFromNow(checkInDate)}
          ) &mdash; {format(new Date(checkoutDate), "EEE, MMM dd yyyy")}
        </p>
      </Header>

      <Section>
        <Guest>
          <p>Nationality : {toCapitalize(nationality)}</p>
          <p>Guest Name : {toCapitalize(guestName)}</p>
          <p>{totalGuest > 1 ? `+ ${totalGuest - 1} guests` : ""}</p>
          <p>Contact : {phoneNumber}</p>
          <p>Email : {email ? email : "....."}</p>
          <p>
            {toCapitalize(identityType)} :{" "}
            {identityTypeNumber ? identityTypeNumber : "....."}
          </p>
        </Guest>

        {observations && (
          <DataItem
            icon={<HiOutlineChatBubbleBottomCenterText />}
            label="Observations"
          >
            Other Details : {observations}
          </DataItem>
        )}
        <FormRow label="Add Extra Charge" id="extraCharge">
          <Input
            type="number"
            id="extraCharge"
            value={otherCharge}
            onChange={(e) => setOtherCharge(e.target.value)}
          />
          <Button onClick={handleAddCharge} disabled={isAdding}>
            Add
          </Button>
        </FormRow>
        <Price isPaid={isPaid}>
          <DataItem label={`Total Amount`}>
            {formatCurrency(extraCharge + roomCharge + newOtherCharge)}

            {(extraCharge || newOtherCharge) &&
              ` (${formatCurrency(roomCharge)} room + ${formatCurrency(
                extraCharge + newOtherCharge
              )} other)`}
          </DataItem>

          <p>{isPaid && otherPaid ? "Paid" : "Due"}</p>
        </Price>
        {!otherPaid && (
          <Price isPaid={isPaid && otherPaid}>
            <DataItem label={`Paid/Due status`}>
              {!isPaid &&
                !otherPaid &&
                `Due Amount : ${formatCurrency(
                  roomCharge + extraCharge + newOtherCharge
                )}`}

              {isPaid &&
                !otherPaid &&
                `Paid : ${formatCurrency(roomCharge + extraCharge)} and Due :
            ${formatCurrency(newOtherCharge)}`}
            </DataItem>
            <p>{isPaid && otherPaid ? "Paid" : "Due"}</p>
          </Price>
        )}
      </Section>

      <Box>
        <Checkbox
          disabled={isConfirmingPaid || (isPaid && otherPaid)}
          checked={isPaid && otherPaid}
          onChange={handleConfirm}
          id="confirm"
        >
          I confirm that {guestName} has paid the total amount{" "}
          {formatCurrency(extraCharge + roomCharge + newOtherCharge)}
        </Checkbox>
      </Box>

      <Footer>
        <p>Booked {format(new Date(createdAt), "EEE, MMM dd yyyy, p")}</p>
        <p>Updated {format(new Date(updatedAt), "EEE, MMM dd yyyy, p")}</p>
      </Footer>
    </StyledBookingDataBox>
  );
}

export default BookingDataBox;
