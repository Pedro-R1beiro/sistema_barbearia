import { ContactButton } from "@/components/ContactButton";
import { Button } from "@/components/ui/button";
import {
  faGithub,
  faInstagram,
  faLinkedin,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { Link, Outlet } from "react-router";

export function SignInLayout() {
  return (
    <>
      <div className="grid min-h-screen w-full md:grid-cols-2">
        <div className="flex min-h-[80dvh] max-w-6xl flex-col items-center justify-center bg-white p-3 py-20 md:col-1">
          <Outlet />
        </div>
        <div className="dark:text-foreground dark:bg-background bg-muted-foreground mt-12 flex flex-col p-3 pt-20 text-center md:col-2">
          <h1 className="text-4xl font-bold">Faça Login</h1>
          <p className="py-6 text-2xl">
            Inicie sua sessão para conferir ou marcar novos horários
          </p>
          <div className="flex max-h-6 items-center justify-center gap-3">
            <ContactButton
              link="instagram.com"
              icon={faInstagram}
              variant="tertiary"
            />
            <ContactButton
              link="whatsapp.api.client"
              icon={faWhatsapp}
              variant="tertiary"
            />
          </div>

          <div className="border-muted-foreground dark:border-muted-background mx-auto my-10 w-50 border-t" />

          <Button className="mx-auto mb-12 max-w-50">
            <Link to="/register">Não tenho uma conta</Link>
          </Button>
          <span className="mt-auto flex items-center gap-2 text-sm">
            © Desenvolvido por Pedro Ribeiro
            <ContactButton
              link="linkedIn.api.client"
              icon={faLinkedin}
              size="sm"
            />
            <ContactButton link="github.api.client" icon={faGithub} size="sm" />
          </span>
        </div>
      </div>
    </>
  );
}
