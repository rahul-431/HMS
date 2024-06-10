/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import useCreateRoomType from "./useCreateRoomType";

function AddRoomType({ closeModal }) {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const { addRoomType, isCreating } = useCreateRoomType();
  const addRoom = (data) => {
    console.log(data);
    if (!data) return null;
    const { name } = data;
    addRoomType(
      { name },
      {
        onSuccess: () => {
          closeModal?.();
        },
      }
    );
  };
  return (
    <Form
      onSubmit={handleSubmit(addRoom)}
      type={closeModal ? "modal" : "regular"}
    >
      <FormRow label="Room Type Name" error={errors?.name?.message} id="name">
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="danger" type="reset" onClick={() => closeModal?.()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isCreating}>
          Add
        </Button>
      </FormRow>
    </Form>
  );
}

export default AddRoomType;
