/* eslint-disable react/prop-types */
import styled from "styled-components";
import Tag from "../../ui/Tag";
import Button from "../../ui/Button";
import { Link } from "react-router-dom";

const StyledTodayItem = styled.li`
  display: flex;
  gap: 1.6rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

export default function TodayItem({ activity }) {
  const {
    _id,
    guest: { fullName },
    status,
    numNights,
  } = activity;
  return (
    <StyledTodayItem>
      {status === "unconfirmed" && <Tag type="green">Arriving</Tag>}
      {status === "checked-in" && <Tag type="blue">Departing</Tag>}
      <Guest>{fullName}</Guest>
      <Guest>{numNights} Nights</Guest>
      {status === "unconfirmed" && (
        <Button
          size="small"
          variation="primary"
          as={Link}
          to={`/checkin/${_id}`}
        >
          Checkin
        </Button>
      )}
      {status === "checked-in" && (
        <Button
          size="small"
          variation="danger"
          as={Link}
          to={`/bookings/${_id}`}
        >
          Checkout
        </Button>
      )}
    </StyledTodayItem>
  );
}
