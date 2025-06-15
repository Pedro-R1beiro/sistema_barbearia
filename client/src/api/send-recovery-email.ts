import { api } from "@/lib/axios";

interface SendRecoveryEmailBody {
  email: string;
  recoveryScreen?: string;
}

export async function sendRecoveryEmail({
  email,
  recoveryScreen = "http://localhost:5173/edit-password",
}: SendRecoveryEmailBody) {
  await api.post("/client/sendRecoveryEmail", {
    email,
    recoveryScreen,
  });
}
