import { api } from "@/lib/axios";

export type AppointmentStatusType = "all" | "booked" | "completed" | "canceled";

export type GetAppointmentFilter =
  | "today"
  | "nearby"
  | "history"
  | "next"
  | "last";

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
  status: AppointmentStatusType;
  endTime: string;
};

export interface GetAppointmentResponse {
  message: AppointmentInterface[];
}

interface GetAppointmentQueries {
  filter?: GetAppointmentFilter;
  status?: AppointmentStatusType;
}

export async function getAppointment({
  filter,
  status,
}: GetAppointmentQueries) {
  const response = await api.get<GetAppointmentResponse>(
    "/client/getAppointment",
    {
      params: {
        filter: filter ?? "",
        status: status === "all" ? "" : status,
      },
    },
  );

  return response.data.message;
}
