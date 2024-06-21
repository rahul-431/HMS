/* eslint-disable react/prop-types */
import { Form } from "react-router-dom";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useForm } from "react-hook-form";
import useCabin from "../cabins/useCabin";
import { StyledSelect } from "../../ui/Select";
import Textarea from "../../ui/Textarea";
import Button from "../../ui/Button";
import useBooking from "./useBooking";
import Empty from "../../ui/Empty";
import { useMoveBack } from "../../hooks/useMoveBack";
function BookingEditForm() {
  //   console.log(closeModal, booking);
  const { booking, error } = useBooking();
  const moveBack = useMoveBack();
  console.log(booking);
  const { cabins } = useCabin(true);

  const { _id: editId, ...editValues } = booking;
  const { register, handleSubmit, formState } = useForm({
    defaultValues: editValues,
  });
  const { errors } = formState;
  const onError = (errors) => {
    console.log(errors);
  };
  const handleEditBooking = (data) => {
    console.log(data, editId);
  };
  if (error) {
    return <Empty resource="bookings" />;
  }
  return (
    <Form onSubmit={handleSubmit(handleEditBooking, onError)}>
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
      <FormRow label="Male" id="maleNumber" error={errors?.maleNumber?.message}>
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
        <Input type="text" id="vehicleNumber" {...register("vehicleNumber")} />
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
      <FormRow label="Other Info" id="observation">
        <Textarea id="observation" {...register("observation")} />
      </FormRow>
      <FormRow>
        <Button variation="danger" type="reset" onClick={moveBack()}>
          Cancel
        </Button>
        <Button type="submit" variation="primary">
          Edit
        </Button>
      </FormRow>
    </Form>
  );
}

export default BookingEditForm;
