import { Button } from "./ui/button";
import { NavMenu } from "./NavMenu";

export function Header() {
  return (
    <header className="bg-accent-foreground text-background relative flex items-center justify-end rounded-sm py-3 shadow-xs">
      <div className="bg-background absolute top-[-0.75rem] left-[-1.2rem] rounded-full p-3">
        <div className="bg-foreground rounded-full p-2 py-3.5 font-bold">
          logo
        </div>
      </div>
      <nav className="flex w-full items-center justify-end gap-4 pr-2 md:flex-row-reverse md:justify-between md:pl-30">
        <div className="flex gap-4">
          <Button className="font-bold" variant="secondary">
            Entrar
          </Button>
          <Button className="hover:bg-muted-foreground/30 bg-transparent font-bold">
            Cadastrar
          </Button>
        </div>

        <NavMenu />
      </nav>
    </header>
  );
}
