import { api } from "@/lib/axios";
import { formatDateRequest } from "@/utils/format-date-request";

export type BarberAvailabilityStatus =
  | "day_off"
  | "on_vacation"
  | "not_working"
  | "fully_booked"
  | "available";

interface GetAvailableTimeSlotsResponse {
  message: {
    id: number;
    name: string;
    email: string;
    phone: string;
    timeSlot: string[];
    status: BarberAvailabilityStatus;
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

  const response = await api.get<GetAvailableTimeSlotsResponse>(
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
