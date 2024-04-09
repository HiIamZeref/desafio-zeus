import { BrowserRouter, Routes, Route } from "react-router-dom";

import CadastroPage from "../pages/CadastroPage/CadastroPage";

function RouterApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CadastroPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default RouterApp;
