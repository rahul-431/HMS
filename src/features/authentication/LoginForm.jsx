import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRow from "../../ui/FormRow";
import useLogin from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";

function LoginForm() {
  const [email, setEmail] = useState("user@user.com");
  const [password, setPassword] = useState("hellouser");
  const { isLoggingIn, loginUser } = useLogin();
  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    loginUser(
      { email, password },
      {
        onSettled: () => {
          setPassword("");
          setEmail("");
        },
      }
    );
  }
  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address" id="email" vertical={true}>
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRow>
      <FormRow label="Password" id="password" vertical={true}>
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRow>
      <FormRow>
        <Button size="large" disabled={isLoggingIn}>
          {!isLoggingIn ? "Login" : <SpinnerMini />}
        </Button>
      </FormRow>
    </Form>
  );
}

export default LoginForm;
