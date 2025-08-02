import { type ReactNode, useRef } from "react";

import { cn } from "@/lib/utils";
import { motion, useInView } from "motion/react";

interface CardServicesRootProps {
  image?: string;
  children: ReactNode;
  index: number;
}

export function CardServicesRoot({
  image,
  children,
  index,
}: CardServicesRootProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      initial={{ translateX: index % 2 === 0 ? 180 : -180, opacity: 0 }}
      animate={isInView ? { translateX: 0, opacity: 1 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        backgroundImage: `url(${image})`,
      }}
      className={cn(
        "p-5.5 bg-cover bg-center hover:rotate-2 hover:scale-105 duration-300 relative rounded-xl border-2 border-card",
        image && "bg-[#282828]",
      )}
    >
      {children}
    </motion.div>
  );
}
