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
    validationScreen:
      "https://chatgpt.com/c/683634bc-8704-8011-b37c-8217e18efa12",
  });
}
