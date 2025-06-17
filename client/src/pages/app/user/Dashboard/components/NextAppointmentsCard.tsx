import { getAppointment } from "@/api/get-appointment";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import { WithoutNextAppointmentsCard } from "./WithoutNextAppointmentsCard";

export function NextAppointmentsCard() {
  const { data: nextAppointmentsData, isFetching } = useQuery({
    queryKey: ["next-appointments"],
    queryFn: () => getAppointment({ filter: "nearby", status: "booked" }),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      {isFetching ? (
        <div className="bg-custom-foreground h-34 flex-1 items-center space-y-10 space-x-4 rounded-md p-4 px-4 py-4 md:h-38">
          <div className="flex w-full items-center justify-between gap-4">
            <Skeleton className="h-8 w-[250px]" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
          <div className="flex w-full items-center justify-between gap-4">
            <Skeleton className="h-8 w-[250px]" />
            <Skeleton className="h-8 w-16 rounded-md" />
          </div>
        </div>
      ) : (
        <>
          {nextAppointmentsData ? (
            <Card className="bg-custom-foreground text-background h-34 md:h-38 md:flex-1">
              <CardContent className="px-4">
                <div className="flex items-start justify-between pr-2">
                  <CardTitle className="text-xl font-bold">
                    Próximos agendamentos
                  </CardTitle>
                  <FontAwesomeIcon icon={faCalendarDays} className="text-3xl" />
                </div>
                <div className="mt-3 flex items-center justify-between text-lg">
                  <span className="font-medium">
                    {nextAppointmentsData.length} agendamento(s) para os
                    próximos dias.
                  </span>
                  <Button variant="secondary" className="px-7 py-5.5">
                    VER
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <WithoutNextAppointmentsCard />
          )}
        </>
      )}
    </>
  );
}
