import { signOut } from "@/api/sign-out";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation } from "@tanstack/react-query";
import { Cog, LogOut } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

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
      <DropdownMenuTrigger className="bg-custom-foreground flex cursor-pointer items-center gap-4 rounded-md p-2 px-4 font-bold">
        <FontAwesomeIcon icon={faUser} className="text-lg" />
        <span>UserName</span>
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
