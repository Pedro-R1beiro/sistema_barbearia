import { useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { ArchivedAppointmentsContext } from ".";

interface ArchivedAppointmentsProviderProps {
  children: ReactNode;
}

const LOCALSTORAGEKEY = "@barbershop:archived-appointments-1.0.0";

export function ArchivedAppointmentsProvider({
  children,
}: ArchivedAppointmentsProviderProps) {
  const [archivedAppointmentsId, setArchivedAppointmentsId] = useState<
    number[]
  >([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCALSTORAGEKEY);
      if (stored) {
        setArchivedAppointmentsId(JSON.parse(stored));
      }
    } catch (err) {
      toast.error(
        "Não foi possível filtrar agendamentos arquivados. Recarregue a página",
      );
      console.log(err);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(
        LOCALSTORAGEKEY,
        JSON.stringify(archivedAppointmentsId),
      );
    } catch (err) {
      toast.error(
        "Não foi possível arquivar agendamento. Tente novamentre mais tarde!",
      );
      console.log(err);
    }
  }, [archivedAppointmentsId]);

  function addAppointmentId(id: number) {
    setArchivedAppointmentsId((prev) => {
      if (prev.includes(id)) {
        toast.error("O agendamento já foi arquivado!");
        return prev;
      }
      toast.success("O agendamento foi arquivado!", {
        action: {
          label: "ver arquivados",
          onClick: () => {},
        },
      });
      return [...prev, id];
    });
  }

  function removeAppointmentId(id: number) {
    setArchivedAppointmentsId((prev) =>
      prev.filter((archivedId) => archivedId !== id),
    );
  }

  return (
    <ArchivedAppointmentsContext.Provider
      value={{ archivedAppointmentsId, addAppointmentId, removeAppointmentId }}
    >
      {children}
    </ArchivedAppointmentsContext.Provider>
  );
}
