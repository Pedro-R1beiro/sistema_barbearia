import { createContext } from "react";

interface ArchivedAppointmentsContextType {
  archivedAppointmentsId: number[];

  removeAppointmentId: (id: number) => void;
  addAppointmentId: (id: number) => void;
}

export const ArchivedAppointmentsContext = createContext(
  {} as ArchivedAppointmentsContextType,
);
