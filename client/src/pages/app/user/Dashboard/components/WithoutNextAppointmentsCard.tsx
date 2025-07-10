import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "motion/react";

const MotionCard = motion(Card);

export function WithoutNextAppointmentsCard() {
  return (
    <MotionCard
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="bg-custom-foreground text-background h-34 md:h-38 md:flex-1"
    >
      <CardContent className="px-4">
        <div className="flex items-start justify-between pr-2">
          <CardTitle className="text-xl font-bold">
            Próximos agendamentos
          </CardTitle>
          <FontAwesomeIcon icon={faCalendarDays} className="text-3xl" />
        </div>
        <div className="mt-3 flex items-center justify-between text-lg">
          <span className="font-medium">Sem agendamentos marcados.</span>
        </div>
      </CardContent>
    </MotionCard>
  );
}
