import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { faScissors } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router";

export function WithoutNextAppointmentCard() {
  const navigate = useNavigate();
  return (
    <Card className="bg-custom-foreground text-background h-34 md:h-38 lg:w-72">
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
    </Card>
  );
}
