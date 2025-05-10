import { ContactButton } from "@/components/ContactButton";
import { Button } from "@/components/ui/button";

import manImage from "../../../assets/man.svg";
import { faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { SeparationArrow } from "@/components/SeparationArrow";

export function Home() {
  return (
    <>
      <section
        id="home"
        className="mt-12 h-screen md:mt-0 md:flex md:items-center md:gap-12 md:pb-0"
      >
        <div className="space-y-4 text-center md:text-left">
          <h1 className="text-4xl font-bold tracking-tight">BARBER SHOP</h1>
          <p className="my-6 text-[1.625rem] font-light">
            Cabelo, barba e tudo que te deixa <br /> em dia.
          </p>

          <Button className="bg-foreground text-background text-md mt-2 w-full p-6 font-bold md:max-w-114">
            Agende seu horário
          </Button>
          <Button
            variant="secondary"
            className="text-md mt-2 w-full p-6 font-bold md:max-w-114 dark:bg-[#303030] dark:hover:bg-[#404040]"
          >
            Já tem horários marcados?
          </Button>

          <div className="mt-6 flex items-center justify-center gap-3">
            <ContactButton link="instagram.com" icon={faInstagram} />
            <ContactButton link="whatsapp.api.client" icon={faWhatsapp} />
          </div>
        </div>

        <img
          src={manImage}
          alt=""
          className="mx-auto mt-8 h-130 md:mt-0 md:ml-auto md:h-145"
        />
        <span className="block md:hidden">
          <SeparationArrow />
        </span>
      </section>
      <span className="hidden md:block">
        <SeparationArrow />
      </span>
    </>
  );
}
