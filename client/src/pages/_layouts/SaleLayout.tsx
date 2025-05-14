import { Header } from "@/components/Header";
import { Outlet } from "react-router";
import { Home } from "../Sale/components/Home";
import {
  faBuilding,
  faHouse,
  faPhone,
  faScissors,
} from "@fortawesome/free-solid-svg-icons";
import type { NavLinkInterface } from "@/components/NavLink";

const navLinks: NavLinkInterface[] = [
  { link: "/", text: "Ínicio", icon: faHouse, type: "anchorLink" },
  { link: "#about", text: "Sobre", icon: faBuilding, type: "anchorLink" },
  { link: "#services", text: "Serviços", icon: faScissors, type: "anchorLink" },
  { link: "#contact", text: "Contato", icon: faPhone, type: "anchorLink" },
];

export function SaleLayout() {
  return (
    <>
      <div className="fixed top-5 left-1/2 z-100 w-full max-w-6xl translate-x-[-50%] px-4">
        <Header navLinks={navLinks} />
      </div>
      <Home />
      <div className="relative mx-auto max-w-6xl px-4 pt-6">
        <Outlet />
      </div>
    </>
  );
}
