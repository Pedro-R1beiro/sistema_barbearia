import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { ptBR } from "date-fns/locale";

export function formatDateUtc(date: Date, formatStr: string) {
  const timeZone = "America/Sao_Paulo";
  const localDate = toZonedTime(`${date}T00:00:00`, timeZone);

  const formatedDate = format(localDate, formatStr, {
    locale: ptBR,
  });

  return formatedDate;
}
