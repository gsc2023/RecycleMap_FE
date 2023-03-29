import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MapPage from './pages/MapPage';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
// import SignUp from './pages/SignUp';
import SignUpRenew from './pages/SignUpRenew';
import ReportList from './pages/ReportList';
import SendReport from './pages/SendReport';
// import { globalStyles } from "./styles/global.styles";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/map" element={<MapPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/auth/signin" element={<Login />} />
        <Route path="/auth/signup" element={<SignUpRenew />} />
        <Route path="/report" element={<ReportList />}></Route>
        <Route path="/report/send" element={<SendReport />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
