import { Header } from "@/components/Header";
import { NavLinks, type NavLinkInterface } from "@/components/NavLinks";
import { UserAccounDropdowm } from "@/components/UserAccounDropdowm";
import { faBook, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { Outlet } from "react-router";

const navLinks: NavLinkInterface[] = [
  {
    icon: faBook,
    link: "/dashboard",
    text: "Agendamentos",
    type: "reactLink",
  },
  {
    icon: faCalendarDays,
    link: "/to-schedule",
    text: "Agendar",
    type: "reactLink",
  },
];

export function UserLayout() {
  return (
    <>
      <div className="fixed top-5 left-1/2 z-100 w-full max-w-6xl translate-x-[-50%] px-4">
        <Header className="bg-foreground flex space-x-5 md:justify-between md:pl-30">
          <UserAccounDropdowm />
          <NavLinks navLinks={navLinks} />
        </Header>
      </div>
      <div className="mx-auto min-h-screen max-w-6xl px-4 pt-30">
        <Outlet />
      </div>
    </>
  );
}
