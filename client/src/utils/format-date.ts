import { format } from "date-fns";

export function formatDate(date: Date) {
  const formatedDate = format(date, "yyyy-M-d");

  return formatedDate;
}
