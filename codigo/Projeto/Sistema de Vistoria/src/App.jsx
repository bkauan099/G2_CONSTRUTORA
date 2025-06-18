import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inicial from "./pages/Inicial/Inicial";
import Login from "./pages/Login/login";
import Home from "./pages/HomeAdm/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Inicial />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

