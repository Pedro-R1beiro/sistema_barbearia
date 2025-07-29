<?php 

namespace App\Controllers\Client;

use App\Controllers\Client\Appointment\AvailableTimeSlots;
use App\Controllers\Client\Appointment\GetAppointment;
use App\Controllers\Client\Appointment\GetServices;
use App\Controllers\Client\Appointment\CancelAppointment;
use App\Controllers\Client\Appointment\RegisterAppointment;

class AppointmentController extends ClienteController {
    public function availableTimeSlots($data)
    {
        $availableTimeSlots = new AvailableTimeSlots(
            $this->service,
            $this->prof,
            $this->vacat,
            $this->dayOff,
            $this->avail,
            $this->appo
        );
        return $availableTimeSlots->handle($data);
    }

    public function getAppointment($data)
    {
        $getAppointment = new GetAppointment($this->appo, $this->appoService);
        return $getAppointment->handle($data);
    }

    public function getServices()
    {
        $getServices = new GetServices($this->service);
        return $getServices->handle();
    }

    public function cancelAppointment($data)
    {
        $cancelAppointment = new CancelAppointment($this->appo);
        return $cancelAppointment->handle($data);
    }

    public function registerAppointment($data)
    {
        $registerAppointment = new RegisterAppointment(
            $this->service, 
            $this->prof, 
            $this->vacat, 
            $this->dayOff, 
            $this->avail, 
            $this->appo,
            $this->appoService);

        return $registerAppointment->handle($data);
    }
}

?>