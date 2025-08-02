import { motion } from "motion/react";

export function Title({ title, text }: { title: string; text: string }) {
  return (
    <div className="text-center">
      <span className="sr-only">{title}</span>

      <motion.h1
        className="mb-1 text-2xl font-bold"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={{
          visible: { transition: { staggerChildren: 0.09 } },
        }}
      >
        {title.split("").map((letter, index) => (
          <motion.span
            key={index}
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 10 },
            }}
            transition={{ duration: 0.5 }}
          >
            {letter}
          </motion.span>
        ))}
      </motion.h1>

      <motion.p
        className="max-w-[315px] text-lg font-light mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={{
          visible: { transition: { staggerChildren: 0.02 } },
          hidden: {},
        }}
      >
        <span className="sr-only">{text}</span>
        {text.split("").map((letter, index) => (
          <motion.span
            key={index}
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 10 },
            }}
            transition={{ duration: 0.4 }}
          >
            {letter}
          </motion.span>
        ))}
      </motion.p>
    </div>
  );
}
