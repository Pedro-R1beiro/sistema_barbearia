import { createBrowserRouter } from "react-router";
import { Sale } from "./pages/Sale";
import { SaleLayout } from "./pages/_layouts/SaleLayout";
import { SignInLayout } from "./pages/_layouts/SignInLayout";
import { SignIn } from "./pages/auth/SignIn";
import { RegisterLayout } from "./pages/_layouts/RegisterLayout";
import { Register } from "./pages/auth/Register";
import { UserLayout } from "./pages/_layouts/UserLayout";
import { UserProfile } from "./pages/app/user/UserProfile";
import { NotFound } from "./pages/errors/NotFound";
import { UserDashboard } from "./pages/app/user/UserDashboard";
import { UserScheduleForm } from "./pages/app/user/UserScheduleForm";

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
      { path: "/dashboard", element: <UserDashboard /> },
      { path: "/profile", element: <UserProfile /> },
      { path: "/to-schedule", element: <UserScheduleForm /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
