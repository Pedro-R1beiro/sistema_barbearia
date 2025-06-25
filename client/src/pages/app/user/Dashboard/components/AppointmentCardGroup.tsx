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
import { useState } from "react";

export function AppointmentsCardGroup() {
  const [selectedFilter, setSelectedFilter] =
    useState<AppointmentStatusType>("all");

  const { data: appointmentData, isFetching } = useQuery({
    queryKey: ["appointments", selectedFilter],
    queryFn: () => getAppointment({ status: selectedFilter }),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  return (
    <Card className="max-h-132 min-h-132 w-full overflow-hidden">
      <CardHeader>
        <CardTitle className="text-center text-xl">
          Histórico de agendamentos
        </CardTitle>
        {!appointmentData && !isFetching && (
          <CardDescription className="text-center">
            Você não tem agendamentos guardados. Verifique os arquivados. obs:
            Os agendamentos marcados não podem ser arquivados
          </CardDescription>
        )}
        <div className="flex items-center justify-between">
          <p>Filtrar por:</p>
          <FilterAppointments setSelectedFilter={setSelectedFilter} />
        </div>
      </CardHeader>
      {isFetching ? (
        <CardContent className="space-y-4 pb-8">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
        </CardContent>
      ) : (
        <CardContent className="items-center justify-center gap-6 space-y-6 overflow-auto pb-2 md:flex md:flex-wrap md:space-y-0">
          {appointmentData &&
            appointmentData.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))}
        </CardContent>
      )}
    </Card>
  );
}
