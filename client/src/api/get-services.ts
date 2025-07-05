import { api } from "@/lib/axios";

interface GetServicesResponse {
  message: {
    id: number;
    name: string;
    price: string;
    duration: number;
    active: number;
  }[];
}

export async function getServices() {
  const response = await api.get<GetServicesResponse>("/client/getServices");

  return response.data.message;
}
