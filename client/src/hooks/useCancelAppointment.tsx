import { cancelAppointment } from "@/api/cancel-appointment";
import type { AppointmentInterface } from "@/api/get-appointment";
import { queryClient } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError, type AxiosError } from "axios";
import { toast } from "sonner";

function handleCancelAppointmentError(error: AxiosError) {
  const statusCode = error.response?.status;

  switch (statusCode) {
    case 422:
      toast.error("Agendamento já começou ou está no passado!");
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
    AppointmentInterface[]
  >({
    queryKey: ["next-appointments"],
  });

  if (!nextAppointmentsData) return [{}];

  nextAppointmentsData.forEach(([cacheKey, cacheData]) => {
    if (!cacheData) return;

    queryClient.setQueryData<AppointmentInterface[]>(cacheKey, (cacheData) => {
      if (!cacheData) return [];
      return cacheData.filter((appointment) => appointment.id !== id);
    });
  });

  toast.success("Agendamento cancelado!");
  return;
}

export function useCancelAppointment(appointmentId: number) {
  const { mutateAsync: cancelAppointmentFn, isPending } = useMutation({
    mutationFn: cancelAppointment,
    onSuccess: () => handleCancelAppointmentSuccess(appointmentId),
    onError: (error) => {
      if (isAxiosError(error)) {
        handleCancelAppointmentError(error);
        return;
      }

      toast.error("Houve um erro interno. Tente novamente mais tarde!");
    },
  });

  return {
    isPending,
    cancelAppointmentFn,
  };
}
