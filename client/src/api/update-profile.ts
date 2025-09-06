import { api } from "@/lib/axios";

interface UpdateProfileBody {
  name: string;
  email: string;
  phone: string;
  currentPassword: string;
}

export async function updateProfile({
  name,
  email,
  phone,
  currentPassword,
}: UpdateProfileBody) {
  await api.patch("/client/changeInfo", {
    name,
    email,
    phone,
    password: currentPassword,
  });
}
