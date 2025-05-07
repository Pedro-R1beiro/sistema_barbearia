import { createBrowserRouter } from "react-router";
import { Sale } from "./pages/sale";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Sale />,
  },
]);
