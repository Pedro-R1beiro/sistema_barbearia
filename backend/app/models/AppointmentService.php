<?php 

namespace App\Models;

use App\Models\Services\Database;
use PDO;

class AppointmentService  extends Database
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getByService(int $idService)
    {
        $sql = "SELECT aps.id, s.name AS serviceName, s.price AS servicePrice
            FROM appointment_services aps
            INNER JOIN services s ON aps.idService = s.id
            WHERE idService = :id";
        $stmt = $this->getConnection()->prepare($sql);
        $stmt->bindParam(':id', $idService);
        if ($stmt->execute()) {
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        return false;
    }

    public function getByAppointment(int $idAppointment) 
    {
        $sql = "SELECT aps.id, s.name AS serviceName, s.price AS servicePrice
            FROM appointment_services aps
            INNER JOIN services s ON aps.idService = s.id
            WHERE idAppointment = :id";
        $stmt = $this->getConnection()->prepare($sql);
        $stmt->bindParam(':id', $idAppointment);
        if ($stmt->execute()) {
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        return false;
    }
    
    public function post(int $idService, int $idAppointment) 
    {
        $conn = $this->getConnection();
        $sql = "INSERT INTO appointment_services (idService, idAppointment) VALUES (:idService, :idAppointment)";
        $stmt = $this->getConnection()->prepare($sql);
        $stmt->bindParam(':idService', $idService);
        $stmt->bindParam(':idAppointment', $idAppointment);
        if ($stmt->execute()) {
            $id = $conn->lastInsertId();
            return [
                true,
                'id' => $id
            ];
        }
        return false;
    }

    public function delete(int $id)
    {
        $sql = "DELETE FROM appointment_services WHERE id = :id";
        $stmt = $this->getConnection()->prepare($sql);
        $stmt->bindParam(':id', $id);
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }
}

?>