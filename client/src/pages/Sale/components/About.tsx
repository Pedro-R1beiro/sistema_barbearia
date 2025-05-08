import { ContactButton } from "@/components/ContactButton";
import { LinesWithOr } from "@/components/LinesWithOr";
import { Button } from "@/components/ui/button";
import { faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";

import barberShopImage from "../../../assets/barber-shop.png";

export function About() {
  return (
    <section className="mt-20 space-y-4 text-center">
      <h1 className="text-3xl font-bold tracking-tight">BARBER SHOP</h1>
      <p className="text-[1.625rem]">Agende na barbearia que transforma você</p>

      <div className="mt-8 space-y-10 text-justify">
        <p>
          Bem-vindo à nossa barbearia, onde tradição se encontra com
          modernidade, Nossos barbeiros garantem habilidades e cortes e barbas
          impecáveis.
        </p>

        <p>
          Para garantir uma melhor experiência, disnoponibilizamos um sistema de
          agendamento simples e rápido:{" "}
        </p>
      </div>

      <Button className="bg-foreground text-md mt-4 w-full p-6 font-bold">
        Agende seu horário
      </Button>

      <LinesWithOr />

      <div className="mt-3 flex items-center justify-center gap-3">
        <ContactButton link="instagram.com" icon={faInstagram} />
        <ContactButton link="whatsapp.api.client" icon={faWhatsapp} />
      </div>

      <img src={barberShopImage} alt="" className="mx-auto mt-8" />
    </section>
  );
}
