import { UpdateProfileDialog } from "../components/UpdateProfileDialog";
import { accountInformation } from "@/api/account-informations";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPhoneNumber } from "@/utils/format-phone-number";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";

export function AccountDetailsCard() {
  const { data: accountDetails } = useQuery({
    queryKey: ["account-information"],
    queryFn: accountInformation,
  });

  if (!accountDetails) return;

  const formatedPhone = formatPhoneNumber(accountDetails.phone);

  return (
    <Card className="min-h-full md:flex-1">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-[1.375rem] font-bold">Sua conta</CardTitle>
        <FontAwesomeIcon icon={faUser} size="lg" />
      </CardHeader>
      <CardContent className="space-y-4 text-lg">
        <div>
          <span className="block font-bold">Seu nome</span>
          {accountDetails.name}
        </div>
        <div>
          <span className="block font-bold">Seu e-mail</span>
          {accountDetails.email}
        </div>
        <div>
          <span className="block font-bold">Seu número</span>
          {formatedPhone}
        </div>

        <div className="bg-background h-[0.09rem] w-full border-b" />

        <UpdateProfileDialog />
        <Button variant="customDestructive" className="w-full py-5 font-bold">
          Deletar conta
        </Button>
      </CardContent>
    </Card>
  );
}
