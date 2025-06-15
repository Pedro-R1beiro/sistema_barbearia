import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { faScissors } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router";

export function WithoutNextAppointmentCard() {
  const navigate = useNavigate();
  return (
    <Card className="bg-custom-foreground text-background lg:w-72">
      <CardContent className="px-4">
        <div className="flex items-start justify-between pr-2">
          <span className="text-xl font-bold">Agende</span>
          <FontAwesomeIcon icon={faScissors} className="text-3xl" />
        </div>
        <div className="mt-6 flex items-center justify-between text-lg">
          <span className="font-medium">Agende um novo</span>

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
