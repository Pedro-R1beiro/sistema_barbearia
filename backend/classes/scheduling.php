<?php

class Scheduling
{
    private $conn;

    public function __construct($conn)
    {
        $this->conn = $conn;
    }

    public function isOnScheduling($date, $idProfessional, $startTime, $endTime)
    {
        if (is_numeric($idProfessional) && !empty($date) && !empty($startTime) && !empty($endTime)) {
            $sql = "SELECT * FROM schedulings
                    WHERE date = :date
                    AND idProfessional = :idProfessional
                    AND ((:startTime >= startTime
                        AND :startTime < endTime)
                    OR (:endTime > startTime
                        AND :endTime <= endTime)
                    OR(:startTime <= startTime
                        AND :endTime >= endTime))";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':date', $date);
            $stmt->bindParam(':idProfessional', $idProfessional);
            $stmt->bindParam(':startTime', $startTime);
            $stmt->bindParam(':endTime', $endTime);
            if ($stmt->execute()) {
                return $stmt->fetchAll(PDO::FETCH_ASSOC); // Retorna agendamentos conflitantes
            }
        }
        return false; // Retorna false se os dados forem inválidos
    }

    public function get($filter = null, $idProfessional = null, $idClient = null)
    {
        $today = date('Y-m-d');

        $sql = "SELECT
        sc.date,
        sc.idProfessional,
        p.name AS professionalName,
        sc.startTime,
        sc.endTime,
        c.name AS clientName,
        s.name AS serviceName,
        s.price AS servicePrice
        FROM schedulings sc
        INNER JOIN professionals p ON sc.idProfessional = p.id
        INNER JOIN services s ON sc.idService = s.id
        INNER JOIN clients c ON sc.idClient = c.id";

        $conditions = [];
        $params = [];

        if (!empty($idProfessional) && is_numeric($idProfessional)) {
            $conditions[] = "sc.idProfessional = :idProfessional";
            $params[':idProfessional'] = $idProfessional;
        }

        if (!empty($idClient) && is_numeric($idClient)) {
            $conditions[] = "sc.idClient = :idClient";
            $params[':idClient'] = $idClient;
        }

        if (!empty($filter)) {
            switch ($filter) {
                case 'today':
                    $conditions[] = "sc.date = :today";
                    $params[':today'] = $today;
                    break;

                case 'next':
                    $conditions[] = "sc.date > :today";
                    $params[':today'] = $today;
                    break;

                case 'prev':
                    $conditions[] = "sc.date < :today";
                    $params[':today'] = $today;
                    break;

                case 'all':
                default:
                    break;
            }
        }

        if (!empty($conditions)) {
            $sql .= " WHERE " . implode(' AND ', $conditions);
        }

        $sql .= " ORDER BY sc.date, sc.startTime";

        $stmt = $this->conn->prepare($sql);

        foreach ($params as $key => $value) {
            $stmt->bindValue($key, $value);
        }

        if ($stmt->execute()) {
            return $stmt->fetchAll(PDO::FETCH_ASSOC); // Retorna os agendamentos filtrados
        }

        return false; // Retorna false em caso de erro
    }

    public function getById($id)
    {
        if (!empty($id) && is_numeric($id)) {
            $sql = "SELECT
                        sc.date,
                        sc.startTime,
                        sc.endTime,
                        s.name AS serviceName,
                        p.name AS professionalName,
                        c.name AS clientName
                    FROM schedulings sc
                    INNER JOIN services s ON sc.idService = s.id
                    INNER JOIN professionals p ON sc.idProfessional = p.id
                    INNER JOIN clients c ON sc.idClient = c.id
                    WHERE sc.id = :id";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':id', $id);

            if ($stmt->execute()) {
                return $stmt->fetch(PDO::FETCH_ASSOC); // Retorna o agendamento pelo ID
            }
        }
        return false; // Retorna false se o ID não for válido
    }


