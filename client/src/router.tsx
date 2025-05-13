import { createBrowserRouter } from "react-router";
import { Sale } from "./pages/Sale";
import { SaleLayout } from "./pages/_layouts/SaleLayout";
import { SignInLayout } from "./pages/_layouts/SignInLayout";
import SingIn from "./pages/auth/SigIn";
import { RegisterLayout } from "./pages/_layouts/RegisterLayout";
import Register from "./pages/auth/Register";
import { UserLayout } from "./pages/_layouts/UserLayout";
import UserDashboard from "./pages/user/UserDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <SaleLayout />,
    children: [{ path: "/", element: <Sale /> }],
  },
  {
    path: "/",
    element: <SignInLayout />,
    children: [{ path: "/sign-in", element: <SingIn /> }],
  },
  {
    path: "/",
    element: <RegisterLayout />,
    children: [{ path: "/register", element: <Register /> }],
  },
  {
    path: "/",
    element: <UserLayout/>,
    children: [{path: "/dashboard", element:<UserDashboard/>}]
  }
]);
