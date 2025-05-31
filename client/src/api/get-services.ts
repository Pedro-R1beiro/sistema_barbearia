import { api } from "@/lib/axios";

interface getServicesResponse {
    message: {
        id: number,
        name: string,
        price: string,
        duration: number,
        active: number
    }[]
}

export async function getServices() {
    const response = await api.get<getServicesResponse>("/client/getServices")

    return response.data.message
}