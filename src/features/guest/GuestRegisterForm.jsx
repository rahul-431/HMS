/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import { StyledSelect } from "../../ui/Select";
import useAddGuest from "./useAddGuest";

function GuestRegisterForm({ closeModal }) {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const { createGuest, isCreating } = useAddGuest();
  const IdentityTypeOption = [
    { value: "citizenship", label: "Citizenship" },
    { value: "driving-liscence", label: "Driving Liscence" },
    { value: "pan-card", label: "Pan Card" },
    { value: "aadhar-card", label: "Aadhar Card" },
    { value: "other", label: "Other" },
  ];
  const Nationality = [
    { value: "nepali", label: "Nepali" },
    { value: "indian", label: "indian" },
    { value: "other", label: "Other" },
  ];
  const handleCabinFormSubmit = (data) => {
    createGuest(data, {
      onSuccess: () => {
        closeModal?.();
      },
    });
  };
  const onError = (errors) => {
    console.log(errors);
  };
  {
    /* fullName requried address requried age not
          identityType(Citizenship,driving liscence,pan card,aadhar dard,other)
          IdentityTypeNumber, phoneNumber required nationality(default nepali
          opt(nepali,indian,other)), occupation not */
  }

  return (
    <Form
      onSubmit={handleSubmit(handleCabinFormSubmit, onError)}
      type={closeModal ? "modal" : "regular"}
    >
      <FormRow
        label="Full Name"
        error={errors?.fullName?.message}
        id="fullName"
        required="1"
      >
        <Input
          type="text"
          id="fullName"
          {...register("fullName", {
            required: "This Field is required",
          })}
        />
      </FormRow>

      <FormRow
        label="Address"
        error={errors?.address?.message}
        id="address"
        required="1"
      >
        <Input
          type="text"
          id="address"
          {...register("address", {
            required: "This Field is required",
          })}
        />
      </FormRow>
      <FormRow
        label="Contact"
        error={errors?.phoneNumber?.message}
        id="phoneNumber"
        required="1"
      >
        <Input
          type="text"
          id="phoneNumber"
          {...register("phoneNumber", {
            required: "This Field is required",
          })}
        />
      </FormRow>
      <FormRow label="Age" error={errors?.age?.message} id="age">
        <Input type="text" id="age" {...register("age")} />
      </FormRow>
      <FormRow
        label="Nationality"
        error={errors?.nationality?.message}
        id="nationality"
      >
        <StyledSelect
          id="nationality"
          {...register("nationality", { required: "This field is required" })}
        >
          {Nationality.map((opt) => (
            <option value={opt.value} key={opt.value}>
              {opt.label}
            </option>
          ))}
        </StyledSelect>
      </FormRow>
      <FormRow
        label="Identity Type"
        error={errors?.identityType?.message}
        id="identityType"
      >
        <StyledSelect id="identityType" {...register("identityType")}>
          {IdentityTypeOption.map((opt) => (
            <option value={opt.value} key={opt.value}>
              {opt.label}
            </option>
          ))}
        </StyledSelect>
      </FormRow>
      <FormRow
        label="Identity Type Number"
        error={errors?.identityTypeNumber?.message}
        id="identityTypeNumber"
      >
        <Input
          type="text"
          id="identityTypeNumber"
          {...register("identityTypeNumber")}
        />
      </FormRow>
      <FormRow>
        <Button variation="danger" type="reset" onClick={() => closeModal?.()}>
          Cancel
        </Button>
        <Button type="submit" variation="primary" disabled={isCreating}>
          Add
        </Button>
      </FormRow>
    </Form>
  );
}

export default GuestRegisterForm;
