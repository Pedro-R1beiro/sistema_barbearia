import { faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";

import moustacheIcon from "@/assets/moustache-icon.svg";
import barberShopImage from "@/assets/barber-shop.png";
import { ContactButton } from "@/components/ContactButton";
import { LinesWithOr } from "@/components/LinesWithOr";

import { Button } from "@/components/ui/button";
import { SeparationArrow } from "@/components/SeparationArrow";

export function About() {
  return (
    <>
      <section
        id="about"
        className="mt-90 h-screen md:mt-10 md:flex md:flex-row-reverse md:items-center md:gap-12"
      >
        <div className="space-y-4 text-center md:flex md:flex-col md:items-end">
          <h1 className="mx-auto mb-6 flex w-fit gap-3 text-center text-4xl font-bold tracking-tight">
            BARBER SHOP{" "}
            <img
              src={moustacheIcon}
              alt="Ícone de bigode pontudo"
              className="bg-foreground w-10 rounded-full p-2"
            />
          </h1>
          <p className="text-[1.75rem] md:text-right">
            Agende na barbearia que transforma você
          </p>
          <div className="mt-8 space-y-10 text-justify md:mt-4 md:text-right">
            <p>
              Bem-vindo à nossa barbearia, onde tradição se encontra com
              modernidade, Nossos barbeiros garantem habilidades, cortes e
              barbas impecáveis.
            </p>

            <p>
              Para garantir uma melhor experiência, disnoponibilizamos um
              sistema de agendamento simples e rápido:{" "}
            </p>
          </div>
          <div className="flex w-full flex-col items-center justify-center md:max-w-[26rem] md:items-end">
            <Button className="bg-foreground text-md mt-4 w-full p-6 font-bold">
              Agende seu horário
            </Button>
            <div className="mt-4 flex w-full flex-col items-center">
              <LinesWithOr />

              <div className="mt-3 flex items-center justify-center gap-3 md:w-100/168">
                <ContactButton link="instagram.com" icon={faInstagram} />
                <ContactButton link="whatsapp.api.client" icon={faWhatsapp} />
              </div>
            </div>
          </div>
        </div>

        <img
          src={barberShopImage}
          alt=""
          className="mx-auto mt-8 md:mt-0 md:mb-10 md:h-140"
        />
        <span className="mt-10 block md:hidden">
          <SeparationArrow />
        </span>
      </section>
      <span className="hidden md:block">
        <SeparationArrow />
      </span>
    </>
  );
}
