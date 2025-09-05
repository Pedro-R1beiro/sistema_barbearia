<?php

namespace App\Models;

use App\Models\Services\Database;
use PDO;

class Service extends Database
{
    private $appoService;

    public function __construct()
    {
        parent::__construct();
        $this->appoService = new AppointmentService(); // Instancia a classe de procedimentos (serviços->agendamento)
    }

    public function get()
    {
        # Seleciona todos os serviços ativos
        $sql = "SELECT * FROM services WHERE active = 1";
        $stmt = $this->getConnection()->query($sql);

        return $stmt->fetchAll(PDO::FETCH_ASSOC); // Retorna os serviços como array associativo
    }

    public function getById($id)
    {
        if (is_numeric($id)) {
            # Seleciona um serviço específico pelo ID
            $sql = "SELECT * FROM services WHERE id = :id AND active = 1";
            $stmt = $this->getConnection()->prepare($sql);
            $stmt->bindParam(':id', $id);
            if ($stmt->execute()) {
                return $stmt->fetch(PDO::FETCH_ASSOC); // Retorna o serviço ou false se não encontrado
            }
        }
        return false; // Retorna false se o ID não for numérico
    }

    public function post($name, $price, $duration)
    {
        # Adiciona um novo serviço
        $name = trim($name);
        $price = trim($price);
        $duration = trim($duration);

        if (!empty($name) && is_numeric($price) && is_numeric($duration)) {
            $conn = $this->getConnection();
            $sql = "INSERT INTO services (name, price, duration) VALUES (:name, :price, :duration)";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':name', $name);
            $stmt->bindParam(':price', $price);
            $stmt->bindParam(':duration', $duration);

            if ($stmt->execute()) {
                $id = $conn->lastInsertId();
                return [
                    true,
                    'id' => $id
                ]; // Retorna true em caso de sucesso
            }
        }
        return false; // Retorna false se os dados não forem válidos
    }

    public function patch($name, $price, $duration, $id)
    {
        # Atualiza um serviço existente
        if (!empty($name) && is_numeric($price) && is_numeric($duration) && is_numeric($id)) {
            $name = trim($name);

            $checkSql = "SELECT COUNT(*) FROM services WHERE id = :id";
            $checkStmt = $this->getConnection()->prepare($checkSql);
            $checkStmt->bindParam(':id', $id, PDO::PARAM_INT);
            $checkStmt->execute();

            if ($checkStmt->fetchColumn() == 0) {
                return false; // Retorna false se o serviço não existir
            }

            $sql = "UPDATE services SET name = :name, price = :price, duration = :duration WHERE id = :id";
            $stmt = $this->getConnection()->prepare($sql);
            $stmt->bindParam(':name', $name);
            $stmt->bindParam(':price', $price);
            $stmt->bindParam(':duration', $duration);
            $stmt->bindParam(':id', $id);

            if ($stmt->execute()) {
                return true; // Retorna true em caso de sucesso
            }
        }
        return false; // Retorna false se os dados não forem válidos
    }

    public function delete($id)
    {
        if (is_numeric($id)) {
            $appointmentEntries = $this->appoService->getByService($id); // Verifica se há agendamentos para este serviço

            if ($appointmentEntries && count($appointmentEntries) > 0) {
                # Inativa o serviço se houver agendamentos relacionados
                $sql = "UPDATE services SET active = 0 WHERE id = :id";
                $stmt = $this->getConnection()->prepare($sql);
                $stmt->bindParam(':id', $id);

                if ($stmt->execute()) {
                    return true;
                }
            } else {
                # Exclui o serviço se não houver agendamentos relacionados
                $sql = "DELETE FROM services WHERE id = :id";
                $stmt = $this->getConnection()->prepare($sql);
                $stmt->bindParam(':id', $id);

                if ($stmt->execute()) {
                    return true;
                }
            }
        }
        return false; // Retorna false se o ID não for numérico
    }
}
