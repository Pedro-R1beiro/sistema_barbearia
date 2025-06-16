import { api } from "@/lib/axios";

export type NextAppointmentInterface = {
  id: number;
  date: Date;
  created_at: {
    date: Date;
    time: string;
  };
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

export type getAppointmentStatus = "booked" | "completed" | "canceled";

interface GetAppointmentBody {
  filter?: getAppointmentFilter;
  status?: getAppointmentStatus;
}

export async function getAppointment({ filter, status }: GetAppointmentBody) {
  const response = await api.get<GetAppointmentResponse>(
    "/client/getAppointment",
    {
      params: {
        filter: filter ? filter : "",
        status: status ? status : "",
      },
    },
  );

  return response.data.message;
}
