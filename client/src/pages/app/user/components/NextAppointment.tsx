import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function NextAppointment() {
  return (
    <Card className="shadow-2xl">
      <CardHeader>
        <CardTitle className="text-xl">Próximo Horário marcado</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
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

        <div className="bg-foreground h-[0.09rem] w-full" />

        <div className="space-y-5">
          <Button className="w-full py-5 font-bold">Contatar barbeiro</Button>
          <Button className="w-full py-5 font-bold">
            Ver mais informações
          </Button>
          <Button className="w-full py-5 font-bold" variant="destructive">
            Cancelar agendamento
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
