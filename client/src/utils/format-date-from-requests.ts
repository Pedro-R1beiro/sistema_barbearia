import { format } from "date-fns";

export function formatDateFromRequests(date: Date) {
  const formatedDate = format(date, "yyyy-M-d");

  return formatedDate;
}
