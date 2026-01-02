import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import AndonTable from "./components/AndonTable";
import Summary from "./components/Summary";
import HeatTracker from "./components/HeatTracker";
import Footer from "./components/Footer";

import styled from "styled-components";

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* full viewport height */
`;

const ContentWrapper = styled.main`
  flex: 1; /* pushes footer to bottom if content is short */
`;

export default function App() {
  const [heats, setHeats] = useState([]);

  return (
    <BrowserRouter>
      <GlobalStyles />
      <AppWrapper>
        <Header />

        <ContentWrapper>
          {/* HeatTracker always visible inside Navbar */}
          <Navbar>
            <HeatTracker heats={heats} />
          </Navbar>

          <Routes>
            {/* Home route renders AndonTable */}
            <Route
              path="/"
              element={<AndonTable heats={heats} setHeats={setHeats} />}
            />

            {/* HeatTracker route renders HeatTracker as a full page */}
            <Route
              path="/heattracker"
              element={<HeatTracker heats={heats} />}
            />
          </Routes>

          {/* Summary always visible */}
          <Summary heats={heats} />
        </ContentWrapper>

        {/* Footer always at bottom */}
        <Footer />
      </AppWrapper>
    </BrowserRouter>
  );
}
