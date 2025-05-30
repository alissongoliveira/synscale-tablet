import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Acompanhar from "./pages/Acompanhar";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/acompanhar" element={<Acompanhar />} />
    </Routes>
  );
}

export default App;
