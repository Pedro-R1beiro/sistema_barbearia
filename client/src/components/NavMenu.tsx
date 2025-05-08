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
      <DropdownMenu>
        <DropdownMenuTrigger className="w-5">
          <FontAwesomeIcon icon={faEllipsisVertical} size="lg" />
          <span className="sr-only">Abrir Menu de Navegação</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-6 w-60">
          <DropdownMenuLabel className="text-lg">Navegação</DropdownMenuLabel>
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
