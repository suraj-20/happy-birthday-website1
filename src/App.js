import React from "react";
import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HappyBirthday from "./pages/HappyBirthday";

function App() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#737375bf] text-3xl font-bold">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/HappyBirthday" element={<HappyBirthday />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
