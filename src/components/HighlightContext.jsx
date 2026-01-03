// components/HighlightContext.js
import { createContext, useContext } from "react";
import styled from "styled-components";

// 🎨 Styled highlight span
const Highlight = styled.span`
  background: linear-gradient(90deg, #facc15, #fcd34d); /* golden gradient */
  color: #111827; /* dark text for contrast */
  font-weight: bold;
  padding: 0 2px;
  border-radius: 3px;
`;

// 🌐 Context to hold the global search term
const HighlightContext = createContext("");

// 🪄 Hook to access search term anywhere
export const useHighlight = () => useContext(HighlightContext);

// 🛡️ Provider wraps your app and supplies the search term
export function HighlightProvider({ searchTerm, children }) {
  return (
    <HighlightContext.Provider value={searchTerm}>
      {children}
    </HighlightContext.Provider>
  );
}

// ✨ Component to highlight matching text
export function HighlightText({ children }) {
  const searchTerm = useHighlight();

  // If no search term or not a string, just render normally
  if (!searchTerm || typeof children !== "string") return children;

  // Regex to find matches (case-insensitive)
  const regex = new RegExp(`(${searchTerm})`, "gi");

  // Split text and wrap matches
  return children
    .split(regex)
    .map((part, i) =>
      regex.test(part) ? <Highlight key={i}>{part}</Highlight> : part
    );
}
