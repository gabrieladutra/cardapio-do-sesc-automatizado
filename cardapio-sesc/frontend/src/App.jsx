import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import MenuSemanal from "./MenuSemanal";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu-semanal" element={<MenuSemanal />} />
    </Routes>
  );
}