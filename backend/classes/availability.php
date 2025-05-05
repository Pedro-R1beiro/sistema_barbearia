<?php

class Availability
{
    public $conn;

    public function __construct($conn)
    {
        $this->conn = $conn;
    }

    public function getByProfessional($idProfessional, $dayWeek = null)
    {
        if (is_numeric($idProfessional)) {
            $sql = "SELECT * FROM availability WHERE idProfessional = :idProfessional";
            if (is_numeric($dayWeek)) {
                $sql .= " AND dayWeek = :dayWeek"; // Adiciona filtro por dia da semana se fornecido
            }
            $sql .= " ORDER BY dayWeek"; // Ordena por dia da semana
            $stmt = $this->conn->prepare($sql);
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
            $sql = "INSERT INTO availability (idProfessional, dayWeek, startTime, endTime, breakTime, startBreak, endBreak) VALUES (:idProfessional, :dayWeek, :startTime, :endTime, :breakTime, :startBreak, :endBreak)";

            $stmt = $this->conn->prepare($sql);

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

            $stmt->bindParam(':breakTime', $breakTimeValue, PDO::PARAM_INT);
            $stmt->bindParam(':startBreak', $startBreakValue);
            $stmt->bindParam(':endBreak', $endBreakValue);

            if ($stmt->execute()) {
                return true; // Retorna true em caso de sucesso
            }
        }

        return false; // Retorna false se os dados obrigatórios não forem válidos
    }

    public function put($id, $idProfessional, $dayWeek, $startTime, $endTime, $breakTime = null, $startBreak = null, $endBreak = null)
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
                        breakTime = :breakTime,
                        startBreak = :startBreak,
                        endBreak = :endBreak
                    WHERE id = :id";

            $stmt = $this->conn->prepare($sql);

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

            $stmt->bindParam(':breakTime', $breakTimeValue, PDO::PARAM_INT);
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
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);

            if ($stmt->execute()) {
                return true; // Retorna true em caso de sucesso
            }
        }

        return false; // Retorna false se o ID não for numérico
    }
}
