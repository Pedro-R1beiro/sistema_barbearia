import { format } from "date-fns";

export function formatDateRequest(date: Date) {
  const formatedDate = format(date, "yyyy-M-d");

  return formatedDate;
}
