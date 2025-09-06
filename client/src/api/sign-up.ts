import { api } from "@/lib/axios";

interface SignInBody {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export async function signUp({ email, password, name, phone }: SignInBody) {
  await api.post("/client/signup", {
    name,
    email,
    password,
    phone,
    validationScreen: "http://localhost:5173/sign-in",
  });
}
