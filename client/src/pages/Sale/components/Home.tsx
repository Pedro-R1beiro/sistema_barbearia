import { ContactButton } from "@/components/ContactButton";
import { Button } from "@/components/ui/button";

import manImage from "../../../assets/man.png";
import { faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";

export function Home() {
  return (
    <section className="mt-12 h-screen md:mt-0 md:flex md:items-center md:gap-12 md:pb-22">
      <div className="space-y-4 text-center md:text-left">
        <h1 className="text-4xl font-bold tracking-tight">BARBER SHOP</h1>
        <p className="text-[1.625rem] font-light">
          Cabelo, barba e tudo que te deixa em dia.
        </p>

        <Button className="bg-foreground text-md mt-2 w-full p-6 font-bold">
          Agende seu horário
        </Button>
        <Button
          variant="secondary"
          className="text-md w-full bg-[#303030] p-6 font-bold hover:bg-[#404040]"
        >
          Já tem horários marcados?
        </Button>

        <div className="mt-3 flex items-center justify-center gap-3">
          <ContactButton link="instagram.com" icon={faInstagram} />
          <ContactButton link="whatsapp.api.client" icon={faWhatsapp} />
        </div>
      </div>

      <img
        src={manImage}
        alt=""
        className="mx-auto mt-8 md:mt-0 md:ml-auto md:h-115"
      />
    </section>
  );
}
