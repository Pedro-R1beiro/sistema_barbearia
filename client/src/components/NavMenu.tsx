import {
  faBuilding,
  faEllipsisVertical,
  faHouse,
  faPhone,
  faScissors,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function NavMenu() {
  return (
    <>
      <ul className="hidden gap-7 font-bold md:flex">
        <li>
          <a href="#" className="space-x-2">
            <FontAwesomeIcon icon={faHouse} />
            <span>Ínicio</span>
          </a>
        </li>
        <li>
          <a href="#about" className="space-x-2">
            <FontAwesomeIcon icon={faBuilding} />
            <span>Sobre</span>
          </a>
        </li>
        <li>
          <a href="#services" className="space-x-2">
            <FontAwesomeIcon icon={faScissors} />
            <span>Serviços</span>
          </a>
        </li>
        <li>
          <a href="#contact" className="space-x-2">
            <FontAwesomeIcon icon={faPhone} />
            <span>Contato</span>
          </a>
        </li>
      </ul>

      <DropdownMenu>
        <DropdownMenuTrigger className="w-5 md:hidden">
          <FontAwesomeIcon icon={faEllipsisVertical} size="lg" />
          <span className="sr-only">Abrir Menu de Navegação</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-6 w-60">
          <DropdownMenuLabel>Navegação</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <FontAwesomeIcon icon={faHouse} />
            Ínicio
          </DropdownMenuItem>
          <DropdownMenuItem>
            <FontAwesomeIcon icon={faBuilding} />
            Sobre
          </DropdownMenuItem>
          <DropdownMenuItem>
            <FontAwesomeIcon icon={faScissors} />
            Serviços
          </DropdownMenuItem>
          <DropdownMenuItem>
            <FontAwesomeIcon icon={faPhone} />
            Contato
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
