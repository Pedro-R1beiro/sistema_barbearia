import { Button } from "./ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

export function Header() {
  return (
    <header className="bg-accent-foreground text-background relative flex items-center justify-end rounded-sm py-2">
      <div className="bg-background absolute top-[-1rem] left-[-1.2em] rounded-full p-3">
        <div className="bg-foreground rounded-full p-2 py-3.5">logo</div>
      </div>
      <nav className="flex items-center gap-4 px-4">
        <ul className="hidden">
          <li>Ínicio</li>
          <li>Serviços</li>
          <li>Contato</li>
        </ul>
        <Button className="font-bold" variant="secondary">
          Entrar
        </Button>
        <Button className="hover:bg-muted-foreground/30 bg-transparent font-bold">
          Cadastrar
        </Button>
        <FontAwesomeIcon icon={faEllipsisVertical} size="lg" />
      </nav>
    </header>
  );
}
