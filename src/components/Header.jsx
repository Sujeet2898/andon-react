import styled from "styled-components";
import logoImage from "../image/logo.png"; // adjust path if needed

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  padding: 15px 30px;
  background: #020617;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  font-size: 22px;
  font-weight: bold;
  color: #22c55e;
`;

const LogoImage = styled.img`
  height: 60px;
  width: 120px;
  margin-right: 12px;
`;

const DateText = styled.div`
  margin-left: auto;
  font-size: 18px;
  color: white;
`;

export default function Header() {
  return (
    <HeaderWrapper>
      <Logo>
        <LogoImage src={logoImage} alt="Company Logo" />
        PRA-Heat Aging Tracking System [HATS]
      </Logo>
      <DateText>{new Date().toLocaleString()}</DateText>
    </HeaderWrapper>
  );
}
