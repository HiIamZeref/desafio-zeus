import { createBrowserRouter, RouterProvider } from "react-router-dom";

import CadastroPage from "../pages/CadastroPage/CadastroPage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

function RouterApp() {
  const router = createBrowserRouter([
    {
      path: "/",

      children: [
        {
          path: "",
          element: <CadastroPage />,
        },
      ],
      errorElement: <ErrorPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default RouterApp;
