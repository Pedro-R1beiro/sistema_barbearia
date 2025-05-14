import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { NavLink, type NavLinkInterface } from "./NavLink";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

interface NavLinksProps {
  navLinks: NavLinkInterface[];
}

export function NavLinks({ navLinks }: NavLinksProps) {
  return (
    <>
      <ul className="hidden gap-7 py-3 font-bold md:flex">
        {navLinks.map((link) => (
          <li key={link.text}>
            <NavLink
              key={link.link}
              link={link.link}
              text={link.text}
              icon={link.icon}
              type={link.type}
            />
          </li>
        ))}
      </ul>

      <DropdownMenu>
        <DropdownMenuTrigger className="w-5 md:hidden">
          <FontAwesomeIcon icon={faEllipsisVertical} size="2x" />
          <span className="sr-only">Abrir Menu de Navegação</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="z-1000 mr-6 w-60 md:hidden">
          <DropdownMenuLabel>Navegação</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {navLinks.map((link) => (
            <DropdownMenuItem key={link.link}>
              <NavLink
                link={link.link}
                text={link.text}
                icon={link.icon}
                type={link.type}
              />
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
