import { api } from "@/lib/axios";
import { formatDateRequest } from "@/utils/format-date-request";

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
  const formatedDate = formatDateRequest(date);

  const response = await api.get<getAvailableTimeSlotsResponse>(
    "/client/availableTimeSlots",
    {
      params: {
        date: formatedDate,
        service: formatService,
      },
    },
  );

  return response.data.message;
}
