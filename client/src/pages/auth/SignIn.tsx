import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import { ForgotPasswordDialog } from "./ForgotPasswordDialog";
import { signIn } from "@/api/sign-in";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, isAxiosError } from "axios";
import { toast } from "sonner";
import { z } from "zod";

const signInSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string(),
});

function signInError(err: AxiosError) {
  const code = err.response?.status;

  switch (code) {
    case 400:
      {
        toast.error("Dados inválidos.");
      }
      break;
    case 401:
      {
        toast.error("Email ou senha incorretos.");
      }
      break;
    default: {
      toast.error("Houve um erro interno. Tente novamente mais tarde.");
    }
  }
}

type SignInData = z.infer<typeof signInSchema>;

export function SignIn() {
  const navigate = useNavigate();

  const { mutateAsync: signInFn } = useMutation({
    mutationFn: signIn,
    mutationKey: ["a"],
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signInSchema),
  });

  async function onSubmit(data: SignInData) {
    try {
      await signInFn(data);
      toast.success("Logado com sucesso!");
      navigate("/dashboard", { replace: true });
    } catch (err) {
      if (isAxiosError(err)) {
        signInError(err);
        return;
      }
      toast.error("Houve um erro interno. Tente novamente mais tarde!");
    }
  }

  return (
    <>
      <Button
        onClick={() => navigate("/sign-up")}
        className="dark:text-background dark:border-background/20 dark:bg-foreground dark:hover:bg-background/5 absolute top-5 left-5 z-10"
        variant="outline"
      >
        Não tem uma conta?
      </Button>
      <div className="border-foreground/80 dark:border-background/80 absolute mt-20 rounded-full border-2 p-15 px-26 lg:mt-50">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="dark:text-background relative mx-auto flex max-w-50 flex-col gap-1 text-center font-bold"
          noValidate
        >
          <div className="border-r-muted-foreground pointer-events-none absolute top-[-4.75rem] left-1/2 h-110 w-110 translate-x-[-50%] animate-[spin_1s_ease-in-out_infinite] rounded-full border-r-2"></div>

          <label htmlFor="email">Seu e-mail</label>
          <input
            id="email"
            type="email"
            {...register("email")}
            placeholder="example@gmail.com"
            className="bg-muted dark:bg-muted-foreground/20 rounded-md p-2.5 placeholder:text-[0.75rem]"
          />
          {errors.email && (
            <span className="absolute top-18 left-12 text-sm text-rose-500">
              {errors.email.message}
            </span>
          )}

          <label htmlFor="password" className="mt-6">
            Sua senha
          </label>
          <input
            id="password"
            type="password"
            {...register("password")}
            placeholder="********"
            className="bg-muted dark:bg-muted-foreground/20 rounded-md p-2.5 placeholder:text-[0.75rem]"
          />
          {errors.password && (
            <span className="absolute top-40 left-12 text-sm text-rose-500">
              {errors.password.message}
            </span>
          )}

          <Button
            disabled={isSubmitting}
            type="submit"
            className="dark:bg-background dark:hover:bg-background/90 dark:text-foreground mt-10 mb-3 py-5"
          >
            Entrar
          </Button>
        </form>
        <ForgotPasswordDialog />
      </div>
    </>
  );
}
