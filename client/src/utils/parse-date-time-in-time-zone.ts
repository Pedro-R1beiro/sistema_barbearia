import { parse } from "date-fns";
import { toZonedTime } from "date-fns-tz";

export function parseDateTimeInTimeZone(date: Date, time: string): Date {
  const datePart = date.toISOString().split("T")[0];
  const combined = `${datePart} ${time}`;
  const parsed = parse(combined, "yyyy-MM-dd HH:mm:ss", new Date());

  return toZonedTime(parsed, "America/Sao_Paulo");
}
