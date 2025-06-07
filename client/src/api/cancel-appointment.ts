import { api } from "@/lib/axios";

interface RegisterAppointmentBody {
  id: number;
}

export async function cancelAppointment({ id }: RegisterAppointmentBody) {
  await api.patch(
    "/client/cancelAppointment",
    {},
    {
      params: {
        id,
      },
    },
  );
}
