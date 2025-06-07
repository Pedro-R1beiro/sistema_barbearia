import { createBrowserRouter } from "react-router";
import { Sale } from "./pages/Sale";
import { SaleLayout } from "./pages/_layouts/SaleLayout";
import { SignInLayout } from "./pages/_layouts/SignInLayout";
import { SignIn } from "./pages/auth/SignIn";
import { RegisterLayout } from "./pages/_layouts/RegisterLayout";
import { Register } from "./pages/auth/Register";
import { UserLayout } from "./pages/_layouts/UserLayout";
import { Account } from "./pages/app/user/Account";
import { NotFound } from "./pages/error/NotFound";
import { Dashboard } from "./pages/app/user/Dashboard";
import { ScheduleForm } from "./pages/app/user/ScheduleForm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <SaleLayout />,
    children: [{ path: "/", element: <Sale /> }],
  },
  {
    path: "/",
    element: <SignInLayout />,
    children: [{ path: "/sign-in", element: <SignIn /> }],
  },
  {
    path: "/",
    element: <RegisterLayout />,
    children: [{ path: "/sign-up", element: <Register /> }],
  },
  {
    path: "/",
    element: <UserLayout />,
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/profile", element: <Account /> },
      { path: "/to-schedule", element: <ScheduleForm /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
