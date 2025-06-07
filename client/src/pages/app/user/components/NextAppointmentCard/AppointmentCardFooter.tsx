import { cancelAppointment } from "@/api/cancel-appointment";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { AppointmentDialog } from "./AppointmentDialog";
import { CardFooter } from "@/components/ui/card";

interface NextAppointmentProps {
  type?: "primary" | "secondary";
  id: number;
}

export function AppointmentCardFooter({
  type = "primary",
  id,
}: NextAppointmentProps) {
  const { mutateAsync: cancelAppointmentFn } = useMutation({
    mutationFn: cancelAppointment,
    onSuccess: () => {
      toast.success("Agendamento cancelado!");
    },
  });

  return (
    <CardFooter className="mt-6 md:mt-0 lg:mt-6">
      {type === "secondary" ? (
        <div className="w-full max-w-full space-y-5 md:flex md:flex-col md:justify-between md:gap-6 lg:gap-2">
          <Button
            variant="secondary"
            className="w-full flex-1 py-5 font-bold md:w-auto lg:flex-none"
          >
            Falar com barbeiro
          </Button>
          <Button
            variant="secondary"
            className="w-full flex-1 py-5 font-bold md:w-auto lg:flex-none"
          >
            Ver mais informações
          </Button>
          <Button
            onClick={() => cancelAppointmentFn({ id })}
            className="text-foreground w-full flex-1 bg-rose-600 py-5 font-bold hover:bg-rose-600/80 md:w-auto lg:flex-none"
          >
            Cancelar agendamento
          </Button>
        </div>
      ) : (
        <div className="w-full max-w-full space-y-5 md:flex md:flex-col md:justify-between md:gap-6 lg:gap-2">
          <Button className="w-full flex-1 py-5 font-bold md:w-auto lg:flex-none">
            Contatar barbeiro
          </Button>
          <AppointmentDialog />
          <Button
            onClick={() => cancelAppointmentFn({ id })}
            className="w-full flex-1 py-5 font-bold md:w-auto lg:flex-none"
            variant="customDestructive"
          >
            Cancelar agendamento
          </Button>
        </div>
      )}
    </CardFooter>
  );
}
