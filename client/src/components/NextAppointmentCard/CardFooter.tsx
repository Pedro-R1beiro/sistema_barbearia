import { Button } from "@/components/ui/button";
import { CardFooter as CardFooterUi } from "@/components/ui/card";
import { useState } from "react";
import { Phone, Search, Trash } from "lucide-react";
import { AppointmentDialog } from "@/components/AppointmentDialog";
import { useCancelAppointment } from "@/hooks/useCancelAppointment";
import { cn } from "@/lib/utils";

interface NextAppointmentProps {
  appointmentId: number;
  portraitModeOnLg: boolean;
}

export function CardFooter({
  appointmentId,
  portraitModeOnLg,
}: NextAppointmentProps) {
  const [isOpenDetails, setIsOpenDetails] = useState(false);

  const { cancelAppointmentFn, isPending } =
    useCancelAppointment(appointmentId);

  return (
    <CardFooterUi
      className={cn(
        "mt-6 md:mt-0 md:w-1/2 lg:mt-6",
        portraitModeOnLg && "lg:w-full",
      )}
    >
      <div
        className={cn(
          "w-full max-w-full md:flex md:flex-col md:justify-between md:gap-6",
          portraitModeOnLg ? "space-y-5 lg:gap-2" : "space-y-2",
        )}
      >
        <AppointmentDialog
          isOpenDetails={isOpenDetails}
          setIsOpenDetails={setIsOpenDetails}
          appointmentId={appointmentId}
        >
          ver detalhes <Search />
        </AppointmentDialog>
        <Button
          className={cn(
            "w-full flex-1 py-5 font-bold md:w-auto md:py-3",
            portraitModeOnLg ? "lg:flex-none lg:py-0" : "lg:flex-none lg:py-5",
          )}
        >
          falar com barbeiro <Phone />
        </Button>
        <Button
          disabled={isPending}
          onClick={() => cancelAppointmentFn({ appointmentId })}
          className={cn(
            "w-full flex-1 py-5 font-bold md:w-auto md:py-3",
            portraitModeOnLg ? "lg:flex-none lg:py-0" : "lg:flex-none lg:py-5",
          )}
          variant="customDestructive"
        >
          {isPending ? "cancelando..." : "cancelar agendamento"} <Trash />
        </Button>
      </div>
    </CardFooterUi>
  );
}
