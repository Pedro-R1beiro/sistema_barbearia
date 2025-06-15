import { LinesWithOr } from "@/components/LinesWithOr";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router";

export function EditPassword() {
  const navigate = useNavigate();

  return (
    <div className="text-background mt-20">
      <h1 className="mb-4 text-center text-xl font-bold">Recuperar senha</h1>

      <form className="bg-muted text-foreground space-y-6 rounded-md p-10 shadow-xl shadow-black/30">
        <div className="space-y-2">
          <Label>Digite sua nova senha</Label>
          <Input />
        </div>
        <Button type="submit" className="w-full">
          Enviar
        </Button>
        <LinesWithOr />
        <Button
          onClick={() => navigate("/sign-in")}
          variant="outline"
          className="w-full"
        >
          Entrar com minha conta
        </Button>
        <Button
          onClick={() => navigate("/sign-up")}
          variant="ghost"
          className="w-full"
        >
          Cadastrar
        </Button>
      </form>
    </div>
  );
}
