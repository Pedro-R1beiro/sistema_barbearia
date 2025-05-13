import { Button } from "./ui/button";
import { NavMenu } from "./NavMenu";
import { Link } from "react-router";
import {
  faBuilding,
  faHouse,
  faPhone,
  faScissors,
} from "@fortawesome/free-solid-svg-icons";
import type { NavLinkInterface } from "./NavLink";

const navLinks: NavLinkInterface[] = [
  { link: "/", text: "Ínicio", icon: faHouse, type: "anchorLink" },
  { link: "#about", text: "Sobre", icon: faBuilding, type: "anchorLink" },
  { link: "#services", text: "Serviços", icon: faScissors, type: "anchorLink" },
  { link: "#contact", text: "Contato", icon: faPhone, type: "anchorLink" },
];

export function Header() {
  return (
    <header className="bg-accent-foreground/70 text-background relative flex w-full max-w-full items-center justify-end rounded-md py-3 shadow-xs backdrop-blur-sm">
      <div className="bg-background absolute top-[em] left-[-0.25rem] rounded-r-full p-3">
        <div className="bg-foreground rounded-full p-2 py-[0.8rem] font-bold">
          logo
        </div>
      </div>
      <nav className="flex w-full items-center justify-end gap-4 pr-4 md:flex-row-reverse md:justify-between md:pl-30">
        <div className="flex gap-4">
          <Button className="px-6 py-5.5 font-bold" variant="secondary">
            <Link to="/sign-in">Entrar</Link>
          </Button>
          <Button className="dark:text-background text-foreground bg-transparent py-5.5 font-bold md:px-6">
            <Link to="/register">Cadastrar</Link>
          </Button>
        </div>

        <NavMenu navLinks={navLinks} />
      </nav>
    </header>
  );
}
