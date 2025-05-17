import { ContactButton } from "@/components/ContactButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faCalendarDays, faScissors } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NextAppointment } from "./components/NextAppointment";
import { AppointmentsTable } from "./components/AppointmentsTable";

export function UserDashboard() {
  return (
    <div className="gap-x-14 lg:mt-6 lg:grid lg:grid-cols-[1fr_auto] lg:grid-rows-[180px_1fr]">
      <div className="col-1 row-1 space-y-10 md:flex md:items-center md:gap-8 md:space-y-0">
        <Card className="bg-custom-foreground text-background lg:w-72">
          <CardContent>
            <div className="flex items-start justify-between pr-2">
              <span className="text-2xl font-bold">22 dias</span>
              <FontAwesomeIcon icon={faScissors} className="text-3xl" />
            </div>
            <div className="mt-6 flex items-center justify-between text-lg">
              <span className="font-medium">
                Para seu próximo <br />
                horário.
              </span>
              <ContactButton icon={faWhatsapp} link="Whatsapp.client.api" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-custom-foreground text-background md:flex-1">
          <CardContent className="px-3">
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
      </div>
      <div className="mt-8 lg:mt-2">
        <NextAppointment />
      </div>

      <AppointmentsTable />
    </div>
  );
}
