import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface NextAppointmentProps {
  type?: "primary" | "secondary";
}

export function NextAppointment({ type = "primary" }: NextAppointmentProps) {
  return (
    <Card
      className={`shadow-2xl lg:min-w-85 ${
        type === "secondary" && "bg-custom-foreground text-background"
      }`}
    >
      <CardHeader>
        <CardTitle className="text-xl font-bold md:text-2xl lg:text-xl">
          Próximo Horário marcado
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6 md:flex-row md:justify-between lg:flex-col">
        <div className="flex h-full flex-col gap-6 md:justify-between">
          <div>
            <ul>
              <li>
                <p>
                  <span className="font-bold">Barbeiro</span>: José Alfredo
                </p>
              </li>
              <li>
                <p>
                  <span className="font-bold">Data</span>: José Alfredo
                </p>
              </li>
              <li>
                <p>
                  <span className="font-bold">Horário</span>: José Alfredo
                </p>
              </li>
            </ul>
          </div>

          <div>
            <p>
              <span className="block text-2xl font-bold">22 dias</span>
              para seu serviço
            </p>
          </div>

          <div>
            <span className="block text-2xl font-bold">Total</span>
            <span>R$ 30.00</span>
          </div>
        </div>

        <div
          className={`bg-foreground h-[0.01rem] max-h-full w-full md:h-[16rem] md:w-[0.1rem] lg:h-[0.1rem] lg:w-full ${
            type === "secondary" && "bg-background dark:bg-background"
          }`}
        />

        {type === "secondary" ? (
          <div className="max-w-full space-y-5 md:flex md:flex-col md:justify-between md:gap-6 lg:gap-2">
            <Button
              variant="secondary"
              className="w-full flex-1 py-5 font-bold md:w-auto lg:flex-none"
            >
              Contatar barbeiro
            </Button>
            <Button
              variant="secondary"
              className="w-full flex-1 py-5 font-bold md:w-auto lg:flex-none"
            >
              Ver mais informações
            </Button>
            <Button className="text-foreground w-full flex-1 bg-rose-600 py-5 font-bold hover:bg-rose-600/80 md:w-auto lg:flex-none">
              Cancelar agendamento
            </Button>
          </div>
        ) : (
          <div className="max-w-full space-y-5 md:flex md:flex-col md:justify-between md:gap-6 lg:gap-2">
            <Button className="w-full flex-1 py-5 font-bold md:w-auto lg:flex-none">
              Contatar barbeiro
            </Button>
            <Button className="w-full flex-1 py-5 font-bold md:w-auto lg:flex-none">
              Ver mais informações
            </Button>
            <Button
              className="w-full flex-1 py-5 font-bold md:w-auto lg:flex-none"
              variant="destructive"
            >
              Cancelar agendamento
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
