import { api } from "@/lib/axios";

export type AppointmentInterface = {
  id: number;
  date: Date;
  created_at: {
    date: Date;
    time: string;
  };
  professionalName: string;
  clientName: string;
  services: {
    name: string;
    price: number;
  }[];
  startTime: string;
  status: getAppointmentStatus;
  endTime: string;
};

export interface GetAppointmentResponse {
  message: AppointmentInterface[];
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
        filter: filter ?? "",
        status: status ?? "",
      },
    },
  );

  return response.data.message;
}
