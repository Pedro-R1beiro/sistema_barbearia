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
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email("Digite um e-mail válido"),
});

type FormData = z.infer<typeof formSchema>;

export function ForgotPasswordDialog() {
  const navigate = useNavigate();

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

  return (
    <Dialog>
      <DialogTrigger className="text-background w-full cursor-pointer text-sm font-medium underline duration-200 hover:scale-105">
        Esqueci minha senha
      </DialogTrigger>
      <DialogContent className="min-h-80">
        <DialogHeader>
          <DialogTitle>Esqueci minha senha</DialogTitle>
          <DialogDescription>
            Após informar seu e-mail, enviaremos um link de recuperação de senha
            pelo e-mail
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmitForm)} className="mt-6 space-y-3">
          <Label>Seu e-mail</Label>
          <Input type="email" {...register("email")} />
          {errors.email && (
            <p className="text-sm text-rose-500 dark:text-rose-400">
              {errors.email.message}
            </p>
          )}
          <div className="mt-8 flex justify-between">
            <Button type="submit" className="w-30">
              Enviar
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
