import { LinesWithOr } from "@/components/LinesWithOr";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  newPassword: z.string().min(8, "Mínimo de 8 dígitos"),
});

type FormData = z.infer<typeof formSchema>;

export function EditPassword() {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  function onSubmitForm(data: FormData) {
    console.log(data);

    reset();
    toast.success("E-mail de recuperação enviado");
  }

  const navigate = useNavigate();

  return (
    <div className="text-background mt-20">
      <h1 className="mb-4 text-center text-xl font-bold">Recuperar senha</h1>

      <form
        onSubmit={handleSubmit(onSubmitForm)}
        className="bg-muted text-foreground space-y-6 rounded-md p-10 shadow-xl shadow-black/30"
      >
        <div className="space-y-2">
          <Label htmlFor="new-password">Digite sua nova senha</Label>
          <Input
            id="new-password"
            {...register("newPassword")}
            type="password"
          />
          {errors.newPassword && (
            <p className="text-sm text-rose-500 dark:text-rose-400">
              {errors.newPassword.message}
            </p>
          )}
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
