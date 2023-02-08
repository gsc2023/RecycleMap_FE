import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

const Router: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<></>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
