<?php

namespace App\Models;

use PDO;

class Vacation
{
    public $conn;

    public function __construct($conn)
    {
        $this->conn = $conn;
    }

    // Verifica se o profissional está de férias em uma data específica
    public function isOnVacation($idProfessional, $date)
    {
        if (is_numeric($idProfessional) && !empty($date)) {
            $sql = "SELECT 1 FROM vacation
                    WHERE idProfessional = :idProfessional
                    AND :date BETWEEN startDate AND endDate";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(":idProfessional", $idProfessional);
            $stmt->bindParam(":date", $date);
            if ($stmt->execute()) {
                return $stmt->fetch(PDO::FETCH_ASSOC) !== false; // Retorna true se estiver de férias
            }
        }
        return false; // Retorna false se os dados forem inválidos
    }

    // Retorna todas as férias de um profissional
    public function get($idProfessional)
    {
        if (is_numeric($idProfessional)) {
            $sql = "SELECT * FROM vacation
                    WHERE idProfessional = :idProfessional
                    ORDER BY startDate ASC"; // Ordena as férias por data de início
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':idProfessional', $idProfessional);
            if ($stmt->execute()) {
                return $stmt->fetchAll(PDO::FETCH_ASSOC); // Retorna um array com os períodos de férias
            }
        }
        return false; // Retorna false se idProfessional não for numérico
    }

    // Insere um novo período de férias
    public function post($idProfessional, $startDate, $endDate)
    {
        if (is_numeric($idProfessional) && !empty($startDate) && !empty($endDate)) {
            $sql = "INSERT INTO vacation (idProfessional, startDate, endDate)
                    VALUES (:idProfessional, :startDate, :endDate)";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':idProfessional', $idProfessional);
            $stmt->bindParam(':startDate', $startDate);
            $stmt->bindParam(':endDate', $endDate);
            return $stmt->execute(); // Retorna true em caso de sucesso
        }
        return false; // Retorna false se os dados forem inválidos
    }

    // Atualiza o período de férias
    public function put($id, $startDate, $endDate)
    {
        if (is_numeric($id) && !empty($startDate) && !empty($endDate)) {
            $sql = "UPDATE vacation
                    SET startDate = :startDate, endDate = :endDate
                    WHERE id = :id";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':startDate', $startDate);
            $stmt->bindParam(':endDate', $endDate);
            $stmt->bindParam(':id', $id);
            return $stmt->execute(); // Retorna true em caso de sucesso
        }
        return false; // Retorna false se os dados forem inválidos
    }

    // Remove um registro de férias
    public function delete($id)
    {
        if (is_numeric($id)) {
            $sql = "DELETE FROM vacation WHERE id = :id";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':id', $id);
            return $stmt->execute(); // Retorna true em caso de sucesso
        }
        return false; // Retorna false se o ID não for numérico
    }
}
