import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

import { z } from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { signUp } from "@/api/sign-up";
import { toast } from "sonner";
import { isAxiosError, type AxiosError } from "axios";
import { PrivacyPoliciesDialog } from "@/components/PrivacyPoliciesDialog";

const registerSchema = z.object({
  name: z.string().min(2, "Mínimo de 2 caracteres"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(8, "Mínimo de 8 caracteres"),
  phone: z
    .string()
    .transform((val) => val.replace(/\D/g, ""))
    .refine((val) => val.length >= 10 && val.length <= 11, {
      message: "Telefone deve ter entre 10 e 11 dígitos",
    }),
});

type RegisterData = z.infer<typeof registerSchema>;

function signUpError(err: AxiosError) {
  const code = err.response?.status;
  console.log(err);

  switch (code) {
    case 400:
      {
        toast.error("Dados inválidos.");
      }
      break;
    case 409:
      {
        toast.error("Email já cadastrado.");
      }
      break;
    default: {
      toast.error("Houve um erro interno. Tente novamente mais tarde.");
    }
  }
}

export function Register() {
  const navigate = useNavigate();

  const { mutateAsync: signUpFn } = useMutation({
    mutationFn: signUp,
  });

  async function onSubmit(data: RegisterData) {
    try {
      await signUpFn(data);
      toast.success("Sucesso ao criar conta.", {
        action: {
          label: "Ir para o login",
          onClick: () => navigate("/sign-in"),
        },
      });
    } catch (err) {
      if (isAxiosError(err)) {
        signUpError(err);
        return;
      }
      toast.error("Houve um erro interno. Tente novamente mais tarde!");
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  return (
    <>
      <Button
        onClick={() => navigate("/sign-in")}
        className="dark:text-background dark:border-background/20 dark:bg-foreground dark:hover:bg-background/5 absolute top-5 left-5 z-10"
        variant="outline"
      >
        Já tem uma conta?
      </Button>
      <div className="border-foreground/80 dark:border-background/80 absolute mt-50 rounded-full border-2 p-10 px-48.5 lg:mt-50">
        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="dark:text-background relative mx-auto flex max-w-50 flex-col gap-1 text-center font-bold"
        >
          <div className="border-r-muted-foreground pointer-events-none absolute top-[-3.5rem] left-1/2 h-155 w-155 translate-x-[-50%] animate-[spin_1s_ease-in-out_infinite] rounded-full border-r-2"></div>
          <label htmlFor="name">Seu nome</label>
          <input
            id="name"
            type="text"
            {...register("name")}
            placeholder="Seu nome aqui"
            className="bg-muted dark:bg-muted-foreground/20 rounded-md p-2.5 placeholder:text-[0.75rem]"
          />
          {errors.name && (
            <span className="absolute top-18 left-3 text-sm text-rose-500">
              {errors.name.message}
            </span>
          )}

          <label htmlFor="email" className="mt-6">
            Seu e-mail
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            placeholder="exemplo@gmail.com"
            className="bg-muted dark:bg-muted-foreground/20 rounded-md p-2.5 placeholder:text-[0.75rem]"
          />
          {errors.email && (
            <span className="absolute top-43 left-10 text-sm text-rose-500">
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
            <span className="absolute top-68 left-3 text-sm text-rose-500">
              {errors.password.message}
            </span>
          )}

          <label htmlFor="phone" className="mt-6">
            Seu número
          </label>
          <input
            id="phone"
            type="tel"
            {...register("phone")}
            placeholder="(00) 00000-0000"
            className="bg-muted dark:bg-muted-foreground/20 rounded-md p-2.5 placeholder:text-[0.75rem]"
          />
          {errors.phone && (
            <span className="absolute top-93 left-3 text-sm text-rose-500">
              {errors.phone.message}
            </span>
          )}

          <Button
            disabled={isSubmitting}
            type="submit"
            className="dark:bg-background dark:hover:bg-background/90 dark:text-foreground mt-10 mb-3 py-5"
          >
            Entrar
          </Button>

          <p className="text-sm font-medium">
            Ao cadastrar, concordo com os{" "}
            <PrivacyPoliciesDialog>
              <span className="font-bold hover:underline">termos</span>
            </PrivacyPoliciesDialog>
            .
          </p>
        </form>
      </div>
    </>
  );
}
