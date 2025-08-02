import { type Dispatch, type SetStateAction } from "react";

import type { AppointmentStatusType } from "@/api/get-appointment";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Archive, Calendar, Check, X } from "lucide-react";

interface FilterAppointmentsProps {
  setSelectedFilter: Dispatch<
    SetStateAction<AppointmentStatusType | "archiveds">
  >;
}

export function FilterAppointments({
  setSelectedFilter,
}: FilterAppointmentsProps) {
  return (
    <Select
      onValueChange={(value: AppointmentStatusType) => setSelectedFilter(value)}
    >
      <SelectTrigger>
        <SelectValue placeholder="todos" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">todos</SelectItem>
        <SelectItem value="booked">
          marcado <Calendar />
        </SelectItem>
        <SelectItem value="canceled">
          cancelado <X />
        </SelectItem>
        <SelectItem value="completed">
          concluído <Check />
        </SelectItem>
        <SelectItem value="archiveds">
          arquivados <Archive />
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
