/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useSignup from "./useSignup";

// Email regex: /\S+@\S+\.\S+/

function SignupForm({ closeModal }) {
  const { register, handleSubmit, formState, getValues } = useForm();
  const { errors } = formState;
  const { signup, isSigningUp } = useSignup();
  const onSignup = (data) => {
    if (!data) return null;
    const { email, password, fullName } = data;
    signup(
      { email, password, fullName },
      {
        onSuccess: () => {
          closeModal?.();
        },
      }
    );
  };
  return (
    <Form
      onSubmit={handleSubmit(onSignup)}
      type={closeModal ? "modal" : "regular"}
    >
      <FormRow
        label="Full name"
        error={errors?.fullName?.message}
        id="fullName"
      >
        <Input
          type="text"
          id="fullName"
          {...register("fullName", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message} id="email">
        <Input
          type="email"
          id="email"
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
        id="password"
      >
        <Input
          type="password"
          id="password"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "password must be at least 8 character long",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Confirm password"
        error={errors?.passwordConfirm?.message}
        id="passwordConfirm"
      >
        <Input
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "Password did not match",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="danger" type="reset" onClick={() => closeModal?.()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSigningUp}>
          Create new user
        </Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
