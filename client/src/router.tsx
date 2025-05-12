import { createBrowserRouter } from "react-router";
import { Sale } from "./pages/Sale";
import { SaleLayout } from "./pages/_layouts/SaleLayout";
import { SignInLayout } from "./pages/_layouts/SignInLayout";
import SingIn from "./pages/auth/SigIn";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <SaleLayout />,
    children: [{ path: "/", element: <Sale /> }],
  },
  {
    path: "/",
    element: <SignInLayout />,
    children: [{ path: "/Sign-in", element: <SingIn /> }],
  },
]);
