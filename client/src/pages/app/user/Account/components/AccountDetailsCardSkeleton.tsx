import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function AccountDetailsCardSkeleton() {
  return (
    <Card className="min-h-full md:flex-1">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-[1.375rem] font-bold">Sua conta</CardTitle>
        <FontAwesomeIcon icon={faUser} size="lg" />
      </CardHeader>
      <CardContent className="space-y-4 text-lg">
        <div>
          <span className="block font-bold">Seu nome</span>
          <Skeleton className="w-[272px] h-6.5" />
        </div>
        <div>
          <span className="block font-bold">Seu e-mail</span>
          <Skeleton className="w-[272px] h-6.5" />
        </div>
        <div>
          <span className="block font-bold">Seu número</span>
          <Skeleton className="w-[272px] h-6.5" />
        </div>

        <div className="bg-background h-[0.09rem] w-full border-b" />

        <Button disabled variant="secondary" className="w-full py-5 font-bold">
          Editar dados
        </Button>
        <Button
          disabled
          variant="customDestructive"
          className="w-full py-5 font-bold cursor-not-allowed"
        >
          Deletar conta
        </Button>
      </CardContent>
    </Card>
  );
}
