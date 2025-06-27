import {
  getAppointment,
  type AppointmentStatusType,
} from "@/api/get-appointment";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";

import { AppointmentCard } from "./AppointmentCard";
import { FilterAppointments } from "./FilterAppointments";
import { useContext, useState } from "react";
import { ArchivedAppointmentsContext } from "@/contexts/ArchivedAppointmentContext";
import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";

const MotionCard = motion(Card);

export function AppointmentsCardGroup() {
  const [selectedFilter, setSelectedFilter] = useState<
    AppointmentStatusType | "archiveds"
  >("all");

  const { data: appointmentData, isFetching } = useQuery({
    queryKey: ["appointments", selectedFilter],
    queryFn: () =>
      getAppointment({
        status: selectedFilter === "archiveds" ? "all" : selectedFilter,
      }),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  const { archivedAppointmentsId } = useContext(ArchivedAppointmentsContext);
  const appointments = appointmentData?.filter((appointment) => {
    if (selectedFilter === "archiveds") {
      return archivedAppointmentsId.includes(appointment.id);
    }
    return !archivedAppointmentsId.includes(appointment.id);
  });

  return (
    <MotionCard
      initial={{ y: 20 }}
      animate={{ y: 0 }}
      className="max-h-132 min-h-132 w-full overflow-hidden"
    >
      <CardHeader>
        <CardTitle className="text-center text-xl">
          Histórico de agendamentos
        </CardTitle>
        {!appointmentData && !isFetching && (
          <CardDescription>
            Sem agendamentos.{" "}
            <span className="font-bold">Verifique os arquivados</span> Obs:
            agendamentos marcados não podem ser arquivados
          </CardDescription>
        )}
        <div className="flex items-center justify-between font-semibold">
          <p>Filtrar por:</p>
          <FilterAppointments setSelectedFilter={setSelectedFilter} />
        </div>
      </CardHeader>
      {isFetching ? (
        <CardContent className="space-y-4 pt-3 pb-8">
          <Skeleton className="h-44 w-full" />
          <Skeleton className="h-44 w-full" />
        </CardContent>
      ) : (
        <CardContent className="items-center justify-center gap-6 space-y-6 overflow-auto pb-2 md:flex md:flex-wrap md:space-y-0">
          <AnimatePresence mode="popLayout">
            {appointments &&
              appointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                />
              ))}
          </AnimatePresence>
          {appointments && appointments?.length <= 0 && (
            <CardDescription className="text-center">
              Olhe os agendamentos arquivados <br />
              na{" "}
              <span className="font-bold">opção de filtros. Logo acima!</span>
            </CardDescription>
          )}
        </CardContent>
      )}
    </MotionCard>
  );
}
