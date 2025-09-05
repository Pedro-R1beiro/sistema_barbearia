<?php

namespace App\Models;

use App\Models\Services\Database;
use PDO;

class Availability extends Database
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getByProfessional($idProfessional, $dayWeek = null)
    {
        if (is_numeric($idProfessional)) {
            $sql = "SELECT * FROM availability WHERE idProfessional = :idProfessional";
            if (is_numeric($dayWeek)) {
                $sql .= " AND dayWeek = :dayWeek"; // Adiciona filtro por dia da semana se fornecido
            }
            $sql .= " ORDER BY dayWeek"; // Ordena por dia da semana
            $stmt = $this->getConnection()->prepare($sql);
            $stmt->bindParam(':idProfessional', $idProfessional);
            if (is_numeric($dayWeek)) {
                $stmt->bindParam(':dayWeek', $dayWeek);
            }
            if ($stmt->execute()) {
                return $stmt->fetchAll(PDO::FETCH_ASSOC); // Retorna os resultados como array associativo
            }
        }
        return false; // Retorna false se idProfessional não for numérico
    }

    public function post($idProfessional, $dayWeek, $startTime, $endTime, $breakTime = null, $startBreak = null, $endBreak = null)
    {
        if (is_numeric($idProfessional) && is_numeric($dayWeek) && !empty($startTime) && !empty($endTime)) {
            $conn = $this->getConnection();
            $sql = "INSERT INTO availability (idProfessional, dayWeek, startTime, endTime, break, startBreak, endBreak) VALUES (:idProfessional, :dayWeek, :startTime, :endTime, :break, :startBreak, :endBreak)";

            $stmt = $conn->prepare($sql);

            $stmt->bindParam(':idProfessional', $idProfessional, PDO::PARAM_INT);
            $stmt->bindParam(':dayWeek', $dayWeek, PDO::PARAM_INT);
            $stmt->bindParam(':startTime', $startTime);
            $stmt->bindParam(':endTime', $endTime);

            // Define valores para o intervalo (se fornecido)
            if (is_numeric($breakTime) && !empty($startBreak) && !empty($endBreak)) {
                $breakTimeValue = 1; // Assume 1 se houver intervalo
                $startBreakValue = $startBreak;
                $endBreakValue = $endBreak;
            } else {
                $breakTimeValue = 0; // 0 se não houver intervalo
                $startBreakValue = null;
                $endBreakValue = null;
            }

            $stmt->bindParam(':break', $breakTimeValue, PDO::PARAM_INT);
            $stmt->bindParam(':startBreak', $startBreakValue);
            $stmt->bindParam(':endBreak', $endBreakValue);

            if ($stmt->execute()) {
                $id = $conn->lastInsertId();
                return [
                    true,
                    'id' => $id
                ]; // Retorna true em caso de sucesso
            }
        }

        return false; // Retorna false se os dados obrigatórios não forem válidos
    }

    public function patch($id, $idProfessional, $dayWeek, $startTime, $endTime, $breakTime = null, $startBreak = null, $endBreak = null)
    {
        if (
            is_numeric($id) &&
            is_numeric($idProfessional) &&
            is_numeric($dayWeek) &&
            !empty($startTime) &&
            !empty($endTime)
        ) {
            $sql = "UPDATE availability
                    SET idProfessional = :idProfessional,
                        dayWeek = :dayWeek,
                        startTime = :startTime,
                        endTime = :endTime,
                        break = :break,
                        startBreak = :startBreak,
                        endBreak = :endBreak
                    WHERE id = :id";

            $stmt = $this->getConnection()->prepare($sql);

            // Bind dos dados
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
            $stmt->bindParam(':idProfessional', $idProfessional, PDO::PARAM_INT);
            $stmt->bindParam(':dayWeek', $dayWeek, PDO::PARAM_INT);
            $stmt->bindParam(':startTime', $startTime);
            $stmt->bindParam(':endTime', $endTime);

            // Define valores para o intervalo (se fornecido)
            if (is_numeric($breakTime) && !empty($startBreak) && !empty($endBreak)) {
                $breakTimeValue = 1; // Assume 1 se houver intervalo
                $startBreakValue = $startBreak;
                $endBreakValue = $endBreak;
            } else {
                $breakTimeValue = 0; // 0 se não houver intervalo
                $startBreakValue = null;
                $endBreakValue = null;
            }

            $stmt->bindParam(':break', $breakTimeValue, PDO::PARAM_INT);
            $stmt->bindParam(':startBreak', $startBreakValue);
            $stmt->bindParam(':endBreak', $endBreakValue);

            if ($stmt->execute()) {
                return true; // Retorna true em caso de sucesso
            }
        }

        return false; // Retorna false se os dados obrigatórios não forem válidos
    }

    public function delete($id)
    {
        if (is_numeric($id)) {
            $sql = "DELETE FROM availability WHERE id = :id";
            $stmt = $this->getConnection()->prepare($sql);
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);

            if ($stmt->execute()) {
                return true; // Retorna true em caso de sucesso
            }
        }

        return false; // Retorna false se o ID não for numérico
    }
}
