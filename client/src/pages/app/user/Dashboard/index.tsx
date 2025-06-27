import { NextAppointmentCard } from "@/components/NextAppointmentCard";
import { AppointmentsCardGroup } from "./components/AppointmentCardGroup";
import { NextAppointmentTimeCard } from "./components/NextAppointmentTimeCard";
import { NextAppointmentsCard } from "./components/NextAppointmentsCard";

export function Dashboard() {
  return (
    <div className="gap-x-14 gap-y-10 md:max-h-140 md:gap-y-5 lg:mt-6 lg:grid lg:grid-cols-[1fr_390px] lg:grid-rows-[130px_1fr]">
      <div className="col-1 row-1 space-y-10 md:flex md:items-start md:gap-8 md:space-y-0">
        <NextAppointmentTimeCard />
        <NextAppointmentsCard />
      </div>
      <div className="row-span-2 my-8 min-h-full lg:my-0 lg:mt-0 lg:min-w-96">
        <AppointmentsCardGroup />
      </div>
      <div className="my-8">
        <NextAppointmentCard />
      </div>
    </div>
  );
}
