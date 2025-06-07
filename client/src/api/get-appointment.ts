import { api } from "@/lib/axios";

export type NextAppointmentInterface = {
  id: number;
  date: Date;
  startTime: string;
  endTime: string;
  professionalName: string;
  clientName: string;
  serviceName: string;
  servicePrice: number;
};

interface getAppointmentResposne {
  message: NextAppointmentInterface[];
}

type getAppointmentFilter = "today" | "nearby" | "history" | "next" | "last";

export async function getAppointment(filter: getAppointmentFilter = "history") {
  const response = await api.get<getAppointmentResposne>(
    "/client/getAppointment",
    {
      params: {
        filter,
      },
    },
  );

  return response.data.message;
}
