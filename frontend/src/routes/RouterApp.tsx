import { createBrowserRouter, RouterProvider } from "react-router-dom";

import CadastroPage from "../pages/CadastroPage/CadastroPage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

function RouterApp() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <CadastroPage />,
      children: [],
      errorElement: (
        <div>
          <ErrorPage />
        </div>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default RouterApp;
