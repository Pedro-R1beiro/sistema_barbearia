import {
  type RegisterAppointmentBody,
  registerAppointment,
} from "@/api/register-appointment";
import { queryClient } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "sonner";

export function useCreateAppointment() {
  const { mutateAsync: registerAppointmentFn, isPending } = useMutation({
    mutationFn: registerAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["next-appointments"] });
      queryClient.invalidateQueries({ queryKey: ["available-appointments"] });
      queryClient.invalidateQueries({ queryKey: ["next-appointment"] });
    },
  });

  async function handleCreateAppointment(appointment: RegisterAppointmentBody) {
    try {
      await registerAppointmentFn(appointment);

      toast.success("Agendamento feito com sucesso!");
    } catch (err) {
      toast.error("Horário não disponível!");
      if (isAxiosError(err)) {
        switch (err.response?.status) {
          case 400:
            toast.error("Horário indisponível!");
            break;
          default:
            toast.error("Houve um erro interno. Tente novamente mais tarde!");
        }
      }
    }
  }

  return {
    registerAppointmentFn: handleCreateAppointment,
    isPending,
  };
}
