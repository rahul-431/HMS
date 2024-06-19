/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import { StyledSelect } from "../../ui/Select";
import Textarea from "../../ui/Textarea";
import useCabin from "../cabins/useCabin";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import { useEffect, useState } from "react";
import styled from "styled-components";
import useSearchGuest from "./useSearchGuest";
import { useNavigate, useSearchParams } from "react-router-dom";
import ButtonText from "../../ui/ButtonText";
import useCreateBooking from "./useCreateBooking";
import { addDays, format, setHours, setMinutes } from "date-fns";
const Ul = styled.ul`
  position: fixed;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  border-color: blue;
  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
  list-style: none;
  width: 400px;
  /* width: 100%; */
  max-height: 150px;
  overflow-y: auto;
  z-index: 1000;

  & li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px;
    cursor: pointer;
  }

  & li:hover {
    background-color: var(--color-grey-400);
  }
`;
function BookingForm({ closeModal }) {
  const navigate = useNavigate();

  const { createBooking, isCreating } = useCreateBooking();

  const [searchParam, setSearchParam] = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm();

  const moveBack = () => {
    navigate("/bookings");
  };
  const { cabins } = useCabin(true);
  const { searchedGuest } = useSearchGuest();

  //for searching guest by name and options are displayed in the list
  // once confirmed which guest need to be booked then click on it and it add the id
  //to the data
  const [showOptions, setShowOptions] = useState(false);
  const [query, setQuery] = useState(searchParam.get("search") || "");

  //calculate the position of input field and then display list according to that position
  const [position, setPosition] = useState({});

  const onInputChange = (e) => {
    setQuery(e.target.value);
    searchParam.set("search", e.target.value);
    setSearchParam(searchParam);
  };

  const onOptionClick = (option) => {
    const { fullName, _id } = option;
    setValue("guestId", _id);
    setQuery(fullName);
    setShowOptions(false);
  };

  const onFocus = (e) => {
    const rect = e.target.closest("input").getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });
    setShowOptions(true);
  };
  const handleBookingFormSubmit = (data) => {
    createBooking(data, {
      onSuccess: () => {
        moveBack();
      },
    });
  };
  const onError = (errors) => {
    console.log(errors);
  };
  const checkInDate = watch("checkInDate");
  const numNights = watch("numNights", 1);

  useEffect(() => {
    if (checkInDate && numNights) {
      // const checkoutDate = addDays(new Date(checkInDate), parseInt(numNights));
      // setValue("checkoutDate", format(checkoutDate, "yyyy-MM-dd'T'HH:mm"));
      const checkInDateObj = new Date(checkInDate);
      const checkoutDate = addDays(checkInDateObj, parseInt(numNights));
      const checkoutDateWithTime = setMinutes(setHours(checkoutDate, 12), 5); // Setting time to 12:05 PM
      setValue(
        "checkoutDate",
        format(checkoutDateWithTime, "yyyy-MM-dd'T'HH:mm")
      );
    }
  }, [checkInDate, numNights, setValue]);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h3">Add New Booking</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>
      <Form
        onSubmit={handleSubmit(handleBookingFormSubmit, onError)}
        type={closeModal ? "modal" : "regular"}
      >
        <FormRow
          label="Checkin Date"
          error={errors?.checkInDate?.message}
          id="checkInDate"
          required="1"
        >
          <Input
            type="datetime-local"
            id="checkInDate"
            {...register("checkInDate", {
              required: "This Field is required",
            })}
          />
        </FormRow>
        <FormRow
          label="Stay Nights"
          id="numNights"
          error={errors?.numNights?.message}
        >
          <Input
            type="number"
            id="numNights"
            defaultValue={1}
            {...register("numNights", {
              min: {
                value: 1,
                message: "Value should be at least 1",
              },
            })}
          />
        </FormRow>
        <FormRow
          label="Checkout Date"
          error={errors?.checkoutDate?.message}
          id="checkoutDate"
          required="1"
        >
          <Input
            type="datetime-local"
            disabled
            id="checkoutDate"
            {...register("checkoutDate", {
              required: "This Field is required",
            })}
          />
        </FormRow>
        <FormRow
          label="Select Room"
          error={errors?.roomNumber?.message}
          id="roomNumber"
          required="1"
        >
          <StyledSelect
            id="roomNumber"
            {...register("roomNumber", { required: "This field is required" })}
          >
            {cabins?.map((opt) => (
              <option value={opt._id} key={opt._id}>
                {opt.roomNumber}
              </option>
            ))}
          </StyledSelect>
        </FormRow>
        <FormRow
          label="Search Guest Name"
          error={errors?.guestId?.message}
          id="guestId"
          required="1"
        >
          <Input
            type="text"
            id="guestId"
            {...register("guestId")}
            value={query}
            onChange={onInputChange}
            onFocus={onFocus}
            autoComplete="off"
          />
          {showOptions && searchedGuest?.length > 0 && (
            <Ul position={position}>
              {searchedGuest?.map((option, index) => (
                <li key={index} onClick={() => onOptionClick(option)}>
                  <span>{option?.fullName}</span>
                  <span>{option?.phoneNumber}</span>
                </li>
              ))}
            </Ul>
          )}
        </FormRow>

        <FormRow
          label="Male"
          id="maleNumber"
          error={errors?.maleNumber?.message}
        >
          <Input
            type="number"
            id="maleNumber"
            {...register("maleNumber", {
              min: {
                value: 1,
                message: "Value should be at least 1",
              },
            })}
          />
        </FormRow>
        <FormRow
          label="Female"
          id="femaleNumber"
          error={errors?.femaleNumber?.message}
        >
          <Input
            type="number"
            id="femaleNumber"
            {...register("femaleNumber", {
              min: {
                value: 1,
                message: "Value should be at least 1",
              },
            })}
          />
        </FormRow>

        <FormRow label="Relation" id="relation">
          <Input type="text" id="relation" {...register("relation")} />
        </FormRow>
        <FormRow
          label="Vehicle Info"
          error={errors?.vehicleNumber?.message}
          id="vehicleNumber"
        >
          <Input
            type="text"
            id="vehicleNumber"
            {...register("vehicleNumber")}
          />
        </FormRow>
        <FormRow
          label="Room Charge"
          error={errors?.roomCharge?.message}
          id="roomCharge"
          required="1"
        >
          <Input
            type="number"
            id="roomCharge"
            {...register("roomCharge", {
              required: "This Field is required",
            })}
          />
        </FormRow>
        <FormRow label="Extra Charge" id="extraCharge">
          <Input type="number" id="extraCharge" {...register("extraCharge")} />
        </FormRow>
        <FormRow label="Payment received" id="advanceAmount">
          <Input
            type="number"
            id="advanceAmount"
            {...register("advanceAmount")}
          />
        </FormRow>
        {/* <FormRow
          label="Paid Status"
          error={errors?.isPaid?.message}
          id="isPaid"
          required="1"
        >
          <StyledSelect id="isPaid" {...register("isPaid")}>
            <option value={true} selected>
              Paid
            </option>
            <option value={false}>Due</option>
          </StyledSelect>
        </FormRow> */}

        <FormRow label="Other Info" id="observation">
          <Textarea id="observation" {...register("observation")} />
        </FormRow>
        <FormRow>
          <Button variation="secondary" type="reset" onClick={moveBack}>
            Back
          </Button>
          <Button
            variation="danger"
            type="reset"
            onClick={() => closeModal?.()}
          >
            Cancel
          </Button>
          <Button type="submit" variation="primary" disabled={isCreating}>
            Add
          </Button>
        </FormRow>
      </Form>
    </>
  );
}

export default BookingForm;
