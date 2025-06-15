import { api } from "@/lib/axios";

interface SendRecoveryEmailBody {
  recoveryScreen: string;
  email: string;
}

export async function signIn({
  email,
  recoveryScreen = "http://localhost:5173/edit-password",
}: SendRecoveryEmailBody) {
  await api.post("/client/login", {
    email,
    recoveryScreen,
  });
}
