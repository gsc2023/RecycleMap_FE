import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MapPage from "./pages/MapPage";
import NotFound from "./pages/NotFound";
import Mypage from "./pages/Mypage";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/map" element={<MapPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/mypage" element={<Mypage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
