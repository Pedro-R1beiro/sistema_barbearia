import { useEffect, useState } from "react";

import { parseDateTimeInTimeZone } from "@/utils/parse-date-time-in-time-zone";
import { intervalToDuration, isBefore } from "date-fns";

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
    if (!startDate || !startTime) return;

    const updateRemaining = () => {
      const now = new Date();
      const scheduledDateTime = parseDateTimeInTimeZone(startDate, startTime);

      if (isBefore(scheduledDateTime, now)) {
        setRemaining("");
        return;
      }

      const duration = intervalToDuration({
        start: now,
        end: scheduledDateTime,
      });

      if (duration.days) {
        setRemaining(
          `${duration.days} ${duration.days === 1 ? "dia" : "dias"}${duration.hours ? ` e ${duration.hours} h` : ""}`,
        );
      } else if (duration.hours) {
        setRemaining(
          `${duration.hours} ${duration.hours === 1 ? "hora" : "horas"}${duration.minutes ? ` e ${duration.minutes} m` : ""}`,
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
