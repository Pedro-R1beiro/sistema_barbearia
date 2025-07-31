import { api } from "@/lib/axios";

interface accountInformationResponse {
  message: {
    name: string;
    email: string;
    phone: string;
  };
}

export async function accountInformation() {
  const response = await api.get<accountInformationResponse>(
    "/client/accountInformation",
  );

  return response.data.message;
}
