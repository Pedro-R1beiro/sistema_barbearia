import { getAppointment } from "@/api/get-appointment";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { AppointmentTableRow } from "./AppointmentTableRow";

export function AppointmentsTable() {
  const { data: appointmentData } = useQuery({
    queryKey: ["appointments"],
    queryFn: () => getAppointment({}),
  });

  return (
    <div className="bg-custom-foreground/80 text-background row-2 max-h-full overflow-hidden rounded-md p-4">
      <div className="max-h-132 overflow-auto">
        <Table className="border-separate border-spacing-x-0 border-spacing-y-2">
          <TableHeader>
            <TableRow>
              <TableHead className="bg-background rounded-l-md">
                Barbeiro
              </TableHead>
              <TableHead className="bg-background w-[90px]">Data</TableHead>
              <TableHead className="bg-background w-[90px]">Situação</TableHead>
              <TableHead className="bg-background w-[90px]"></TableHead>
              <TableHead className="bg-background w-[70px] rounded-r-md text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-foreground">
            {appointmentData &&
              appointmentData.map((appointment) => (
                <AppointmentTableRow appointment={appointment} />
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
