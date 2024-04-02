/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import useCreateCabin from "./useCreateCabin";

function CreateCabinForm({ closeModal }) {
  const { register, handleSubmit, getValues, formState } = useForm();
  const { errors } = formState;
  const { createCabin, isCreating } = useCreateCabin();
  const handleCabinFormSubmit = (data) => {
    createCabin(
      { ...data, image: data.image[0] },
      {
        onSuccess: () => {
          closeModal?.();
        },
      }
    );
  };
  const onError = (errors) => {
    console.log(errors);
  };
  return (
    <Form
      onSubmit={handleSubmit(handleCabinFormSubmit, onError)}
      type={closeModal ? "modal" : "regular"}
    >
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
          defaultValue={0}
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
          defaultValue=""
          {...register("description", {
            required: "This Field is required",
          })}
        />
      </FormRow>

      <FormRow label="Image" id="image" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: "This Field is required",
          })}
        />
      </FormRow>

      <FormRow>
        <Button variation="danger" type="reset" onClick={() => closeModal?.()}>
          Cancel
        </Button>
        <Button type="submit" variation="primary" disabled={isCreating}>
          Create cabin
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
