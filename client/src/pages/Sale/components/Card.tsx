import { useRef } from "react";

import type { IconLookup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Calendar } from "lucide-react";
import { motion, useInView } from "motion/react";

interface CardProps {
  imgPath: string;
  title: string;
  text: string;
  icon?: IconLookup;
  imgAlt?: string;
}

export function Card({ imgPath, title, text, icon }: CardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });
  return (
    <div
      className="rounded-md border-2 max-w-[420px] bg-[#30303083] border-card"
      ref={ref}
    >
      <motion.div
        animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
        transition={{
          ease: "easeOut",
          opacity: {
            duration: 2 * 0.8,
          },
        }}
        className="border-card h-[132px] border-b-2 w-full rounded-md bg-cover bg-center"
        style={{ backgroundImage: `url(${imgPath})` }}
      />
      <footer className=" py-3 pb-4 px-4 rounded-md">
        <div className="flex w-full justify-between items-center">
          <h3 className=" font-bold mb-1.5">{title}</h3>
          {icon ? <FontAwesomeIcon icon={icon} /> : <Calendar width={17} />}
        </div>
        <p className="font-normal text-sm text-stone-300">{text}</p>
      </footer>
    </div>
  );
}
