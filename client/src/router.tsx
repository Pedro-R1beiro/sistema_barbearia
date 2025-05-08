import { createBrowserRouter } from "react-router";
import { Sale } from "./pages/Sale/Sale";
import { SaleLayout } from "./pages/_layouts/SaleLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <SaleLayout />,
    children: [{ path: "/", element: <Sale /> }],
  },
]);
