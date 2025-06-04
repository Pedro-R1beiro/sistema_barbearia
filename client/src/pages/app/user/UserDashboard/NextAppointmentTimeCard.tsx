import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { ContactButton } from "@/components/ContactButton";
import { Card, CardContent } from "@/components/ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faScissors } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@tanstack/react-query";
import { getAppointment } from "@/api/get-appointment";
import { remainingTime } from "@/utils/remaining-time";
import { WithoutNextAppointmentCard } from "./WithoutNextAppointmentCard";

export function NextAppointmentTimeCard() {
  const { data: nextAppointmentData } = useQuery({
    queryKey: ["appointments"],
    queryFn: () => getAppointment("next"),
  });

  if (!nextAppointmentData) return;
  const nextAppointment = nextAppointmentData[0];

  if (!nextAppointment) return <WithoutNextAppointmentCard />;

  const remaining = remainingTime({
    startDate: nextAppointment.date,
    startTime: nextAppointment.startTime,
  });

  return (
    <Card className="bg-custom-foreground text-background lg:w-72">
      <CardContent className="px-4">
        <div className="flex items-start justify-between pr-2">
          {remaining.length > 0 ? (
            <span className="text-2xl font-bold">{remaining}</span>
          ) : (
            <>
              <span className="text-2xl font-bold md:hidden">
                Próximo Horário
              </span>
              <span className="hidden text-2xl font-bold md:inline">
                Próximo Horá...
              </span>
            </>
          )}
          <FontAwesomeIcon icon={faScissors} className="text-3xl" />
        </div>
        <div className="mt-6 flex items-center justify-between text-lg">
          {remaining.length > 0 ? (
            <span className="font-medium">
              Para seu próximo <br />
              horário.
            </span>
          ) : (
            <span className="font-medium">passou ou em andamento.</span>
          )}

          <ContactButton icon={faWhatsapp} link="Whatsapp.client.api" />
        </div>
      </CardContent>
    </Card>
  );
}
