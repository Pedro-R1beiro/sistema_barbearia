import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-12 font-bold">
      <h2 className="text-7xl text-rose-400 dark:text-rose-500">404</h2>
      <h1>Página não encontrada</h1>
      <Button
        onClick={() => navigate("/dashboard")}
        className="w-[200px] font-bold"
      >
        Voltar
      </Button>
    </div>
  );
}
