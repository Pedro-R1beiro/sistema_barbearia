import { ContactButton } from "@/components/ContactButton";
import { LinesWithOr } from "@/components/LinesWithOr";
import { Button } from "@/components/ui/button";
import { faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";

import barberShopImage from "../../../assets/barber-shop.png";

export function About() {
  return (
    <section className="mt-20 md:mt-10 md:flex md:flex-row-reverse md:items-center md:gap-12">
      <div className="space-y-4 text-center md:flex md:flex-col md:items-end">
        <h1 className="text-4xl font-bold tracking-tight md:text-right">
          BARBER SHOP
        </h1>
        <p className="text-[1.625rem] md:text-right">
          Agende na barbearia que transforma você
        </p>

        <div className="mt-8 space-y-10 text-justify md:mt-4 md:text-right">
          <p>
            Bem-vindo à nossa barbearia, onde tradição se encontra com
            modernidade, Nossos barbeiros garantem habilidades, cortes e barbas
            impecáveis.
          </p>

          <p>
            Para garantir uma melhor experiência, disnoponibilizamos um sistema
            de agendamento simples e rápido:{" "}
          </p>
        </div>

        <Button className="bg-foreground text-md mt-4 w-full p-6 font-bold md:max-w-[26rem]">
          Agende seu horário
        </Button>
        <div className="w-100/168">
          <LinesWithOr />
        </div>

        <div className="mt-3 flex items-center justify-center gap-3 md:w-100/168">
          <ContactButton link="instagram.com" icon={faInstagram} />
          <ContactButton link="whatsapp.api.client" icon={faWhatsapp} />
        </div>
      </div>

      <img
        src={barberShopImage}
        alt=""
        className="mx-auto mt-8 md:mt-0 md:mb-10 md:h-140"
      />
    </section>
  );
}
