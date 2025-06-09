import { NextAppointmentCard } from "../components/NextAppointmentCard";
import { AppointmentsTable } from "./AppointmentsTable";
import { NextAppointmentTimeCard } from "./NextAppointmentTimeCard";
import { NextAppointmentsCard } from "./NextAppointmentsCard";

export function Dashboard() {
  return (
    <div className="gap-x-14 gap-y-10 pb-20 lg:mt-6 lg:grid lg:grid-cols-[1fr_350px] lg:grid-rows-[130px_1fr]">
      <div className="col-1 row-1 space-y-10 md:flex md:items-start md:gap-8 md:space-y-0">
        <NextAppointmentTimeCard />
        <NextAppointmentsCard />
      </div>
      <div className="mt-8 lg:mt-0">
        <NextAppointmentCard />
      </div>

      <AppointmentsTable />
    </div>
  );
}
