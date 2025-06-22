import { api } from "@/lib/axios";
import { formatDateRequest } from "@/utils/format-date-request";

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
  const formatedDate = formatDateRequest(date);

  await api.post("/client/registerAppointment", {
    startTime,
    date: formatedDate,
    service,
    idProfessional,
  });
}
