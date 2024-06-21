import styled from "styled-components";

import { useNavigate } from "react-router-dom";
import _ from "lodash";
import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "./useBooking";
import Spinner from "../../ui/Spinner";
import CheckoutButton from "../check-in-out/CheckoutButton";
import Modal from "../../ui/Modal";
import ConfirmAction from "../../ui/ConfirmAction";
import useDeleteBooking from "./useDeleteBooking";
import Empty from "../../ui/Empty";
import useUpdateBooking from "./useUpdateBooking";
import { addDays } from "date-fns";
// import { useEffect } from "react";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading } = useBooking();
  const { deleteBookingFn, isDeleting } = useDeleteBooking();
  const { updateBookingInfo, isUpdating } = useUpdateBooking();
  const navigate = useNavigate();
  const moveBack = useMoveBack();
  // let disabled = false;

  if (_.isUndefined(booking)) return <Empty resource="Booking" />;
  const {
    status,
    _id: bookingId,
    numNights,
    roomCharge,
    checkoutDate,
    dueAmount,
    guest: { _id: guestId },
    room: { _id: roomId },
  } = booking;
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  const handleDelete = () => {
    deleteBookingFn(bookingId, {
      onSettled: navigate(-1),
    });
  };
  const handleExtend = () => {
    const rc = Number(roomCharge) / Number(numNights);
    const newNumNights = Number(numNights) + 1;
    const newRoomCharge = Number(rc) * Number(newNumNights);
    const newDueAmount = Number(rc) + Number(dueAmount);
    const newCheckoutDate = addDays(new Date(checkoutDate), parseInt(1));
    const value = {
      numNights: newNumNights,
      roomCharge: newRoomCharge,
      dueAmount: newDueAmount,
      checkoutDate: newCheckoutDate,
      isPaid: false,
    };
    updateBookingInfo({ value, bookingId });
  };

  if (isLoading) return <Spinner />;
  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Button
          variation="secondary"
          onClick={() => navigate(`/guest/${guestId}`)}
        >
          Guest Info
        </Button>
        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            Check In
          </Button>
        )}

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
        {status === "checked-in" && (
          <CheckoutButton bookingId={bookingId} roomId={roomId} />
        )}
        <Modal>
          {status === "checked-in" && (
            <Modal.Open opens="confirm-extend">
              <Button>Extend Stay</Button>
            </Modal.Open>
          )}
          <Modal.Open opens="confirmBookingDelete">
            <Button variation="danger">Delete</Button>
          </Modal.Open>
          <Modal.Window name="confirmBookingDelete">
            <ConfirmAction
              action="delete"
              resourceName="Booking"
              disabled={isDeleting}
              onConfirm={handleDelete}
            />
          </Modal.Window>
          <Modal.Window name="confirm-extend">
            <ConfirmAction
              action="extend"
              resourceName="Extend stay"
              disabled={isUpdating}
              onConfirm={handleExtend}
            />
          </Modal.Window>
        </Modal>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
