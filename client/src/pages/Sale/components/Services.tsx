import CardServices from "./CardServices";

import manCuttingBeard from "@/assets/man-cutting-beard.svg";
import manCuttingHair from "@/assets/man-cutting-hair.svg";
import moustacheIcon from "@/assets/moustache-icon.svg";

import { ContactButton } from "@/components/ContactButton";
import { LinesWithOr } from "@/components/LinesWithOr";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";

import { faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from "react-router";

export default function Services() {
  const navigate = useNavigate();

  return (
    <section
      id="services"
      className="mt-130 space-y-4 text-center md:mt-30 md:h-screen md:pt-20 lg:mb-30"
    >
      <h1 className="mx-auto mb-6 flex w-fit gap-3 text-center text-4xl font-bold tracking-tight">
        BARBER SHOP{" "}
        <img
          src={moustacheIcon}
          alt="Ícone de bigode pontudo"
          className="dark:bg-background bg-foreground w-10 rounded-full p-2"
        />
      </h1>
      <p className="text-[1.75rem]">Nossos melhores serviços</p>

      <div className="mt-6 space-y-12 md:flex md:gap-6">
        <CardServices image={manCuttingHair}>
          O corte de cabelo é uma prática essencial para manter uma aparência
          arrumada e estilosa. Envolve a escolha de um estilo que melhor se
          adapte à forma do rosto, tipo de cabelo e preferências pessoais.
        </CardServices>
        <CardServices image={manCuttingBeard}>
          A barba é mais do que apenas pelos faciais; é um componente
          significativo do estilo pessoal e transmite personalidade. A
          manutenção da barba inclui aparar regularmente, lavar e hidratar com
          produtos específicos, e estilizar conforme a preferência.
        </CardServices>
        <Card className="bg-foreground/90 text-background mx-auto h-112 w-[20rem] rounded-md pt-7 duration-200 hover:scale-110">
          <CardTitle className="leading-tight">
            Faça seu agendamento e veja a diferença.
          </CardTitle>
          <CardContent className="space-y-4">
            <Button
              onClick={() => navigate("/sign-up")}
              variant="secondary"
              className="border-background w-full border-1 py-6 font-bold"
            >
              Agende seu horário
            </Button>
            <LinesWithOr />
            <Button
              onClick={() => navigate("/sign-in")}
              className="border-background hover:bg-background hover:text-foreground w-full border-1 py-6 font-bold"
            >
              Já tem horários?
            </Button>
          </CardContent>
          <CardFooter className="items-center justify-between">
            <div className="bg-background text-foreground rounded-full p-1 py-3.5">
              LOGO
            </div>
            <div className="flex items-center gap-3">
              <ContactButton
                link="instagram.com"
                icon={faInstagram}
                variant="secondary"
              />
              <ContactButton
                link="whatsapp.api.client"
                icon={faWhatsapp}
                variant="secondary"
              />
            </div>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
