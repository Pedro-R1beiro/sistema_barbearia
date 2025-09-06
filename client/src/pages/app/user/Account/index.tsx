import { AccountDetailsCard } from "./components/AccountDetailsCard";
import { AccountDetailsCardSkeleton } from "./components/AccountDetailsCardSkeleton";
import { accountInformation } from "@/api/account-informations";
import { ContactButton } from "@/components/ContactButton";
import { NextAppointmentCard } from "@/components/NextAppointmentCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { useQuery } from "@tanstack/react-query";

export function Account() {
  const { isLoading } = useQuery({
    queryKey: ["account-information"],
    queryFn: accountInformation,
  });

  return (
    <div className="gap-16 space-y-10 lg:flex lg:items-stretch lg:space-y-0">
      <div className="w-full space-y-10 md:flex md:gap-6 md:space-y-0 lg:flex-row-reverse">
        {isLoading ? <AccountDetailsCardSkeleton /> : <AccountDetailsCard />}
        <Card className="bg-custom-foreground text-background min-h-full border-4 md:flex-1">
          <CardHeader>
            <div className="flex items-center gap-4">
              <ContactButton icon={faWhatsapp} link="whatsapp.api.client" />
              <ContactButton icon={faInstagram} link="instagram.client" />
            </div>
            <CardTitle className="text-[1.375rem] font-bold">
              Nome da barbearia aqui
            </CardTitle>
            <CardDescription className="text-background">
              Recado para o cliente aqui.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-lg">
            <div className="bg-background h-[0.09rem] w-full" />
            <div>
              <span className="block font-bold">Instagram:</span>
              @sua_barbearia
            </div>
            <div>
              <span className="block font-bold">Número:</span>
              (79) 9 9999-9999
            </div>
            <div>
              <span className="block font-bold">Endereço:</span>
              <address>
                Rua exemplos, nª 20. <br />
                Bairro exemplos.
              </address>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="min-w-78">
        <NextAppointmentCard portraitModeOnLg />
      </div>
    </div>
  );
}
