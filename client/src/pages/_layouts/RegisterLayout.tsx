import { Outlet, useNavigate } from "react-router";

import { ContactButton } from "@/components/ContactButton";
import { Button } from "@/components/ui/button";
import { scrollToTop } from "@/utils/scroll-to-top";
import {
  faGithub,
  faInstagram,
  faLinkedin,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { ArrowUp } from "lucide-react";

export function RegisterLayout() {
  const navigate = useNavigate();

  return (
    <>
      <div className="mx-auto grid min-h-screen max-w-full min-w-full overflow-x-hidden lg:max-h-screen lg:grid-cols-2 lg:overflow-hidden">
        <div className="relative flex max-h-screen min-h-screen min-w-full flex-col items-center justify-center bg-white p-3 pt-70 pb-100 lg:col-1 lg:min-h-screen">
          <Outlet />
        </div>
        <div className="dark:text-foreground dark:bg-background bg-muted-foreground relative z-1000 mt-12 flex min-h-screen flex-col items-center justify-center p-3 pt-20 text-center lg:col-2 lg:mt-0">
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

          <Button
            onClick={() => navigate("/sign-in")}
            className="mx-auto mb-12 w-full max-w-50 lg:max-w-65"
          >
            Já tenho uma conta
          </Button>
          <span className="flex items-center gap-2 text-sm">
            © Desenvolvido por Pedro Ribeiro
            <ContactButton
              link="linkedIn.api.client"
              icon={faLinkedin}
              size="sm"
            />
            <ContactButton link="github.api.client" icon={faGithub} size="sm" />
          </span>

          <button
            onClick={scrollToTop}
            className="bg-foreground text-background mt-6 cursor-pointer rounded-full p-1 lg:hidden"
          >
            <p className="sr-only">Ir para o topo da página</p>
            <ArrowUp />
          </button>
          <span className="mt-2 text-[0.75rem] lg:hidden">
            Ir para o topo da página
          </span>
        </div>
      </div>
    </>
  );
}
