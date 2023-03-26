import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MapPage from './pages/MapPage';
import NotFound from './pages/NotFound';
import ReportList from './pages/ReportList';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/map" element={<MapPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/report" element={<ReportList />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
