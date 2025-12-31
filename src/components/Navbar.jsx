import styled from "styled-components";

const Nav = styled.nav`
  display: flex;
  gap: 30px;
  padding: 10px 30px;
  background: #020617;
`;

const NavItem = styled.div`
  cursor: pointer;
  font-size: 18px;
  &:hover {
    color: #22c55e;
  }
`;

export default function Navbar() {
  return (
    <Nav>
      <NavItem>Main</NavItem>
      <NavItem>Heat Tracking</NavItem>
      <NavItem>Reports</NavItem>
      <NavItem>Settings</NavItem>
    </Nav>
  );
}
