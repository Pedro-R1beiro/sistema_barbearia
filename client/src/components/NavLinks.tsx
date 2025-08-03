import { Link, useLocation, useNavigate } from "react-router";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  type IconLookup,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface NavLinksProps {
  navLinks: NavLinkInterface[];
}

export interface NavLinkInterface {
  link: string;
  text: string;
  icon: IconLookup;
  type: "reactLink" | "anchorLink";
}

export function NavLinks({ navLinks }: NavLinksProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <>
      <ul className="hidden gap-7 font-bold min-[900px]:flex">
        {navLinks.map((link) => (
          <li key={link.text} className="w-full">
            {link.type === "reactLink" ? (
              <Link
                data-currenty={pathname === link.link}
                to={link.link}
                className={cn(
                  "hover:bg-muted/10 w-full space-x-2.5 rounded-md p-2 whitespace-nowrap duration-200",
                  "data-[currenty=true]:bg-muted/10",
                )}
              >
                <FontAwesomeIcon icon={link.icon} />
                <span>{link.text}</span>
              </Link>
            ) : (
              <a
                href={link.link}
                className={cn(
                  "hover:bg-muted/10 w-full space-x-2.5 rounded-md p-2 whitespace-nowrap duration-200",
                  "data-[currenty=true]:bg-muted/10",
                )}
              >
                <FontAwesomeIcon icon={link.icon} />
                <span>{link.text}</span>
              </a>
            )}
          </li>
        ))}
      </ul>

      <DropdownMenu>
        <DropdownMenuTrigger className="w-8 min-[900px]:hidden">
          <FontAwesomeIcon icon={faEllipsisVertical} size="xl" />
          <span className="sr-only">Abrir Menu de Navegação</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="z-1000 mr-6 w-60 min-[900px]:hidden">
          <DropdownMenuLabel>Navegação</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {navLinks.map((link) => (
            <>
              {link.type === "reactLink" ? (
                <DropdownMenuItem
                  onClick={() => navigate(link.link)}
                  key={link.link}
                  className="hover:bg-muted/10 w-full space-x-2.5 rounded-md p-2 whitespace-nowrap duration-100"
                >
                  <FontAwesomeIcon icon={link.icon} />
                  <span>{link.text}</span>
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem asChild>
                  <a
                    href={link.link}
                    className="hover:bg-muted/10 w-full space-x-2.5 rounded-md p-2 whitespace-nowrap duration-200"
                  >
                    <FontAwesomeIcon icon={link.icon} />
                    <span>{link.text}</span>
                  </a>
                </DropdownMenuItem>
              )}
            </>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
