/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useUser } from "../features/authentication/useUser";
import Spinner from "../ui/Spinner";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
const FullPage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: var(--color-grey-50);
`;
export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  //1. Load the authenticated user
  const { isLoading, isAuthenticated } = useUser();

  //2. if there is no authenticated user redirect to the login page
  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login");
  }, [isAuthenticated, isLoading, navigate]);

  //3. while loading , showing the spinner element
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  //4. if there is a authenticated user render the app
  if (isAuthenticated) return children;
}