    public function getByService($idService)
    {
        if (!empty($idService) && is_numeric($idService)) {
            $sql = "SELECT
                        sc.date,
                        sc.startTime,
                        sc.endTime,
                        s.name AS serviceName,
                        p.name AS professionalName,
                        c.name AS clientName
                    FROM schedulings sc
                    INNER JOIN services s ON sc.idService = s.id
                    INNER JOIN professionals p ON sc.idProfessional = p.id
                    INNER JOIN clients c ON sc.idClient = c.id
                    WHERE sc.idService = :idService
                    ORDER BY sc.date, sc.startTime";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':idService', $idService);

            if ($stmt->execute()) {
                return $stmt->fetchAll(PDO::FETCH_ASSOC); // Retorna agendamentos para um serviço
            }
        }
        return false; // Retorna false se o ID do serviço não for válido
    }

    public function getByProfessional($idProfessional)
    {
        if (!empty($idProfessional) && is_numeric($idProfessional)) {
            $sql = "SELECT
                        sc.date,
                        sc.startTime,
                        sc.endTime,
                        s.name AS serviceName,
                        p.name AS professionalName,
                        c.name AS clientName
                    FROM schedulings sc
                    INNER JOIN services s ON sc.idService = s.id
                    INNER JOIN professionals p ON sc.idProfessional = p.id
                    INNER JOIN clients c ON sc.idClient = c.id
                    WHERE sc.idProfessional = :idProfessional
                    ORDER BY sc.date, sc.startTime";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':idProfessional', $idProfessional);

            if ($stmt->execute()) {
                return $stmt->fetchAll(PDO::FETCH_ASSOC); // Retorna agendamentos de um profissional
            }
        }
        return false; // Retorna false se o ID do profissional não for válido
    }

    public function getByClient($idClient)
    {
        if (!empty($idClient) && is_numeric($idClient)) {
            $sql = "SELECT
                        sc.date,
                        sc.startTime,
                        sc.endTime,
                        s.name AS serviceName,
                        p.name AS professionalName,
                        c.name AS clientName
                    FROM schedulings sc
                    INNER JOIN services s ON sc.idService = s.id
                    INNER JOIN professionals p ON sc.idProfessional = p.id
                    INNER JOIN clients c ON sc.idClient = c.id
                    WHERE sc.idClient = :idClient
                    ORDER BY sc.date, sc.startTime";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':idClient', $idClient);

            if ($stmt->execute()) {
                return $stmt->fetchAll(PDO::FETCH_ASSOC); // Retorna agendamentos de um cliente
            }
        }
        return false; // Retorna false se o ID do cliente não for válido
    }


    public function post($date, $startTime, $endTime, $idService, $idProfessional, $idClient)
    {
        if (!empty($date) && !empty($startTime) && !empty($startTime) && is_numeric($idService) && is_numeric($idProfessional) && is_numeric($idClient)) {
            $date = trim($date);
            $startTime = trim($startTime);
            $endTime  = trim($endTime);

            $sql = "INSERT INTO schedulings (date, startTime, endTime, idClient, idService, idProfessional) VALUE (:date, :startTime, :endTime, :idClient, :idService, :idProfessional)";

            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':date', $date);
            $stmt->bindParam(':startTime', $startTime);
            $stmt->bindParam(':endTime', $endTime);
            $stmt->bindParam(':idClient', $idClient);
            $stmt->bindParam(':idService', $idService);
            $stmt->bindParam(':idProfessional', $idProfessional);

            if ($stmt->execute()) {
                return true; // Retorna true em caso de sucesso
            }
        }
        return false; // Retorna false se os dados forem inválidos
    }

    public function delete($id)
    {
        if (is_numeric($id)) {
            $sql = "DELETE FROM schedulings WHERE id = :id";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':id', $id);

            if ($stmt->execute()) {
                return true; // Retorna true em caso de sucesso
            }
        }
        return false; // Retorna false se o ID não for numérico
    }
}
