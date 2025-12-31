import styled from "styled-components";

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  padding: 15px 30px;
  background: #020617;
`;

const Logo = styled.div`
  font-size: 26px;
  font-weight: bold;
  color: #22c55e;
`;

const DateText = styled.div`
  margin-left: auto;
  font-size: 18px;
`;

export default function Header() {
  return (
    <HeaderWrapper>
      <Logo>🏭 ANDON SYSTEM</Logo>
      <DateText>{new Date().toLocaleString()}</DateText>
    </HeaderWrapper>
  );
}
