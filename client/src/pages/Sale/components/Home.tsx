import { ContactButton } from "@/components/ContactButton";
import { Button } from "@/components/ui/button";

import manImage from "../../../assets/man.png";
import { faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
export function Home() {
  return (
    <section className="mt-12 space-y-4 text-center">
      <h1 className="text-3xl font-bold tracking-tight">BARBER SHOP</h1>
      <p className="text-[1.625rem] font-light">
        Cabelo, barba e tudo que te deixa em dia.
      </p>

      <Button className="bg-foreground text-md mt-2 w-full p-6 font-bold">
        Agende seu horário
      </Button>
      <Button variant="secondary" className="text-md w-full p-6 font-bold">
        Já tem horários marcados?
      </Button>

      <div className="mt-3 flex items-center justify-center gap-3">
        <ContactButton link="instagram.com" icon={faInstagram} />
        <ContactButton link="whatsapp.api.client" icon={faWhatsapp} />
      </div>

      <img src={manImage} alt="" className="mx-auto mt-8" />
    </section>
  );
}
