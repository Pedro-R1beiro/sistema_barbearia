import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function NextAppointmentsCard() {
  return (
    <Card className="bg-custom-foreground text-background md:flex-1">
      <CardContent className="px-4">
        <div className="flex items-start justify-between pr-2">
          <CardTitle className="text-2xl font-bold">
            Próximos agendamentos
          </CardTitle>
          <FontAwesomeIcon icon={faCalendarDays} className="text-3xl" />
        </div>
        <div className="mt-6 flex items-center justify-between text-lg">
          <span className="font-medium">
            3 agendamentos para <br />
            os próximos dias.
          </span>
          <Button variant="secondary" className="px-7 py-5.5">
            VER
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
