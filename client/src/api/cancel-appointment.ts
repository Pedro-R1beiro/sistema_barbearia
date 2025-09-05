import { api } from "@/lib/axios";

interface RegisterAppointmentBody {
  appointmentId: number;
}

export async function cancelAppointment({
  appointmentId,
}: RegisterAppointmentBody) {
  await api.patch(
    "/client/cancelAppointment",
    {},
    {
      params: {
        id: appointmentId,
      },
    },
  );
}
