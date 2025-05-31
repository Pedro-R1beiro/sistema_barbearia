import { api } from "@/lib/axios";
import { format } from "date-fns";

interface getAppointmentResponse {
    message: {
        id: number,
        name: string,
        email: string,
        phone: string,
        timeSlot: string[]
    }[]
}

export interface getAppointmentQuery {
    date: Date,
    service: string[]
}

export async function getAppointment({date, service}: getAppointmentQuery) {
    const formatService = service.join(",");
    const formatDate = format(date, "yyyy-M-d");
 
    const response = await api.get<getAppointmentResponse>("/client/getAppointment": {
        params: {
            date: formatDate,
            service: formatService
        }
    })

    return response.data.message
}