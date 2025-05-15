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

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

export function AppointmentsTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="bg-background">Barbeiro</TableHead>
          <TableHead className="bg-background">Data</TableHead>
          <TableHead className="bg-background">Situação</TableHead>
          <TableHead className="bg-background"></TableHead>
          <TableHead className="bg-background"></TableHead>
          <TableHead className="bg-background text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="bg-foreground">
        {invoices.map((invoice) => (
          <TableRow
            key={invoice.invoice}
            className="text-foreground border-spacing-6"
          >
            <TableCell className="bg-background font-medium">
              José Alfredo
            </TableCell>
            <TableCell className="bg-background">Em 22 dias</TableCell>
            <TableCell className="bg-background">
              <div className="mr-2 inline-block h-2 w-2 rounded-full bg-amber-300"></div>
              Marcado
            </TableCell>
            <TableCell className="bg-background">
              <Button>VER</Button>
            </TableCell>
            <TableCell className="bg-background"></TableCell>
            <TableCell className="bg-background text-right">
              <FontAwesomeIcon icon={faTrash} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
