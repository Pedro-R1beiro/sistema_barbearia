import { ContactButton } from "@/components/ContactButton";
import { Button } from "@/components/ui/button";
import {
  faGithub,
  faInstagram,
  faLinkedin,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

export default function Footer() {
  return (
    <footer className="bg-muted absolute left-0 mt-20 w-full space-y-10 rounded-t-lg p-8 md:flex">
      <ul className="flex min-w-100/230 flex-col items-center justify-between gap-6 md:items-start md:justify-start">
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

      <div className="bg-muted-foreground mx-auto h-0.5 w-[10rem] md:h-70 md:w-0.5"></div>

      <div className="md:max-w-100/200">
        <div className="flex flex-col items-center gap-4">
          <Button className="w-full py-5.5 font-bold">Criar minha conta</Button>
          <Button variant={"outline"} className="w-full py-5.5 font-bold">
            Entrar com minha conta
          </Button>
          <p>
            Veja nossas{" "}
            <a href="" className="underline">
              políticas de privacidade.
            </a>
          </p>
        </div>

        <div className="absolute bottom-0 left-2 flex w-full flex-col items-center">
          <p className="flexflex-col items-center text-center">
            &copy; 2025 Barber Shop. Todos os direitos reservados.
          </p>
          <span className="mt-6 flex items-center gap-2 text-center md:mt-0">
            Desenvolvido por Pedro Ribeiro
            <ContactButton
              size="lg"
              link="https://github.com/Pedro-R1beiro"
              icon={faGithub}
            />
            <ContactButton
              size="lg"
              link="linkedIn.developer.com"
              icon={faLinkedin}
            />
          </span>
        </div>
      </div>
    </footer>
  );
}
