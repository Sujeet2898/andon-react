import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import AndonTable from "./components/AndonTable";
import HeatTracker from "./components/HeatTracker";
import CompletedHeat from "./components/CompletedHeat";
import Footer from "./components/Footer";

import styled from "styled-components";

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContentWrapper = styled.main`
  flex: 1;
`;

export default function App() {
  const [heats, setHeats] = useState([]);
  const [completedHeats, setCompletedHeats] = useState([]);

  return (
    <BrowserRouter>
      <GlobalStyles />
      <AppWrapper>
        <Header />

        <ContentWrapper>
          <Navbar />

          <Routes>
            <Route
              path="/"
              element={
                <AndonTable
                  heats={heats}
                  setHeats={setHeats}
                  completedHeats={completedHeats}
                  setCompletedHeats={setCompletedHeats}
                />
              }
            />
            <Route
              path="/heattracker"
              element={<HeatTracker heats={heats} />}
            />
            <Route
              path="/completedheat"
              element={<CompletedHeat heats={completedHeats} />}
            />
          </Routes>
        </ContentWrapper>

        <Footer />
      </AppWrapper>
    </BrowserRouter>
  );
}
