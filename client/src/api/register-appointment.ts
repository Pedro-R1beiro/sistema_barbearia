import { api } from "@/lib/axios";
import { formatDate } from "@/utils/format-date";

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
  const formatedDate = formatDate(date);

  await api.post("/client/login", {
    startTime,
    date: formatedDate,
    service,
    idProfessional,
  });
}
