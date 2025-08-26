import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ScheduleFormData } from "@/schemas/schedule-form";

interface SelectedAppointmentsTableProps {
  selectedServices: ScheduleFormData["services"];
}

export function SelectedAppointmentsTable({
  selectedServices,
}: SelectedAppointmentsTableProps) {
  return (
    <div>
      <Table className="p-0 px-0">
        <TableHeader className="">
          <TableHead className="h-2 px-0 w-full" />
          <TableHead className="h-2 px-0 min-w-[40px]" />
          <TableHead className="h-2 px-0 w-[20px]" />
        </TableHeader>
        <TableBody className="p-0 px-0">
          {selectedServices.map((service, index) => (
            <TableRow
              className="space-x-4 items-center font-medium"
              key={index}
            >
              <TableCell>{service.name}</TableCell>
              <TableCell className="text-muted-foreground">22,90</TableCell>
              <TableCell className="flex pt-2.5">
                <button
                  type="button"
                  className="bg-red-400 rounded-full  w-4 h-4 relative hover:bg-red-500 duration-200"
                >
                  <span className="absolute top-1/2 left-1/2 text-sm -translate-1/2">
                    -
                  </span>
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
