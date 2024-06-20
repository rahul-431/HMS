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
import { Box } from "../check-in-out/CheckinBooking";
// import Checkbox from "../../ui/Checkbox";
// import useConfirmPaid from "./useConfirmPaid";
import useUpdateBooking from "./useUpdateBooking";
import ConfirmAction from "../../ui/ConfirmAction";
import Modal from "../../ui/Modal";

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
    status,
    numNights,
    roomCharge,
    dueAmount,
    extraCharge,
    otherCharge: newOtherCharge,
    observation,
    isPaid,
    otherPaid,
    user: { fullName: addedBy },
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
  const [payment, setPayment] = useState(0);
  // const [confirmPaid, setConfirmPaid] = useState(isPaid && otherPaid);
  const { updateBookingInfo, isUpdating } = useUpdateBooking();
  // const { confirmingPaid, isConfirmingPaid } = useConfirmPaid();

  const handleConfirm = () => {
    // confirmingPaid(bookingId, {
    //   onSuccess: () => {
    //     setConfirmPaid(!confirmPaid);
    //   },
    // });
    const newExtraCharge = Number(newOtherCharge) + Number(extraCharge);
    const value = {
      extraCharge: newExtraCharge,
      otherCharge: 0,
      dueAmount: 0,
      otherPaid: true,
      isPaid: true,
    };
    updateBookingInfo(
      { value, bookingId },
      {
        onSuccess: () => {
          setOtherCharge(0);
        },
      }
    );
  };
  const handleAddCharge = () => {
    if (otherCharge > 0) {
      const charge = Number(otherCharge) + Number(newOtherCharge);
      const nd = Number(otherCharge) + Number(dueAmount);
      const value = {
        otherCharge: charge,
        dueAmount: nd,
        otherPaid: false,
      };

      updateBookingInfo(
        { value, bookingId },
        {
          onSuccess: () => {
            setOtherCharge(0);
          },
        }
      );
    }
  };
  const handleAddPayment = () => {
    if (payment > 0) {
      const charge = dueAmount > 0 ? Number(dueAmount) - Number(payment) : 0;
      const newCharge =
        newOtherCharge > 0 ? Number(newOtherCharge) - Number(payment) : 0;
      const newExtraCharge = !isPaid
        ? Number(extraCharge) + Number(payment)
        : Number(extraCharge) + Number(newOtherCharge);
      const value = {
        otherCharge: newCharge,
        extraCharge: newExtraCharge,
        dueAmount: charge,
      };
      updateBookingInfo(
        { value, bookingId },
        {
          onSuccess: () => {
            setPayment(0);
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
            {numNights ? numNights : "..."} nights in Room{" "}
            <span>{roomNumber}</span>
          </p>
        </div>

        <p>
          {format(new Date(checkInDate), " EEE, MMM dd yyyy,p")} (
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
          <p>Added By : {addedBy ? addedBy : "....."}</p>
          <p>Room Charge : {roomCharge / numNights} per day</p>
        </Guest>

        {observation && (
          <DataItem
            icon={<HiOutlineChatBubbleBottomCenterText />}
            label="Observations"
          >
            {observation}
          </DataItem>
        )}
        {status !== "checked-out" && (
          <FormRow label="Add Extra Charge" id="extraCharge">
            <Input
              type="number"
              id="extraCharge"
              value={otherCharge}
              onChange={(e) => setOtherCharge(e.target.value)}
            />
            <Button onClick={handleAddCharge} disabled={isUpdating}>
              Add
            </Button>
          </FormRow>
        )}
        {(dueAmount > 0 || newOtherCharge > 0) && (
          <FormRow label="Add payment" id="payment">
            <Input
              type="number"
              id="payment"
              value={payment}
              disabled={isUpdating}
              onChange={(e) => setPayment(e.target.value)}
            />
            <Button onClick={handleAddPayment} disabled={isUpdating}>
              Add
            </Button>
          </FormRow>
        )}
        <Price isPaid={isPaid}>
          <DataItem label={`Total Amount`}>
            {formatCurrency(Number(extraCharge + roomCharge + newOtherCharge))}

            {(extraCharge > 0 || newOtherCharge) &&
              ` (${formatCurrency(roomCharge)} room + ${formatCurrency(
                extraCharge + newOtherCharge
              )} other)`}
          </DataItem>

          <p>{isPaid && otherPaid ? "Paid" : "Due"}</p>
        </Price>
        {(!otherPaid || !isPaid) && (
          <Price isPaid={isPaid && otherPaid}>
            <DataItem label={`Paid/Due status`}>
              {!isPaid && !otherPaid
                ? `aDue Amount : ${formatCurrency(
                    dueAmount
                  )} and Paid : ${formatCurrency(
                    extraCharge + roomCharge + newOtherCharge - dueAmount
                  )}`
                : !isPaid && otherPaid
                ? `bDue Amount : ${formatCurrency(
                    dueAmount
                  )} and Paid:  ${formatCurrency(
                    extraCharge + roomCharge - dueAmount
                  )}`
                : isPaid && !otherPaid
                ? `cPaid : ${formatCurrency(
                    extraCharge + roomCharge - dueAmount
                  )} and Due :
            ${formatCurrency(newOtherCharge)}`
                : "All Paid"}
              {/* {!isPaid &&
                `Due Amount : ${formatCurrency(
                  dueAmount + extraCharge + newOtherCharge
                )} and Paid:  ${formatCurrency(
                  extraCharge + roomCharge - dueAmount
                )}`}
              {!isPaid &&
                !otherPaid &&
                `Due Amount : ${formatCurrency(
                  dueAmount + extraCharge + newOtherCharge
                )}`}

              {!otherPaid &&
                `Paid : ${formatCurrency(
                  extraCharge + roomCharge - dueAmount
                )} and Due :
            ${formatCurrency(newOtherCharge)}`} */}
            </DataItem>
            <p>{isPaid && otherPaid ? "Paid" : "Due"}</p>
          </Price>
        )}
      </Section>

      <Box>
        <Modal>
          <Modal.Open opens="confirmBookingDelete">
            <Button
              variation={isPaid && otherPaid ? "secondary" : "primary"}
              size="small"
              disabled={isUpdating || (isPaid && otherPaid)}
            >
              Confirm
            </Button>
          </Modal.Open>
          <Modal.Window name="confirmBookingDelete">
            <ConfirmAction
              action="update"
              resourceName="payment"
              disabled={isUpdating}
              onConfirm={handleConfirm}
            />
          </Modal.Window>
        </Modal>
        I confirm that {guestName} has paid the total amount{" "}
        {formatCurrency(extraCharge + roomCharge + newOtherCharge)}
      </Box>

      <Footer>
        <p>Booked {format(new Date(createdAt), "EEE, MMM dd yyyy, p")}</p>
        <p>Updated {format(new Date(updatedAt), "EEE, MMM dd yyyy, p")}</p>
      </Footer>
    </StyledBookingDataBox>
  );
}

export default BookingDataBox;
