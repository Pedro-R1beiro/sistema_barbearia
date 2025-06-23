<?php

class Appointment
{
    private $conn;

    public function __construct($conn)
    {
        $this->conn = $conn;
    }

    public function isOnAppointment($date, $idProfessional, $startTime, $endTime)
    {
        if (is_numeric($idProfessional) && !empty($date) && !empty($startTime) && !empty($endTime)) {
            $sql = "SELECT * FROM appointments
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
                return $stmt->fetchAll(PDO::FETCH_ASSOC); // Retorna compromissos conflitantes
            }
        }
        return false;
    }

    public function get($filter = null, $status = null, $idProfessional = null, $idClient = null)
    {
        date_default_timezone_set('America/Sao_Paulo');
        $today = date('Y-m-d');
        $now = date('H:i:s');

        $sql = "SELECT
        ap.id,
        ap.date,
        ap.startTime,
        ap.endTime,
        ap.status,
        ap.created_at,
        p.name AS professionalName,
        c.name AS clientName
        FROM appointments ap
        INNER JOIN professionals p ON ap.idProfessional = p.id
        INNER JOIN clients c ON ap.idClient = c.id";

        $conditions = [];
        $params = [];

        $possible_status = [
            "booked",
            "completed",
            "canceled"
        ];
        if (isset($status)) {
            if (is_array($status)) {
                foreach ($status as $i => $value) {
                    $param = ":status$i";
                    $placeholders[] = "ap.status = $param";
                    $params[$param] = strtolower(trim($value));
                }
                $conditions[] = '(' . implode(' OR ', $placeholders) . ')';
            } else if (in_array($status, $possible_status)) {
                $conditions[] = "ap.status = :status";
                $params[':status'] = $status;
            }
        }

        if (!empty($idProfessional) && is_numeric($idProfessional)) {
            $conditions[] = "ap.idProfessional = :idProfessional";
            $params[':idProfessional'] = $idProfessional;
        }

        if (!empty($idClient) && is_numeric($idClient)) {
            $conditions[] = "ap.idClient = :idClient";
            $params[':idClient'] = $idClient;
        }

        if (!empty($filter)) {
            switch ($filter) {
                case 'today':
                    $conditions[] = "ap.date = :today";
                    $params[':today'] = $today;
                    break;

                case 'nearby':
                    $conditions[] = "(ap.date > :today OR (ap.date = :today AND ap.startTime > :now))";
                    $params[':today'] = $today;
                    $params[':now'] = $now;
                    break;

                case 'history':
                    $conditions[] = "(ap.date < :today OR (ap.date = :today AND ap.endTime < :now))";
                    $params[':today'] = $today;
                    $params[':now'] = $now;
                    break;

                case 'next':
                    $conditions[] = "(ap.date > :today OR (ap.date = :today AND ap.startTime > :now))";
                    $params[':today'] = $today;
                    $params[':now'] = $now;
                    break;

                case 'last':
                    $conditions[] = "(ap.date < :today OR (ap.date = :today AND ap.endTime < :now))";
                    $params[':today'] = $today;
                    $params[':now'] = $now;
                    break;

                case 'all':
                default:
                    break;
            }
        }

        if (!empty($conditions)) {
            $sql .= " WHERE " . implode(' AND ', $conditions);
        }

        if ($filter == 'next') {
            $sql .= " ORDER BY ap.date ASC, ap.startTime ASC LIMIT 1";
        } else if ($filter == 'last') {
            $sql .= " ORDER BY ap.date DESC, ap.startTime DESC LIMIT 1";
        } else {
            $sql .= " ORDER BY ap.date, ap.startTime";
        }

        $stmt = $this->conn->prepare($sql);

        foreach ($params as $key => $value) {
            $stmt->bindValue($key, $value);
        }

        if ($stmt->execute()) {
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        return false;
    }

    public function getById($id)
    {
        if (!empty($id) && is_numeric($id)) {
            $sql = "SELECT * FROM appointments WHERE id = :id";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':id', $id);

            if ($stmt->execute()) {
                return $stmt->fetch(PDO::FETCH_ASSOC); // Retorna o compromisso pelo ID
            }
        }
        return false;
    }

    public function patch($id, $status)
    {
        if (empty($id) || empty($status) || !is_numeric($id)) {
            return false;
        }

        $allowedValues = ['booked', 'canceled', 'completed'];

        if (!in_array($status, $allowedValues)) {
            return false;
        }

        $sql = "UPDATE appointments SET status = :status WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':status', $status);
        $stmt->bindParam(':id', $id);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    public function post($date, $startTime, $endTime, $idProfessional, $idClient)
    {
        if (!empty($date) && !empty($startTime) && is_numeric($idProfessional) && is_numeric($idClient)) {
            $date = trim($date);
            $startTime = trim($startTime);
            $endTime  = trim($endTime);

            $sql = "INSERT INTO appointments (date, startTime, endTime, idClient, idProfessional) VALUES (:date, :startTime, :endTime, :idClient, :idProfessional)";

            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':date', $date);
            $stmt->bindParam(':startTime', $startTime);
            $stmt->bindParam(':endTime', $endTime);
            $stmt->bindParam(':idClient', $idClient);
            $stmt->bindParam(':idProfessional', $idProfessional);

            if ($stmt->execute()) {
                return $this->conn->lastInsertId();
            }
        }
        return false;
    }

    public function delete($id)
    {
        if (is_numeric($id)) {
            $sql = "DELETE FROM appointments WHERE id = :id";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':id', $id);

            if ($stmt->execute()) {
                return true;
            }
        }
        return false;
    }
}
