import { Header } from "@/components/Header";
import { Outlet } from "react-router";
import { Home } from "../Sale/components/Home";

export function SaleLayout() {
  return (
    <>
      <div className="fixed top-5 left-1/2 z-100 w-full max-w-6xl translate-x-[-50%] px-4">
        <Header />
      </div>
      <Home />
      <div className="relative mx-auto max-w-6xl px-4 pt-6">
        <Outlet />
      </div>
    </>
  );
}
