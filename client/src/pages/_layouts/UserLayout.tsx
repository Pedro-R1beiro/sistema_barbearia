import { Header } from "@/components/Header";
import type { NavLinkInterface } from "@/components/NavLink";
import { NavLinks } from "@/components/NavLinks";
import { faBook, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { Outlet } from "react-router";

const navLinks: NavLinkInterface[] = [
  { icon: faBook, link: "/", text: "Agendamentos", type: "anchorLink" },
  { icon: faCalendarDays, link: "/", text: "Agendar", type: "anchorLink" },
];

export function UserLayout() {
  return (
    <>
      <div className="fixed top-5 left-1/2 z-100 w-full max-w-6xl translate-x-[-50%] px-4">
        <Header className="bg-foreground">
          <NavLinks navLinks={navLinks} />
        </Header>
      </div>
      <div className="mx-auto min-h-screen max-w-6xl px-4 pt-30">
        <Outlet />
      </div>
    </>
  );
}
