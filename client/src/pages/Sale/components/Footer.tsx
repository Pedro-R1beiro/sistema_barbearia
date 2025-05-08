import { ContactButton } from "@/components/ContactButton";
import { Button } from "@/components/ui/button";
import {
  faGithub,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

export default function Footer() {
  return (
    <footer className="bg-muted absolute left-0 mt-20 w-full space-y-10 rounded-t-lg p-8">
      <ul className="flex flex-col items-center justify-between gap-6">
        <li>
          <div className="flex flex-col items-center gap-6">
            <ContactButton link="instagram.com" icon={faInstagram} />
            <span>@seu_instagram</span>
          </div>
        </li>
        <li>
          <div className="flex flex-col items-center gap-6">
            <ContactButton link="whasapp.api.client" icon={faInstagram} />
            <span>(79) 9 9999-9999</span>
          </div>
        </li>
        <li>
          <div className="flex flex-col items-center gap-6">
            <ContactButton link="gmail@client" icon={faEnvelope} />
            <span>seu-email@gmail.com</span>
          </div>
        </li>
      </ul>

      <div className="border-accent-foreground mx-auto w-[10rem] border-t"></div>

      <div className="flex flex-col items-center gap-4">
        <Button className="w-full py-5.5 font-bold">Criar minha conta</Button>
        <Button variant={"outline"} className="w-full py-5.5 font-bold">
          Entrar com minha conta
        </Button>
      </div>

      <div>
        <p className="flex flex-col items-center text-center">
          &copy; 2025 Barber Shop. Todos os direitos reservados.
          <span className="mt-6 flex items-center gap-2 text-center">
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
        </p>
      </div>
    </footer>
  );
}
