import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MapPage from "./pages/MapPage";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import SignUpRenew from "./pages/SignUpRenew";

import { Global } from "@emotion/react";
// import { globalStyles } from "./styles/global.styles";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/auth/signin" element={<Login />} />
        <Route path="/auth/signup" element={<SignUpRenew />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
