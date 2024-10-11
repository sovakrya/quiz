import { Route, Routes } from "react-router-dom";
import "./App.css";

import StartGame from "./components/StartGame";
import TheGame from "./components/TheGame";

function App() {
  
  return (
    <Routes>
      <Route path="/" element={<StartGame />}/>
      <Route path="/game" element={<TheGame />}/>
    </Routes>

  );
}

export default App;
