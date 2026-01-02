import styled from "styled-components";
import { Link } from "react-router-dom";

const Nav = styled.nav`
  display: flex;
  gap: 30px;
  padding: 10px 30px;
  background: #020617;
`;

const NavItem = styled(Link)`
  cursor: pointer;
  font-size: 18px;
  color: white;
  text-decoration: none;

  &:hover {
    color: #22c55e;
  }
`;

export default function Navbar() {
  return (
    <Nav>
      <NavItem to="/">Home</NavItem>
      <NavItem to="/heattracker">Heat Tracker</NavItem>
    </Nav>
  );
}
