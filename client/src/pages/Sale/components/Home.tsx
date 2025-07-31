import { ContactButton } from "@/components/ContactButton";
import { Button } from "@/components/ui/button";

import { faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";

import bg from "@/assets/sale-bg.svg";
import { useNavigate } from "react-router";
import { MiniCard } from "@/components/MiniCard";
import {
  faCalendar,
  faClock,
  faScissors,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "motion/react";

const MotionButton = motion(Button);

export function Home() {
  const navigate = useNavigate();

  return (
    <section
      style={{ backgroundImage: `url(${bg})` }}
      id="home"
      className="bg-foreground/40 dark:bg-background/0 flex h-screen flex-col items-center bg-cover bg-center bg-no-repeat px-4 pt-35 md:mt-0 md:gap-12 md:pb-0"
    >
      <div className="text-center">
        <span className="sr-only">@Sua barbearia</span>
        <h1 className="mb-1 text-2xl font-bold">
          {"@Sua barbearia".split("").map((letter, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.09 * index,
                duration: 0.5,
              }}
            >
              {letter}
            </motion.span>
          ))}
        </h1>

        <p className="max-w-[315px] text-lg font-light">
          {"Agende seu horário e cuide do que faz você quem você é."
            .split("")
            .map((letter, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.02 * index,
                  duration: 0.4,
                }}
              >
                {letter}
              </motion.span>
            ))}
          <span className="sr-only">
            Agende seu horário e cuide do que faz você quem você é.
          </span>
        </p>
      </div>

      <div className="mt-14 flex w-[240px] flex-col gap-3">
        <MotionButton
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
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
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            ease: "easeOut",
            delay: 0.2,
          }}
          onClick={() => navigate("/sign-in")}
          variant="secondary"
          className="border-background border-2 py-4.5 font-semibold"
        >
          Gerenciar meus horários
        </MotionButton>
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

      <div className="mt-auto mb-6 flex w-full max-w-[372px] items-center justify-between">
        <MiniCard
          firstTitle="A melhor"
          lastTitle="barberia"
          icon={faScissors}
          delay={0.2}
          transition={1}
        />
        <MiniCard
          firstTitle="Rápido"
          lastTitle="e fácil"
          icon={faClock}
          delay={0.3}
          transition={2}
        />
        <MiniCard
          firstTitle="Gerencie"
          lastTitle="horários"
          icon={faCalendar}
          delay={0.4}
          transition={3}
          classname="bg-amber-400"
        />
      </div>
    </section>
  );
}
