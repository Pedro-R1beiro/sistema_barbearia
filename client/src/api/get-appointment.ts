import { api } from "@/lib/axios";

export type NextAppointmentInterface = {
  id: number;
  date: Date;
  created_at: Date;
  professionalName: string;
  clientName: string;
  serviceName: string;
  startTime: string;
  status: getAppointmentStatus;
  endTime: string;
  servicePrice: number;
};

export interface GetAppointmentResponse {
  message: NextAppointmentInterface[];
}

export type getAppointmentFilter =
  | "today"
  | "nearby"
  | "history"
  | "next"
  | "last";

export type getAppointmentStatus = "marcado" | "concluído" | "cancelado";

export async function getAppointment(
  filter: getAppointmentFilter = "history",
  status: getAppointmentStatus = "marcado",
) {
  const response = await api.get<GetAppointmentResponse>(
    "/client/getAppointment",
    {
      params: {
        filter,
        status,
      },
    },
  );

  return response.data.message;
}
