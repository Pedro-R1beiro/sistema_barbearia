import { useRef } from "react";
import { useNavigate } from "react-router";

import { Card } from "./Card";
import { Title } from "./Title";
import BarberShopExample from "@/assets/barber-example.svg";
import barbersImg from "@/assets/barbers.svg";
import dashboardPreview from "@/assets/dashboard-preview.svg";
import { ContactButton } from "@/components/ContactButton";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { motion, useInView } from "motion/react";

const MotionButton = motion(Button);

export function About() {
  const navigate = useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  function hidden(y = 30, opacity = 0) {
    return { opacity, y };
  }

  function visible(y = 0, opacity = 1) {
    return { opacity, y };
  }

  return (
    <section
      ref={ref}
      id="about"
      className="bg-foreground/40 dark:bg-background/0 flex flex-col items-center bg-cover bg-center bg-no-repeat pt-16 md:mt-0 md:gap-12 md:pb-0"
    >
      <Title
        title="Nossa barbearia"
        text="Nosso trabalho é garantir que suas expectativas sejam atendidas."
      />
      <div className="mt-12 flex w-full items-center gap-6">
        <motion.div
          animate={isInView ? { filter: "blur(0px)" } : { filter: "blur(2px)" }}
          transition={{
            ease: "easeOut",
            duration: 2,
          }}
          style={{ backgroundImage: `url(${BarberShopExample})` }}
          className="min-h-[126px] min-w-[126px] rounded-full border-2 border-amber-400 bg-cover bg-center"
        />
        <div>
          <motion.h2
            animate={
              isInView ? { filter: "blur(0px)" } : { filter: "blur(4px)" }
            }
            transition={{
              ease: "easeOut",
              opacity: {
                duration: 2 * 0.8,
              },
            }}
            className="text-lg font-bold"
          >
            Onde estamos
          </motion.h2>
          <motion.address
            animate={
              isInView ? { filter: "blur(0px)" } : { filter: "blur(4px)" }
            }
            transition={{
              ease: "easeOut",
              opacity: {
                duration: 2 * 0.8,
              },
            }}
          >
            Localizados no endereço rua A, Bairro exemplo.
          </motion.address>
        </div>
      </div>

      <div className="mt-20 space-y-16">
        <Card
          imgPath={barbersImg}
          title="Nossos barbeiros"
          text="Profissionais capacitado que garantem trabalhos impecáveis."
        />
        <Card
          imgPath={dashboardPreview}
          title="Agendamento rápido"
          text="Um sistema simples e rápido para você gerenciar e marcar horários."
        />
      </div>

      <div className="mt-16 flex w-[240px] flex-col gap-3">
        <MotionButton
          initial={hidden(30, 0)}
          animate={isInView ? visible(0, 1) : hidden(30, 0)}
          transition={{
            ease: "easeOut",
            opacity: {
              duration: 2 * 0.8,
            },
          }}
          onClick={() => navigate("/sign-up")}
          className="border-background bg-foreground font-semibold"
        >
          Agende seu horário
        </MotionButton>
        <MotionButton
          initial={hidden(30, 0)}
          animate={isInView ? visible(0, 1) : hidden(30, 0)}
          transition={{
            duration: 0.4,
            ease: "easeOut",
            delay: 0.2,
          }}
          onClick={() => navigate("/sign-in")}
          variant="secondary"
          className="border-1 border-black py-4.5 font-semibold"
        >
          Gerenciar meus horários
        </MotionButton>
      </div>

      <div className="mt-5 mb-1 flex w-[240px] items-center gap-4">
        <Separator className="flex-1" />
        <span className="text-sm">ou</span>
        <Separator className="flex-1" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 70 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
          delay: 0.4,
        }}
        className="mt-4.5 flex gap-3"
      >
        <ContactButton link="" icon={faInstagram} />
        <ContactButton link="" icon={faWhatsapp} />
      </motion.div>
    </section>
  );
}
