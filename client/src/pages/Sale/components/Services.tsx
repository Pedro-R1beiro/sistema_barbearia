import { useRef } from "react";

import { CardServices } from "./CardServices";
import { type CardServicesIconsProps } from "./CardServices/CardServicesIcons";
import { Title } from "./Title";
import cuttingBeard from "@/assets/cutting-beard.svg";
import cutting from "@/assets/cutting.svg";
import { Button } from "@/components/ui/button";
import { faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { motion, useInView } from "motion/react";

export function Services() {
  const icons: CardServicesIconsProps["icons"] = [
    { icon: faWhatsapp, link: "" },
    { icon: faInstagram, link: "" },
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });

  return (
    <motion.section
      ref={ref}
      animate={isInView ? { y: 0, opacity: 1 } : { y: 80, opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="pt-14 mt-8 border-t-1 rounded-t-4xl border-muted-foreground max-w-[1152px] mx-auto"
      id="services"
    >
      <Title
        title="Nossos serviços"
        text="Nossos melhores serviços. Focados em tradicionais e modernos."
      />
      <div className="mt-12 space-y-8">
        <CardServices.Root index={1} image={cutting}>
          <CardServices.Content
            title="Cortes"
            text="Tradicionais e modernos. Cortes do seu gosto."
          />
          <CardServices.Button size="sm" />
        </CardServices.Root>

        <CardServices.Root index={2} image={cuttingBeard}>
          <CardServices.Content
            title="barba"
            text="Barba alinhada e feita. Essência masculina."
          />
          <CardServices.Button size="sm" />
        </CardServices.Root>

        <CardServices.Root index={3}>
          <CardServices.Content
            title="barba"
            text="Barba alinhada e feita. Essência masculina."
          />
          <CardServices.Icons icons={icons} />
          <CardServices.Button size="sm">
            <Button size="sm" variant="outline">
              Já tem horários?
            </Button>
          </CardServices.Button>
        </CardServices.Root>
      </div>
    </motion.section>
  );
}
