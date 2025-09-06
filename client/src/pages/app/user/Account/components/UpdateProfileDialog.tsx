import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { accountInformation } from "@/api/account-informations";
import { updateProfile } from "@/api/update-profile";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { queryClient } from "@/lib/react-query";
import {
  type UpdateProfileData,
  updateProfileSchema,
} from "@/schemas/update-profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import IMask from "imask";
import { ArrowRight, X } from "lucide-react";
import { toast } from "sonner";

const errorMensage: Record<number, string> = {
  400: "Dados inválidos",
  404: "Erro com sua conta. Tente sair da conta e voltar!",
  500: "Ocorreu um eror interno, tente novamente mais tarde!",
};

function handleUpdateProfileError(error: AxiosError) {
  const statusCode = error.response?.status;
  if (!statusCode) {
    toast.error("Ocorreu um erro interno. Tente novamente mais tarde!");

    return;
  }
  const message = errorMensage[statusCode];
  toast.error(message);
}

export function UpdateProfileDialog() {
  const [open, setOpen] = useState(false);

  const { data: accountDetails } = useQuery({
    queryKey: ["account-information"],
    queryFn: accountInformation,
  });

  const { mutateAsync: updateProfileFn } = useMutation({
    mutationFn: updateProfile,
  });

  const {
    register,
    reset,
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<UpdateProfileData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      email: accountDetails?.email,
      name: accountDetails?.name,
      phone: accountDetails?.phone,
    },
  });

  useEffect(() => {
    if (accountDetails) {
      reset({
        email: accountDetails.email,
        name: accountDetails.name,
        phone: accountDetails.phone,
      });
    }
  }, [accountDetails, reset]);

  async function handleUpdateProfile({
    email,
    name,
    phone,
    currentPassword,
  }: UpdateProfileData) {
    try {
      await updateProfileFn({ email, name, phone, currentPassword });
      queryClient.invalidateQueries({
        queryKey: ["account-information"],
      });
      toast.success("Dados alterados com sucesso!");
      setOpen(false);
    } catch (err) {
      if (err instanceof AxiosError) {
        handleUpdateProfileError(err);
        return;
      }
      toast.error("Ocorreu um erro interno. Tente novamente mais tarde!");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="w-full py-5 font-bold">
          Editar dados
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="mb-4">
          <DialogTitle>Altere suas informações</DialogTitle>
        </DialogHeader>
        <Separator className="my-5 absolute right-0 top-[36px]" />
        <form
          onSubmit={handleSubmit(handleUpdateProfile)}
          className="space-y-3"
          noValidate
        >
          <div className="space-y-2.5">
            <Label>Alterar e-mail</Label>
            <Input type="email" {...register("email")} />
            {errors.email && (
              <p className="text-destructive text-sm -mt-1.5">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="space-y-2.5">
            <Label>Alterar nome</Label>
            <Input type="name" {...register("name")} />
            {errors.name && (
              <p className="text-destructive text-sm -mt-1.5">
                {errors.name.message}
              </p>
            )}
          </div>
          <div className="space-y-2.5">
            <Label>Alterar número</Label>
            <Controller
              name="phone"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input
                  {...field}
                  ref={(ref) => {
                    if (ref) {
                      IMask(ref, {
                        mask: "(00) 00000-0000",
                      });
                    }
                  }}
                  placeholder="(00) 00000-0000"
                />
              )}
            />
            {errors.phone && (
              <p className="text-destructive text-sm -mt-1.5">
                {errors.phone.message}
              </p>
            )}
          </div>
          <div className="space-y-2.5 w-full">
            <Label className="text-amber-400">Digite sua senha atual</Label>
            <Input type="password" {...register("currentPassword")} />
            {errors.currentPassword && (
              <p className="text-destructive text-sm -mt-1.5">
                {errors.currentPassword.message}
              </p>
            )}
          </div>
          <Separator className="my-5 absolute right-0 bottom-[60px]" />
          <div className="flex gap-4 mt-10">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                className="w-[150px] sm:w-[200px] max-w-full"
              >
                Cancelar
                <X />
              </Button>
            </DialogClose>

            <Button
              variant="action"
              disabled={isSubmitting}
              className="flex-1 hover:[&>svg]:translate-x-1 [&>svg]:duration-200"
            >
              {isSubmitting ? (
                <span className="h-4 w-4 border-2 border-background border-t-0 rounded-full animate-spin" />
              ) : (
                <>
                  Alterar
                  <ArrowRight />
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
