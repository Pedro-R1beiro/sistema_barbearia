import { NextAppointment } from "./components/NextAppointment";
import UserSchedulingForm from "./components/UserSchedulingForm";

export function UserSchedule() {
  return (
    <div className="space-y-12 pb-16">
      <UserSchedulingForm />
      <NextAppointment />
    </div>
  );
}
