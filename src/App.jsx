import { useState } from "react";
import GlobalStyles from "./styles/GlobalStyles";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import AndonTable from "./components/AndonTable";
import Summary from "./components/Summary";

export default function App() {
  const [heats, setHeats] = useState([]);

  return (
    <>
      <GlobalStyles />
      <Header />
      <Navbar />
      <AndonTable heats={heats} setHeats={setHeats} />
      <Summary heats={heats} />
    </>
  );
}
