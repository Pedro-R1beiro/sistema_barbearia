import { AppointmentsTable } from "./components/AppointmentsTable";
import { NextAppointmentCard } from "./components/NextAppointmentCard";
import { NextAppointmentTimeCard } from "./components/NextAppointmentTimeCard";
import { NextAppointmentsCard } from "./components/NextAppointmentsCard";

export function Dashboard() {
  return (
    <div className="max-h-140 gap-x-14 gap-y-10 pb-20 md:gap-y-5 lg:mt-6 lg:grid lg:grid-cols-[1fr_350px] lg:grid-rows-[130px_1fr]">
      <div className="col-1 row-1 space-y-10 md:flex md:items-start md:gap-8 md:space-y-0">
        <NextAppointmentTimeCard />
        <NextAppointmentsCard />
      </div>
      <div className="row-span-2 my-8 min-h-full lg:my-0 lg:mt-0">
        <AppointmentsTable />
      </div>
      <div className="mt-8">
        <NextAppointmentCard />
      </div>
    </div>
  );
}
