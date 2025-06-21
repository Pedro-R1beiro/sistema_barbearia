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
    <div className="bg-custom-foreground text-background row-2 mt-8 max-h-[380px] overflow-auto rounded-md p-4">
      <Table className="border-separate border-spacing-x-0 border-spacing-y-2">
        <TableHeader>
          <TableRow>
            <TableHead className="bg-background rounded-l-md text-lg">
              Barbeiro
            </TableHead>
            <TableHead className="bg-background text-lg">Data</TableHead>
            <TableHead className="bg-background text-lg">Situação</TableHead>
            <TableHead className="bg-background w-[90px] text-lg"></TableHead>
            <TableHead className="bg-background w-[70px] rounded-r-md text-right text-lg"></TableHead>
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
  );
}
