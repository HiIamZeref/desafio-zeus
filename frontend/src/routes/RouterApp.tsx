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
        {
          path: "new",
          element: <h1>Eu tentei fazer uma nova página</h1>,
        },
      ],
      errorElement: <ErrorPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default RouterApp;
