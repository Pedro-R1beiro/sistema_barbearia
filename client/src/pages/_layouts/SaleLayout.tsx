import { Header } from "@/components/Header";
import { NavLinks, type NavLinkInterface } from "@/components/NavLinks";
import { Button } from "@/components/ui/button";
import {
  faBuilding,
  faHouse,
  faPhone,
  faScissors,
} from "@fortawesome/free-solid-svg-icons";
import { Outlet, useNavigate } from "react-router";
import { Home } from "../Sale/components/Home";

const navLinks: NavLinkInterface[] = [
  { link: "#home", text: "Ínicio", icon: faHouse, type: "anchorLink" },
  { link: "#about", text: "Sobre", icon: faBuilding, type: "anchorLink" },
  { link: "#services", text: "Serviços", icon: faScissors, type: "anchorLink" },
  { link: "#contact", text: "Contato", icon: faPhone, type: "anchorLink" },
];

export function SaleLayout() {
  const navigate = useNavigate();
  return (
    <>
      <div className="fixed top-5 left-1/2 z-100 w-full max-w-6xl translate-x-[-50%] px-4">
        <Header>
          <nav className="flex w-full items-center justify-end gap-4 md:justify-between md:pl-30">
            <div className="flex gap-4">
              <Button
                onClick={() => navigate("/sign-in")}
                className="px-6 py-5.5 font-bold"
                variant="secondary"
              >
                Entrar
              </Button>
              <Button
                variant="ghost"
                onClick={() => navigate("/sign-up")}
                className="dark:text-background dark:hover:bg-foreground py-5.5 font-bold md:px-6"
              >
                Cadastrar
              </Button>
            </div>
            <NavLinks navLinks={navLinks} />
          </nav>
        </Header>
      </div>
      <Home />
      <div className="relative mx-auto max-w-6xl px-4 pt-6">
        <Outlet />
      </div>
    </>
  );
}
