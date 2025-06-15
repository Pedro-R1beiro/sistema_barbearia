import { cancelAppointment } from "@/api/cancel-appointment";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { AppointmentDialog } from "./AppointmentDialog";
import { CardFooter } from "@/components/ui/card";
import { isAxiosError, type AxiosError } from "axios";
import { queryClient } from "@/lib/react-query";
import type { NextAppointmentInterface } from "@/api/get-appointment";

interface NextAppointmentProps {
  id: number;
}

function handleCancelAppointmentError(error: AxiosError) {
  const statusCode = error.response?.status;

  switch (statusCode) {
    case 422:
      toast.error("Agendamento já cancelado!");
      break;
    default:
      toast.error("Houve um erro interno. Tente novamente mais tarde!");
  }
}

function handleCancelAppointmentSuccess(id: number) {
  queryClient.refetchQueries({
    queryKey: ["next-appointment"],
  });

  const nextAppointmentsData = queryClient.getQueriesData<
    NextAppointmentInterface[]
  >({
    queryKey: ["next-appointments"],
  });

  if (!nextAppointmentsData) return [{}];

  nextAppointmentsData.forEach(([cacheKey, cacheData]) => {
    if (!cacheData) return;

    queryClient.setQueryData<NextAppointmentInterface[]>(
      cacheKey,
      (cacheData) => {
        if (!cacheData) return [];
        return cacheData.filter((appointment) => appointment.id !== id);
      },
    );
  });

  toast.success("Agendamento cancelado!");
  return;
}

export function AppointmentCardFooter({ id }: NextAppointmentProps) {
  const { mutateAsync: cancelAppointmentFn } = useMutation({
    mutationFn: cancelAppointment,
    onSuccess: () => handleCancelAppointmentSuccess(id),
    onError: (error) => {
      if (isAxiosError(error)) {
        handleCancelAppointmentError(error);
        return;
      }

      toast.error("Houve um erro interno. Tente novamente mais tarde!");
    },
  });

  return (
    <CardFooter className="mt-6 md:mt-0 md:w-1/2 lg:mt-6 lg:w-full">
      <div className="w-full max-w-full space-y-5 md:flex md:flex-col md:justify-between md:gap-6 lg:gap-2">
        <Button className="w-full flex-1 py-5 font-bold md:w-auto md:py-3 lg:flex-none lg:py-5">
          Contatar barbeiro
        </Button>
        <AppointmentDialog appointmentId={id} />
        <Button
          onClick={() => cancelAppointmentFn({ id })}
          className="w-full flex-1 py-5 font-bold md:w-auto md:py-3 lg:flex-none lg:py-5"
          variant="customDestructive"
        >
          Cancelar agendamento
        </Button>
      </div>
    </CardFooter>
  );
}
