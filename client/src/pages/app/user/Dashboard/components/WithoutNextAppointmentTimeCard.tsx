import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { faScissors } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router";
import { motion } from "motion/react";

const MotionCard = motion(Card);

export function WithoutNextAppointmentTimeCard() {
  const navigate = useNavigate();
  return (
    <MotionCard
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="bg-custom-foreground text-background h-34 md:h-38 md:w-86 lg:w-72"
    >
      <CardContent className="px-4">
        <div className="flex items-start justify-between pr-2">
          <span className="text-xl font-bold">Agende</span>
          <FontAwesomeIcon icon={faScissors} className="text-3xl" />
        </div>
        <div className="mt-4 flex items-center justify-between text-lg">
          <span className="font-medium">faça um novo agendamento</span>

          <Button
            onClick={() => navigate("/to-schedule")}
            variant="secondary"
            className="px-5 py-5.5"
          >
            Novo
          </Button>
        </div>
      </CardContent>
    </MotionCard>
  );
}
