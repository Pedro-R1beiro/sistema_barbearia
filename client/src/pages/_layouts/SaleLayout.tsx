import { Header } from "@/components/Header";
import { Outlet } from "react-router";

export function SaleLayout() {
  return (
    <div className="overflow-x-hidden px-4 pt-6">
      <Header />
      <Outlet />
    </div>
  );
}
