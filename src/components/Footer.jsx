import styled from "styled-components";

const FooterWrapper = styled.footer`
  background: #020617;
  color: #94a3b8;
  text-align: center;
  padding: 12px 20px;
  font-size: 14px;
`;

export default function Footer() {
  return (
    <FooterWrapper>
      © {new Date().getFullYear()} Team OpEx. All rights reserved.
    </FooterWrapper>
  );
}
