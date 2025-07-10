<?php

namespace App\Models;

use PDO;

class DayOff
{
    public $conn;

    public function __construct($conn)
    {
        $this->conn = $conn;
    }

    public function isOnDayOff($idProfessional, $date)
    {
        if (is_numeric($idProfessional) && !empty($date)) {
            $sql = "SELECT 1 FROM dayOff
                    WHERE idProfessional = :idProfessional
                    AND date = :date";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(":idProfessional", $idProfessional);
            $stmt->bindParam(":date", $date);
            if ($stmt->execute()) {
                return $stmt->fetch(PDO::FETCH_ASSOC); // Retorna um array se for dia de folga, false caso contrário
            }
        }
        return false; // Retorna false se os dados de entrada não forem válidos
    }

    public function get($idProfessional)
    {
        if (is_numeric($idProfessional)) {
            $sql = "SELECT * FROM dayOff WHERE idProfessional = :idProfessional";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':idProfessional', $idProfessional);
            if ($stmt->execute()) {
                return $stmt->fetchAll(PDO::FETCH_ASSOC); // Retorna todos os dias de folga do profissional
            }
        }
        return false; // Retorna false se idProfessional não for numérico
    }

    public function post($idProfessional, $date)
    {
        if (is_numeric($idProfessional) && !empty($date)) {
            $sql = "INSERT INTO dayOff (idProfessional, date) VALUES (:idProfessional, :date)";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':idProfessional', $idProfessional);
            $stmt->bindParam(':date', $date);
            if ($stmt->execute()) {
                return true; // Retorna true em caso de sucesso
            }
        }
        return false; // Retorna false se os dados de entrada não forem válidos
    }

    public function put($id, $date)
    {
        if (is_numeric($id) && !empty($date)) {
            $sql = "UPDATE dayOff SET date = :date WHERE id = :id";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':date', $date);
            $stmt->bindParam(':id', $id);
            if ($stmt->execute()) {
                return true; // Retorna true em caso de sucesso
            }
        }
        return false; // Retorna false se os dados de entrada não forem válidos
    }

    public function delete($id)
    {
        if (is_numeric($id)) {
            $sql = "DELETE FROM dayOff WHERE id = :id";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':id', $id);
            if ($stmt->execute()) {
                return true; // Retorna true em caso de sucesso
            }
        }
        return false; // Retorna false se o ID não for numérico
    }
}
