import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between; /* 🔍 Ensures links on left, search box on right */
  align-items: center;
  padding: 10px 30px;
  background: #020617;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 30px;
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

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  background: #1e293b;
  padding: 4px 8px;
  border-radius: 6px;
`;

const SearchInput = styled.input`
  border: none;
  background: transparent;
  color: white;
  outline: none;
  font-size: 14px;
`;

const SearchIcon = styled.span`
  margin-left: 8px;
  cursor: pointer;
  color: #22c55e;
`;

export default function Navbar({ onSearch }) {
  const [term, setTerm] = useState(""); // 🔍 Local state for search input

  return (
    <Nav>
      {/* 🔗 Navigation links */}
      <NavLinks>
        <NavItem to="/">Home</NavItem>
        <NavItem to="/heattracker">Heat Tracker</NavItem>
        <NavItem to="/completedheat">Completed Heat</NavItem>
      </NavLinks>

      {/* 🔍 Search box with input + icon */}
      <SearchWrapper>
        <SearchInput
          type="text"
          placeholder="Search..."
          value={term}
          onChange={(e) => setTerm(e.target.value)} // 🔍 Capture typed search term
        />
        <SearchIcon onClick={() => onSearch(term)}>🔍</SearchIcon>{" "}
        {/* 🔍 Send term up to App.jsx */}
      </SearchWrapper>
    </Nav>
  );
}
