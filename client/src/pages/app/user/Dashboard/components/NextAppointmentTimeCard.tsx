import { WithoutNextAppointmentTimeCard } from "./WithoutNextAppointmentTimeCard";
import { getAppointment } from "@/api/get-appointment";
import { ContactButton } from "@/components/ContactButton";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useRemainingTime } from "@/hooks/useRemainingTime";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faScissors } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";

const MotionCard = motion(Card);

export function NextAppointmentTimeCard() {
  const { data: nextAppointmentData, isFetching } = useQuery({
    queryKey: ["next-appointment"],
    queryFn: () => getAppointment({ filter: "next", status: "booked" }),
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

  return (
    <>
      {isFetching ? (
        <div className="bg-custom-foreground h-34 items-center space-y-10 space-x-4 rounded-xl p-4 px-4 py-4 md:h-38 lg:flex-1">
          <div className="flex w-full items-center justify-between gap-4">
            <Skeleton className="h-8 w-[90px]" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
          <div className="flex w-full items-center justify-between gap-4">
            <Skeleton className="h-8 w-[120px]" />
            <Skeleton className="h-8 w-16 rounded-md" />
          </div>
        </div>
      ) : (
        <>
          {nextAppointmentData ? (
            <MotionCard
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
              className="bg-custom-foreground text-background h-34 min-w-fit md:h-38 md:min-w-90 lg:min-w-70"
            >
              <CardContent className="px-4">
                <div className="flex items-start justify-between pr-2">
                  {remainingTime.length > 0 ? (
                    <span className="text-xl font-bold">{remainingTime}</span>
                  ) : (
                    <>
                      <span className="text-xl font-bold">Próximo Horário</span>
                    </>
                  )}
                  <FontAwesomeIcon icon={faScissors} className="text-3xl" />
                </div>
                <div className="mt-3 flex items-center justify-between text-lg">
                  {remainingTime.length > 0 ? (
                    <span className="font-medium">
                      Para seu próximo
                      <br className="hidden md:block" /> horário.
                    </span>
                  ) : (
                    <span className="font-medium">
                      Passou ou <br /> em andamento.
                    </span>
                  )}

                  <ContactButton icon={faWhatsapp} link="Whatsapp.client.api" />
                </div>
              </CardContent>
            </MotionCard>
          ) : (
            <WithoutNextAppointmentTimeCard />
          )}
        </>
      )}
    </>
  );
}
