/* eslint-disable react/prop-types */
import styled from "styled-components";
import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import { formatCurrency, toCapitalize } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import Menus from "../../ui/Menus";
import {
  HiOutlineArrowDownOnSquareStack,
  HiOutlineArrowUpOnSquareStack,
  HiOutlineEye,
  HiOutlineTrash,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import Modal from "../../ui/Modal";
import ConfirmAction from "../../ui/ConfirmAction";
import useDeleteBooking from "./useDeleteBooking";
import toast from "react-hot-toast";
const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

export const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  text-align: center;
  align-items: center;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;
function BookingRow({ booking }) {
  const {
    _id: bookingId,
    checkInDate,
    checkoutDate,
    status,
    roomCharge,
    extraCharge,
    guest,
    room,
    isPaid,
    otherPaid,
  } = booking;
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  const navigate = useNavigate();
  const { checkout, isCheckingOut } = useCheckout();
  const { deleteBookingFn, isDeleting } = useDeleteBooking();
  const disabled = Boolean(isPaid && otherPaid);
  const handleCheckout = () => {
    if (!disabled) {
      toast.error("Guest have due amount to pay");
    } else {
      checkout(bookingId);
    }
  };
  return (
    <Table.Row>
      <Cabin>{room.roomNumber}</Cabin>

      <Stacked>
        <span>{toCapitalize(guest.fullName)}</span>
        <span>{guest.phoneNumber}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(checkInDate))
            ? "Today"
            : formatDistanceFromNow(checkInDate)}{" "}
          &rarr; {1} night stay
          {/* there will go numnights */}
        </span>
        <span>
          {format(new Date(checkInDate), "MMM dd yyyy")} &mdash;
          {format(new Date(checkoutDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(roomCharge + extraCharge)}</Amount>
      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={bookingId} />
          <Menus.List id={bookingId}>
            <Menus.Button
              icon={<HiOutlineEye />}
              onClick={() => navigate(`/bookings/${bookingId}`)}
            >
              See Details
            </Menus.Button>
            {status === "unconfirmed" && (
              <Menus.Button
                icon={<HiOutlineArrowDownOnSquareStack />}
                onClick={() => navigate(`/checkin/${bookingId}`)}
              >
                Check In
              </Menus.Button>
            )}
            {status === "checked-in" && (
              <Menus.Button
                icon={<HiOutlineArrowUpOnSquareStack />}
                onClick={handleCheckout}
                disabled={isCheckingOut}
              >
                Check Out
              </Menus.Button>
            )}
            <Modal.Open opens="confirmBookingDelete">
              <Menus.Button icon={<HiOutlineTrash />}>Delete</Menus.Button>
            </Modal.Open>
          </Menus.List>
          <Modal.Window name="confirmBookingDelete">
            <ConfirmAction
              action="delete"
              resourceName="Booking"
              disabled={isDeleting}
              onConfirm={() => deleteBookingFn(bookingId)}
            />
          </Modal.Window>
        </Menus.Menu>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;
