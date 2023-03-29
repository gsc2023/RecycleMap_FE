import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MapPage from "./pages/MapPage";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
// import SignUp from './pages/SignUp';
import SignUpRenew from "./pages/SignUpRenew";
import ReportList from "./pages/ReportList";
import SendReport from "./pages/SendReport";
import axios from "./lib/axios";
import { useBookmarkStore } from "./store";
import Mypage from "./pages/Mypage";
import LDrawer from "./pages/LDrawer";
import { Box } from "@mui/material";
import Detector from "./pages/Detector";
// import { globalStyles } from "./styles/global.styles";

const App: React.FC = () => {
  const { initBookMarks } = useBookmarkStore();

  useEffect(() => {
    axios
      .get("/bookmarks/")
      .then((r) => initBookMarks(r.data.map((i: any) => i.ID)));
  }, [initBookMarks]);

  return (
    <BrowserRouter>
      <LDrawer />
      <Box sx={{ marginLeft: '100px' }}>
        <Routes>
          <Route path="/map" element={<MapPage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/auth/signin" element={<Login />} />
          <Route path="/auth/signup" element={<SignUpRenew />} />
          <Route path="/report" element={<ReportList />}></Route>
          <Route path="/report/send" element={<SendReport />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/detect" element={<Detector />} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
};

export default App;
