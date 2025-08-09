import { useRef } from "react";

import { cn } from "@/lib/utils";
import type { IconLookup } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion, useInView } from "motion/react";

interface MiniCardProps {
  firstTitle: string;
  lastTitle: string;
  classname?: string;
  delay?: number;
  transition: number;
  icon: IconLookup;
}

export function MiniCard({
  firstTitle,
  lastTitle,
  icon,
  classname = "",
  delay = 1,
  transition = 1,
}: MiniCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        ease: "easeOut",
        delay: delay,
        opacity: {
          duration: transition * 0.9,
        },
      }}
      className={cn(
        "bg-foreground text-background flex w-[105px] md:w-[125px] flex-col gap-1 rounded-md p-2 px-3.5 pt-3.5 duration-300 hover:scale-106",
        classname,
      )}
    >
      <FontAwesomeIcon icon={icon} size="xl" />
      <div className="flex flex-col text-center">
        <div className="font-bold">{firstTitle}</div>
        <div>{lastTitle}</div>
      </div>
    </motion.div>
  );
}
