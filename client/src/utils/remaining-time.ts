import { format, intervalToDuration, isBefore, parse } from "date-fns";

interface RemainingTimeParams {
  startDate: Date;
  startTime: string;
}

export function remainingTime({ startDate, startTime }: RemainingTimeParams) {
  const now = new Date();

  const formattedDate = format(startDate, "yyyy-MM-dd");

  const scheduledDateAndTime = parse(
    `${formattedDate} ${startTime}`,
    "yyyy-MM-dd HH:mm:ss",
    now,
  );

  if (isBefore(startTime, now)) {
    return "Já começou ou passou do horário!";
  }

  if (isBefore(scheduledDateAndTime, now)) return "";

  const duration = intervalToDuration({
    start: now,
    end: scheduledDateAndTime,
  });

  if (duration.days) {
    return `${duration.days} ${duration.days === 1 ? "dia" : "dias"}`;
  } else if (duration.hours) {
    return `${duration.hours} ${duration.hours === 1 ? "hora" : "horas"}`;
  } else if (duration.minutes) {
    return `${duration.minutes} ${duration.minutes === 1 ? "minuto" : "minutos"}`;
  } else {
    return "instantes";
  }
}
