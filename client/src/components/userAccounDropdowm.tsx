import { useNavigate } from "react-router";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { signOut } from "@/api/sign-out";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation } from "@tanstack/react-query";
import { Cog, LogOut } from "lucide-react";
import { toast } from "sonner";

export function UserAccounDropdowm() {
  const navigate = useNavigate();
  const { mutateAsync: signOutFn } = useMutation({
    mutationFn: signOut,
  });

  function handleSignOut() {
    try {
      signOutFn();
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
      toast.error("Houve um erro interno. Tente novamente mais tarde");
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex cursor-pointer text-neutral-400 border-sidebar border-2 hover:bg-sidebar duration-200 hover:text-foreground text-sm items-center gap-3 rounded-md py-2 px-5 font-bold">
        <FontAwesomeIcon icon={faUser} className="text-lg" />
        <span>usuário</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-1000">
        <DropdownMenuLabel>Conta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate("/profile")}>
          <Cog />
          Configurações
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={handleSignOut}
          className="text-destructive hover:text-destructive/90 dark:hover:text-destructive/90"
        >
          <LogOut className="text-destructive" />
          Sair da conta
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
