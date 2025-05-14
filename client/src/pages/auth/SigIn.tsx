import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const signInSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string(),
});

type SignInData = z.infer<typeof signInSchema>;

export default function SigIn() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signInSchema),
  });

  function onSubmit(data: SignInData) {
    console.log(data);
  }

  return (
    <>
      <Button
        onClick={() => navigate("/register")}
        className="dark:text-background dark:border-background/20 dark:bg-foreground dark:hover:bg-background/5 absolute top-5 left-5 z-1000"
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
            Seu e-mail
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
          <p className="text-sm font-medium underline">Esqueci minha senha</p>
        </form>
      </div>
    </>
  );
}
