import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

import CadastroPage from "../pages/CadastroPage/CadastroPage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import LoginPage from "@/pages/LoginPage/LoginPage";

function AppShell() {
  return (
    <div>
      <Outlet /> {/* This is where the child routes will be rendered */}
    </div>
  );
}

function RouterApp() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppShell />}>
          <Route index element={<LoginPage />} />
          <Route path="cadastro" element={<CadastroPage />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default RouterApp;
