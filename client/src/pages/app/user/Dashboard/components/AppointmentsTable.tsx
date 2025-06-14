import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const appointments = Array.from({ length: 5 }, (_, index) => ({
  id: index + 1,
  barber: "José Alfredo",
  date: "Em 22 dias",
  status: "Marcado",
}));

export function AppointmentsTable() {
  return (
    <div className="bg-custom-foreground/70 text-background row-2 mt-8 max-h-[380px] overflow-y-hidden rounded-md p-4">
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
          {appointments.map((appointment) => (
            <TableRow
              key={appointment.id}
              className="text-foreground border-spacing-6"
            >
              <TableCell className="bg-background rounded-l-md font-medium">
                José Alfredo
              </TableCell>
              <TableCell className="bg-background">Em 22 dias</TableCell>
              <TableCell className="bg-background">
                <div className="mr-2 inline-block h-2 w-2 rounded-full bg-amber-300"></div>
                Marcado
              </TableCell>
              <TableCell className="bg-background">
                <Button className="bg-foreground w-full">VER</Button>
              </TableCell>
              <TableCell className="bg-background rounded-r-md text-right">
                <Button variant="destructive" className="w-full">
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
