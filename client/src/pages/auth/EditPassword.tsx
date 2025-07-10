import { resetPassword } from "@/api/reset-password";
import { LinesWithOr } from "@/components/LinesWithOr";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, isAxiosError } from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router";
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
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const code = searchParams.get("code");

  const { mutateAsync: resetPasswordFn, isPending } = useMutation({
    mutationFn: resetPassword,
  });

  function handleResetPasswordError(error: AxiosError) {
    const code = error.response?.status;
    switch (code) {
      case 400:
        toast.error("Senha inválida ou igual a atual.");
        break;
      case 404:
        toast.error("Houve um erro. Solicite um novo e-mail de recuperação!", {
          action: {
            label: "Solicitar",
            onClick: () => navigate("/sign-in"),
          },
        });
        break;
      default:
        toast.error("Houve um erro interno. Tente novamente mais tarde!");
    }
  }

  useEffect(() => {
    if (!code) navigate("/sign-in");
  });

  async function onSubmitForm(data: FormData) {
    try {
      await resetPasswordFn({ code, newPassword: data.newPassword });
      navigate("/sign-in", { replace: true });
      toast.success("Senha alterada com sucesso.");
    } catch (error) {
      if (isAxiosError(error)) {
        handleResetPasswordError(error);
        return;
      }
      toast.error("Houve um erro interno. Tente novamente mais tarde!");
    }
  }

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
        <Button disabled={isPending} type="submit" className="w-full">
          {isPending ? "Enviando" : "Enviar"}
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
