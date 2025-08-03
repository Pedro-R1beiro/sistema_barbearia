import { useRef } from "react";

import { motion, useInView } from "motion/react";

interface CardProps {
  imgPath: string;
  title: string;
  text: string;
  imgAlt?: string;
}

export function Card({ imgPath, title, text }: CardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });
  return (
    <div className="space-y-4" ref={ref}>
      <motion.div
        animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
        transition={{
          ease: "easeOut",
          opacity: {
            duration: 2 * 0.8,
          },
        }}
        className="border-card h-[120px] w-full rounded-md border-2 bg-cover bg-center"
        style={{ backgroundImage: `url(${imgPath})` }}
      />
      <footer className="text-center">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="font-normal">{text}</p>
      </footer>
    </div>
  );
}
