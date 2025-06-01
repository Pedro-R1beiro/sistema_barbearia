import { api } from "@/lib/axios";
import { format } from "date-fns";

interface getAvailableTimeSlotsResponse {
  message: {
    id: number;
    name: string;
    email: string;
    phone: string;
    timeSlot: string[];
  }[];
}

interface getAvailableTimeSlotsQuery {
  date: Date;
  service: number[];
}

export async function getAvailableTimeSlots({
  date,
  service,
}: getAvailableTimeSlotsQuery) {
  const formatService = service.join(",");
  const formatDate = format(date, "yyyy-M-d");

  const response = await api.get<getAvailableTimeSlotsResponse>(
    "/client/availableTimeSlots",
    {
      params: {
        date: formatDate,
        service: formatService,
      },
    },
  );

  return response.data.message;
}
