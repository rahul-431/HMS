/* eslint-disable react/prop-types */
import styled from "styled-components";
import { Footer, Header, Section } from "../bookings/BookingDataBox";
import { formatDistanceFromNow, toCapitalize } from "../../utils/helpers";
import { format, isToday } from "date-fns";
import _ from "lodash";
import { Stacked } from "../bookings/BookingRow";
const StyledGuestDataBox = styled.section`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  overflow: hidden;
`;
const Div = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1.6rem;
  color: var(--color-grey-500);

  & p:first-of-type {
    font-weight: 500;
    color: var(--color-grey-700);
  }
`;

function GuestDataBox({ guest }) {
  const {
    fullName,
    email,
    address,
    phoneNumber,
    age,
    identityType,
    identityTypeNumber,
    occupation,
    nationality,
    createdAt,
    updatedAt,
    user,
  } = guest;

  return (
    <StyledGuestDataBox>
      <Header>
        <div>
          <p>{toCapitalize(fullName)}</p>
        </div>
        <p>{toCapitalize(address)}</p>
      </Header>
      <Section>
        <Div>
          <p>Email: {email ? email : "....."}</p>
        </Div>
        <Div>
          <p>Contact: {phoneNumber}</p>
        </Div>
        <Div>
          <p>Age: {age ? age : "....."}</p>
        </Div>
        <Div>
          <p>Nationality: {toCapitalize(nationality)}</p>
        </Div>
        <Div>
          <p>
            Identity Type: {identityType ? toCapitalize(identityType) : "....."}
          </p>
        </Div>
        <Div>
          <p>
            Identity Number: {identityTypeNumber ? identityTypeNumber : "....."}
          </p>
        </Div>
        <Div>
          <p>Occupation: {occupation ? occupation : "....."}</p>
        </Div>
        {!_.isUndefined(user) && (
          <Div>
            <p>Added By: {user ? user.fullName : "....."}</p>
          </Div>
        )}
      </Section>
      <Footer>
        <Stacked>
          <span>
            {isToday(new Date(createdAt))
              ? "Today"
              : formatDistanceFromNow(createdAt)}
          </span>
          <span>
            Added at {format(new Date(createdAt), "EEE, MMM dd yyyy, p")}
          </span>
        </Stacked>
        <Stacked>
          <span>
            {isToday(new Date(updatedAt))
              ? "Today"
              : formatDistanceFromNow(updatedAt)}
          </span>
          <span>
            Updated at {format(new Date(updatedAt), "EEE, MMM dd yyyy, p")}
          </span>
        </Stacked>
      </Footer>
    </StyledGuestDataBox>
  );
}

export default GuestDataBox;
