import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";

export function formatDateRequest(date: Date) {
  const timeZone = "America/Sao_Paulo";
  const localDate = toZonedTime(date, timeZone);

  const formatedDate = format(localDate, "yyyy-M-d");

  return formatedDate;
}
