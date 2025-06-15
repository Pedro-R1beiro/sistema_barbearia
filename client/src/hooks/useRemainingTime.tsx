import { useEffect, useState } from "react";
import { intervalToDuration, isBefore, parse } from "date-fns";

interface UseRemainingTimeParams {
  startDate: Date | undefined;
  startTime: string | undefined;
}

export function useRemainingTime({
  startDate,
  startTime,
}: UseRemainingTimeParams) {
  const [remaining, setRemaining] = useState<string>("");

  useEffect(() => {
    if (!startTime || !startDate) return;

    const updateRemaining = () => {
      const now = new Date();

      const scheduledDateAndTime = parse(
        `${startDate.toISOString().split("T")[0]} ${startTime}`,
        "yyyy-MM-dd HH:mm:ss",
        now,
      );

      if (isBefore(scheduledDateAndTime, now)) {
        setRemaining("");
        return;
      }

      const duration = intervalToDuration({
        start: now,
        end: scheduledDateAndTime,
      });

      if (duration.days) {
        setRemaining(
          `${duration.days} ${duration.days === 1 ? "dia" : "dias"}${duration.hours ? ` e ${duration.hours} hora(s)` : ""}`,
        );
      } else if (duration.hours) {
        setRemaining(
          `${duration.hours} ${duration.hours === 1 ? "hora" : "horas"}${duration.minutes ? ` e ${duration.minutes} minuto(s)` : ""}`,
        );
      } else if (duration.minutes) {
        setRemaining(
          `${duration.minutes} ${duration.minutes === 1 ? "minuto" : "minutos"}`,
        );
      } else {
        setRemaining("instantes");
      }
    };

    updateRemaining();
    const interval = setInterval(updateRemaining, 60 * 1000);

    return () => clearInterval(interval);
  }, [startDate, startTime]);

  return remaining;
}
