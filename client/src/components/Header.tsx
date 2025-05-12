import { Button } from "./ui/button";
import { NavMenu } from "./NavMenu";

export function Header() {
  return (
    <header className="bg-accent-foreground/70 text-background relative flex w-full max-w-full items-center justify-end rounded-md py-3 shadow-xs backdrop-blur-sm">
      <div className="bg-background absolute top-[em] left-[-0.25rem] rounded-r-full p-3">
        <div className="bg-foreground rounded-full p-2 py-[0.8rem] font-bold">
          logo
        </div>
      </div>
      <nav className="flex w-full items-center justify-end gap-4 pr-4 md:flex-row-reverse md:justify-between md:pl-30">
        <div className="flex gap-4">
          <Button className="px-6 py-5.5 font-bold" variant="secondary">
            Entrar
          </Button>
          <Button className="dark:text-foreground bg-transparent py-5.5 font-bold md:px-6">
            Cadastrar
          </Button>
        </div>

        <NavMenu />
      </nav>
    </header>
  );
}
