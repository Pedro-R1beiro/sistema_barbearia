import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import { sendRecoveryEmail } from "@/api/send-recovery-email";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, isAxiosError } from "axios";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email(),
});

type FormData = z.infer<typeof formSchema>;

export function ForgotPasswordDialog() {
  const navigate = useNavigate();

  const { mutateAsync: sendRecoveryEmailFn, isPending } = useMutation({
    mutationFn: sendRecoveryEmail,
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  function hadleSendRecoveryEmailError(error: AxiosError) {
    const code = error.response?.status;

    switch (code) {
      case 400:
        toast.error("E-mail inválido");
        break;
      case 404:
        toast.error("E-mail não encontrado ou não cadastrado", {
          action: {
            label: "Criar conta",
            onClick: () => navigate("/sign-up"),
          },
        });
        break;
      default:
        toast.error("Houve um erro interno. Tente novamente mais tarde");
    }
  }

  async function onSubmitForm({ email }: FormData) {
    try {
      await sendRecoveryEmailFn({ email });
      toast.success("E-mail de recuperação enviado");
      reset();
    } catch (error) {
      if (isAxiosError(error)) {
        hadleSendRecoveryEmailError(error);
        return;
      }
      toast.error("Houve um erro interno. Tente novamente mais tarde");
    }
  }

  return (
    <Dialog>
      <DialogTrigger className="text-background w-full cursor-pointer text-sm font-medium underline duration-200 hover:scale-105">
        Esqueci minha senha
      </DialogTrigger>
      <DialogContent className="z-100000 min-h-80">
        <DialogHeader>
          <DialogTitle>Esqueci minha senha</DialogTitle>
          <DialogDescription>
            Após informar seu e-mail, enviaremos um link de recuperação de senha
            por ele.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmitForm)}
          className="mt-6 space-y-3"
          noValidate
        >
          <Label>Seu e-mail</Label>
          <Input type="email" {...register("email")} />
          {errors.email && (
            <p className="text-sm text-rose-500 dark:text-rose-400">
              Digite um e-mail válido
            </p>
          )}
          <div className="mt-8 flex justify-between">
            <Button type="submit" disabled={isPending} className="w-24 md:w-30">
              {isPending ? "Enviando..." : "Enviar"}
            </Button>
            <Button onClick={() => navigate("/sign-up")} variant="secondary">
              Não tenho uma conta
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
