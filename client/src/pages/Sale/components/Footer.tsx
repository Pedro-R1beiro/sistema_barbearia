import { useNavigate } from "react-router";

import { Title } from "./Title";
import { ContactButton } from "@/components/ContactButton";
import { PrivacyPoliciesDialog } from "@/components/PrivacyPoliciesDialog";
import { Button } from "@/components/ui/button";
import {
  faGithub,
  faInstagram,
  faLinkedin,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer
      id="contact"
      className="bg-muted relative mt-20 w-full space-y-10 rounded-t-lg p-8 md:p-12"
    >
      <Title
        title="Entre em contato"
        text="Fale diretamente com nosso estabelecimento"
      />
      <div className="w-full pb-15 space-y-10 md:flex items-center md:mt-20">
        <ul className="flex min-w-100/230 mt-16 flex-col md:mt-0 md:mb-0 items-center justify-between gap-6 md:min-w-100/260 md:items-start md:justify-start">
          <li>
            <div className="flex flex-col items-center gap-6 md:flex-row">
              <ContactButton link="instagram.com" icon={faInstagram} />
              <span>@seu_instagram</span>
            </div>
          </li>
          <li>
            <div className="flex flex-col items-center gap-6 md:flex-row">
              <ContactButton link="whasapp.api.client" icon={faWhatsapp} />
              <span>(79) 9 9999-9999</span>
            </div>
          </li>
          <li>
            <div className="flex flex-col items-center gap-6 md:flex-row">
              <ContactButton link="gmail@client" icon={faEnvelope} />
              <span>seu-email@gmail.com</span>
            </div>
          </li>
        </ul>

        <div className="bg-muted-foreground/50 mx-auto h-0.5 w-[10rem] md:h-50 md:w-0.5 md:mb-0"></div>

        <div className="mb-30 md:min-w-100/260 md:mb-0">
          <div className="flex flex-col items-center gap-4">
            <Button
              onClick={() => navigate("/sign-up")}
              className="w-full py-5.5 font-bold md:py-7"
            >
              Criar minha conta
            </Button>
            <Button
              onClick={() => navigate("/sign-in")}
              variant="outline"
              className="w-full py-5.5 font-bold md:py-7"
            >
              Entrar com minha conta
            </Button>
            <p className="text-center md:text-right mt-1 text-sm">
              Veja nossas{" "}
              <PrivacyPoliciesDialog className="cursor-pointer underline duration-300 hover:scale-102">
                políticas de privacidade.
              </PrivacyPoliciesDialog>
            </p>
          </div>

          <div className="absolute bottom-0 left-2 flex w-full flex-col items-center">
            <p className="flexflex-col items-center text-center">
              &copy; 2025 Barber Shop. <br className="sm:hidden" /> Todos os
              direitos reservados.
            </p>
            <span className="mt-6 flex items-center gap-2 text-center md:mt-0">
              Desenvolvido por Pedro Ribeiro
              <ContactButton
                size="sm"
                link="https://github.com/Pedro-R1beiro"
                icon={faGithub}
              />
              <ContactButton
                size="sm"
                link="linkedIn.developer.com"
                icon={faLinkedin}
              />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
