<?php 

namespace App\Models;

use PDO;

class AppointmentService {
    private $conn;

    public function __construct($conn)
    {
        $this->conn = $conn;
    }

    public function getBYAppointment(int $idAppointment) 
    {
        $sql = "SELECT aps.id, s.name AS serviceName, s.price AS servicePrice
            FROM appointment_services aps
            INNER JOIN services s ON aps.idService = s.id
            WHERE idAppointment = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':id', $idAppointment);
        if ($stmt->execute()) {
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        return false;
    }
    
    public function post(int $idService, int $idAppointment) 
    {
        $sql = "INSERT INTO appointment_services (idService, idAppointment) VALUES (:idService, :idAppointment)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':idService', $idService);
        $stmt->bindParam(':idAppointment', $idAppointment);
        if ($stmt->execute()) {
            return $this->conn->lastInsertId();
        }
        return false;
    }

    public function delete(int $id)
    {
        $sql = "DELETE FROM appointment_services WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':id', $id);
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }
}

?>