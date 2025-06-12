import { ContactButton } from "@/components/ContactButton";
import { Button } from "@/components/ui/button";

import moustacheIcon from "@/assets/moustache-icon.svg";

import { faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { SeparationArrow } from "@/components/SeparationArrow";

import bg from "@/assets/sale-bg.svg";
import { useNavigate } from "react-router";

export function Home() {
  const navigate = useNavigate();

  return (
    <section
      style={{ backgroundImage: `url(${bg})` }}
      id="home"
      className="bg-foreground/40 dark:bg-background/0 flex h-screen flex-col items-center bg-cover bg-center bg-no-repeat px-4 pt-40 md:mt-0 md:gap-12 md:pb-0"
    >
      <div className="mx-auto space-y-4 text-center">
        <h1 className="mx-auto mb-6 flex w-fit gap-3 text-center text-4xl font-bold tracking-tight">
          BARBER SHOP{" "}
          <img
            src={moustacheIcon}
            alt="Ícone de bigode pontudo"
            className="dark:bg-background bg-foreground w-10 rounded-full p-2"
          />
        </h1>
        <p className="mb-6 text-[1.75rem] font-light">
          Cabelo, barba e tudo que te deixa <br className="hidden md:inline" />{" "}
          em dia.
        </p>

        <Button
          onClick={() => navigate("/sign-up")}
          className="bg-foreground text-background text-md mt-2 w-full p-6 font-bold md:max-w-114"
        >
          Agende seu horário
        </Button>
        <Button
          onClick={() => navigate("/sign-in")}
          variant="secondary"
          className="text-md mt-2 w-full p-6 font-bold md:max-w-114 dark:bg-[#303030] dark:hover:bg-[#404040]"
        >
          Já tem horários marcados?
        </Button>

        <div className="mx-auto mt-6 flex w-fit items-center justify-center gap-3">
          <ContactButton link="instagram.com" icon={faInstagram} />
          <ContactButton link="whatsapp.api.client" icon={faWhatsapp} />
        </div>
      </div>
      <div className="mt-auto w-full max-w-6xl">
        <SeparationArrow />
      </div>
    </section>
  );
}
