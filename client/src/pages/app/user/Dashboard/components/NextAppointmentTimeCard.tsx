import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { ContactButton } from "@/components/ContactButton";
import { Card, CardContent } from "@/components/ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faScissors } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@tanstack/react-query";
import { getAppointment } from "@/api/get-appointment";
import { WithoutNextAppointmentCard } from "./WithoutNextAppointmentCard";
import { useRemainingTime } from "@/hooks/useRemainingTime";
import { Skeleton } from "@/components/ui/skeleton";

export function NextAppointmentTimeCard() {
  const {
    data: nextAppointmentData,
    isFetching,
    isFetched,
  } = useQuery({
    queryKey: ["next-appointment"],
    queryFn: () => getAppointment("next"),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const { date, startTime } = nextAppointmentData
    ? nextAppointmentData[0]
    : {
        date: new Date(),
        startTime: "00:00",
      };

  const remainingTime = useRemainingTime({
    startDate: new Date(date),
    startTime,
  });

  if (!nextAppointmentData && isFetched) return <WithoutNextAppointmentCard />;

  return (
    <>
      {isFetching ? (
        <div className="bg-custom-foreground h-34 items-center space-y-10 space-x-4 rounded-md p-4 px-4 py-4 md:h-38 lg:w-74">
          <div className="flex w-full items-center justify-between gap-4">
            <Skeleton className="h-8 w-[250px] lg:w-[150px]" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
          <div className="flex w-full items-center justify-between gap-4">
            <Skeleton className="h-8 w-[250px]" />
            <Skeleton className="h-8 w-16 rounded-md" />
          </div>
        </div>
      ) : (
        <Card className="bg-custom-foreground text-background h-34 md:h-38 lg:w-fit">
          <CardContent className="px-4">
            <div className="flex items-start justify-between pr-2">
              {remainingTime.length > 0 ? (
                <span className="text-xl font-bold">{remainingTime}</span>
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
            <div className="mt-3 flex items-center justify-between text-lg">
              {remainingTime.length > 0 ? (
                <span className="font-medium">Para seu próximo horário.</span>
              ) : (
                <span className="font-medium">Passou ou em andamento.</span>
              )}

              <ContactButton icon={faWhatsapp} link="Whatsapp.client.api" />
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
