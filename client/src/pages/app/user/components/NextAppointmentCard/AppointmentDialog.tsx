import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function AppointmentDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full flex-1 py-5 font-bold md:w-auto md:py-3 lg:flex-none lg:py-5">
          Ver mais informações
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detalhes do seu próximo horário</DialogTitle>
        </DialogHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Marcado na data:</TableHead>
            </TableRow>
            <TableRow>
              <TableHead>Barbeiro:</TableHead>
            </TableRow>
            <TableRow>
              <TableHead>Data:</TableHead>
            </TableRow>
            <TableRow>
              <TableHead>Horário:</TableHead>
            </TableRow>
            <TableRow>
              <TableHead>Horário de término:</TableHead>
            </TableRow>
            <TableRow>
              <TableHead>Inicia em:</TableHead>
            </TableRow>
            <TableRow>
              <TableHead>Serviço:</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
      </DialogContent>
    </Dialog>
  );
}
