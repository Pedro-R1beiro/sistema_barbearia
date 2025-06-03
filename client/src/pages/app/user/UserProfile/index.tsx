import { ContactButton } from "@/components/ContactButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NextAppointmentCard } from "../components/NextAppointmentCard";

export function UserProfile() {
  return (
    <div className="gap-16 space-y-10 lg:flex lg:items-stretch lg:space-y-0">
      <div className="w-full space-y-10 md:flex md:gap-6 md:space-y-0 lg:flex-row-reverse">
        <Card className="min-h-full md:flex-1">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-[1.375rem] font-bold">
              Sua conta
            </CardTitle>
            <FontAwesomeIcon icon={faUser} size="lg" />
          </CardHeader>
          <CardContent className="space-y-4 text-lg">
            <div>
              <span className="block font-bold">Seu nome</span>
              Usuário Nome dos Santos
            </div>
            <div>
              <span className="block font-bold">Seu e-mail</span>
              7YyGZ@example.com
            </div>
            <div>
              <span className="block font-bold">Seu número</span>
              (79) 9 9999-9999
            </div>

            <div className="bg-background h-[0.09rem] w-full border-b" />

            <Button variant="secondary" className="w-full py-5 font-bold">
              Editar dados
            </Button>
            <Button
              variant="customDestructive"
              className="w-full py-5 font-bold"
            >
              Deletar conta
            </Button>
          </CardContent>
        </Card>
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
              <span className="block font-bold">Endereço</span>
              <address>
                Rua exemplos, nª 20. <br />
                Bairro exemplos.
              </address>
            </div>
          </CardContent>
        </Card>
      </div>

      <NextAppointmentCard />
    </div>
  );
}
