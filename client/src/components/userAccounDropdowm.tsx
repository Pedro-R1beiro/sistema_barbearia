import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { Cog, LogOut } from "lucide-react";

export default function UserAccounDropdowm() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="bg-custom-foreground flex cursor-pointer items-center gap-4 rounded-md p-2 px-4 font-bold md:order-2">
        <FontAwesomeIcon icon={faUser} className="text-lg" />
        <span>UserName</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-1000">
        <DropdownMenuLabel>Conta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Cog />
          Configurações
        </DropdownMenuItem>
        <DropdownMenuItem className="text-destructive">
          <LogOut className="text-destructive" />
          Sair da conta
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
