import type { getAppointmentStatus } from "@/api/get-appointment";

interface AppointmentStatusProps {
  status: getAppointmentStatus;
}

const AppointmentStatusMap: Record<getAppointmentStatus, string> = {
  booked: "marcado",
  canceled: "cancelado",
  completed: "concluído",
};

export function AppointmentStatus({ status }: AppointmentStatusProps) {
  return (
    <div className="flex items-center gap-2 text-sm">
      {status === "canceled" && (
        <span className="h-2 w-2 rounded-full bg-rose-400" />
      )}
      {status === "completed" && (
        <span className="h-2 w-2 rounded-full bg-teal-400" />
      )}
      {status === "booked" && (
        <span className="h-2 w-2 rounded-full bg-amber-400" />
      )}

      <span className="text-muted-foreground font-medium">
        {AppointmentStatusMap[status]}
      </span>
    </div>
  );
}
