/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import useUpdateCabin from "./useUpdateCabin";

function CabinEditForm({ editCabin = {}, closeModal: setShowForm }) {
  const { id: editId, ...editValues } = editCabin;
  const editSession = Boolean(editId);

  const { register, handleSubmit, getValues, formState } = useForm({
    defaultValues: editSession ? editValues : {},
  });
  const { errors } = formState;
  const { isUpdating, updateCabin } = useUpdateCabin();
  const handleCabinFormSubmit = (data) => {
    updateCabin(
      { newCabin: data, editId },
      {
        onSuccess: () => {
          setShowForm(false);
        },
      }
    );
  };
  const onError = (errors) => {
    console.log(errors);
  };
  return (
    <Form onSubmit={handleSubmit(handleCabinFormSubmit, onError)} type="modal">
      <FormRow label="Cabin Name" error={errors?.name?.message} id="name">
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "This Field is required",
          })}
        />
      </FormRow>

      <FormRow
        label="Maximum capacity"
        error={errors?.maxCapacity?.message}
        id="maxCapacity"
      >
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This Field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
            max: {
              value: 10,
              message: "Capacity should less or equal to 10",
            },
          })}
        />
      </FormRow>

      <FormRow
        id="regularPrice"
        label="regularPrice"
        error={errors?.regularPrice?.message}
      >
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This Field is required",
            min: {
              value: 1,
              message: "Regular Price should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow id="discount" error={errors?.discount?.message} label="Discount">
        <Input
          type="number"
          id="discount"
          {...register("discount", {
            required: "This Field is required",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount should be less than regular price",
          })}
        />
      </FormRow>

      <FormRow
        id="description"
        error={errors?.description?.message}
        label="Description"
      >
        <Textarea
          type="number"
          id="description"
          {...register("description", {
            required: "This Field is required",
          })}
        />
      </FormRow>
      <FormRow>
        <Button variation="danger" onClick={() => setShowForm(false)}>
          Cancel
        </Button>
        <Button type="submit" variation="primary" disabled={isUpdating}>
          Update
        </Button>
      </FormRow>
    </Form>
  );
}

export default CabinEditForm;
