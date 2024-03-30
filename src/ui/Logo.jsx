import styled from "styled-components";
import image from "../data/img/logo-light.png";
const StyledLogo = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;
function Logo() {
  return (
    <StyledLogo>
      <Img src={image} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
