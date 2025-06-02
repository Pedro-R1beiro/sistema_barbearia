import { api } from "@/lib/axios";
import { formatDateFromRequests } from "@/utils/format-date-from-requests";

interface RegisterAppointmentBody {
  startTime: string;
  date: Date;
  idProfessional: number;
  service: number[];
}

export async function registerAppointment({
  startTime,
  date,
  service,
  idProfessional,
}: RegisterAppointmentBody) {
  const formatedDate = formatDateFromRequests(date);

  await api.post("/client/registerAppointment", {
    startTime,
    date: formatedDate,
    service,
    idProfessional,
  });
}
