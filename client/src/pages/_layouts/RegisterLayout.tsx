import { ContactButton } from "@/components/ContactButton";
import { Button } from "@/components/ui/button";
import {
  faGithub,
  faInstagram,
  faLinkedin,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { Link, Outlet } from "react-router";

export function RegisterLayout() {
  return (
    <>
      <div className="grid min-h-screen w-full lg:grid-cols-2">
        <div className="relative flex min-h-[110dvh] max-w-6xl flex-col items-center justify-center bg-white p-3 pt-70 pb-100 lg:col-1 lg:pt-70">
          <Outlet />
        </div>
        <div className="dark:text-foreground dark:bg-background bg-muted-foreground mt-12 flex flex-col p-3 pt-20 text-center lg:col-2">
          <h1 className="text-4xl font-bold">Crie sua conta</h1>
          <p className="py-6 text-2xl">
            Faça seu cadastro para <br /> fazer agendamentos.
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

          <div className="border-muted-foreground dark:border-muted-background mx-auto my-10 w-50 border-t lg:my-25 lg:w-75" />

          <Button className="mx-auto mb-12 w-full max-w-50 lg:max-w-65">
            <Link to="/sign-in">Já tenho uma conta</Link>
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
