import styled, { css } from "styled-components";

const Heading = styled.h1`
  ${(props) =>
    props.type === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `}
  ${(props) =>
    props.type === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 500;
    `}
    ${(props) =>
    props.type === "h3" &&
    css`
      font-size: 2rem;
      font-weight: 400;
    `}
    ${(props) =>
    props.type === "h4" &&
    css`
      font-size: 2rem;
      text-align: center;
      font-weight: 500;
    `}
    ${(props) =>
    props.type === "h-flex" &&
    css`
      font-size: 1.8rem;
      font-weight: bold;
      display: flex;
      width: 100%;
      justify-content: space-between;
      /* gap: 2rem; */
    `}
`;
export default Heading;
