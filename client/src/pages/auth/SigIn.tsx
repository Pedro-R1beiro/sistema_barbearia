import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function SigIn() {
  return (
    <>
      <Button
        className="dark:text-background dark:border-background/20 dark:bg-foreground dark:hover:bg-background/5 absolute top-5 right-5"
        variant="outline"
      >
        <Link to="/register">Não tem uma conta?</Link>
      </Button>
      <div className="border-foreground/80 dark:border-background/80 absolute mt-20 rounded-full border-2 p-15 px-26">
        <form className="dark:text-background relative mx-auto flex max-w-50 flex-col gap-1 text-center font-bold">
          <div className="border-r-muted-foreground pointer-events-none absolute top-[-4.5rem] left-1/2 h-110 w-110 translate-x-[-50%] animate-[spin_1s_ease-in-out_infinite] rounded-full border-r-2"></div>
          <label htmlFor="email">Seu e-mail</label>
          <input
            id="email"
            type="email"
            placeholder="example@gmail.com"
            className="bg-muted dark:bg-muted-foreground/20 rounded-md p-2.5 placeholder:text-[0.75rem]"
          />

          <label htmlFor="password" className="mt-6">
            Seu e-mail
          </label>
          <input
            id="password"
            type="password"
            placeholder="********"
            className="bg-muted dark:bg-muted-foreground/20 rounded-md p-2.5 placeholder:text-[0.75rem]"
          />

          <Button className="dark:bg-background dark:hover:bg-background/90 dark:text-foreground mt-10 mb-3 py-5">
            Entrar
          </Button>
          <p className="text-sm font-medium underline">Esqueci minha senha</p>
        </form>
      </div>
    </>
  );
}
