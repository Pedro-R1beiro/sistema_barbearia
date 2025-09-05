import { api } from "@/lib/axios";

interface ResetPasswordBody {
  code: string | null;
  newPassword: string;
}

export async function resetPassword({ code, newPassword }: ResetPasswordBody) {
  if (!code) throw new Error();

  await api.patch("/client/resetPassword", {
    code,
    newPassword,
  });
}
