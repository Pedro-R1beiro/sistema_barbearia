<?php

require '../bd.php';
require 'scheduling.php';

class Client
{
    public $conn;
    public $sche;

    public function __construct()
    {
        $db = new Database;
        $this->conn = $db->connect();

        $this->sche = new Scheduling; // Instancia a classe de agendamento
    }

    public function getData()
    {
        $hoje = date('Y-m-d');
        # Seleciona dados dos clientes ativos e informações de agendamentos
        $sql = "SELECT
            c.name,

            -- Último agendamento ANTES da data atual
            (
                SELECT MAX(date)
                FROM scheduling s2
                WHERE s2.idClient = c.id AND s2.date < '$hoje'
            ) AS prev_scheduling,

            -- Próximo agendamento DEPOIS da data atual
            (
                SELECT MIN(date)
                FROM scheduling s3
                WHERE s3.idClient = c.id AND s3.date > '$hoje'
            ) AS next_scheduling,

            -- Total de agendamentos do cliente
            (
                SELECT COUNT(*)
                FROM scheduling s4
                WHERE s4.idClient = c.id
            ) AS total_scheduling

        FROM
            clients c
        WHERE
            c.active = '1'; # Filtra apenas clientes ativos
        ";
        $stmt = $this->conn->query($sql);

        return $stmt->fetchAll(PDO::FETCH_ASSOC); // Retorna os resultados como um array associativo
    }

    public function getById($id)
    {
        if (is_numeric($id)) {
            $sql = "SELECT * FROM clients WHERE id = :id AND active = 1";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':id', $id);

            if ($stmt->execute()) {
                return $stmt->fetch(PDO::FETCH_ASSOC); // Retorna o cliente encontrado ou false
            }
        }
        return false; // Retorna false se o ID não for numérico ou ocorrer um erro
    }

    public function getByEmail($email)
    {
        if (!empty($email)) {
            $email = trim($email);
            $sql = "SELECT * FROM clients WHERE email = :email AND active = 1";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':email', $email);

            if ($stmt->execute()) {
                return $stmt->fetch(PDO::FETCH_ASSOC); // Retorna o cliente encontrado ou false
            }
        }
        return false; // Retorna false se o email estiver vazio ou ocorrer um erro
    }

    public function post($name, $email, $password, $phone)
    {
        if (!empty($name) && !empty($email) && !empty($password) && !empty($phone)) {
            $name = trim($name);
            $email = trim($email);
            $password = trim($password);
            $phone = trim($phone);

            $sql = "INSERT INTO clients (name, email, password, phone, code) VALUES (:name, :email, :hashPassword, :phone, :code)";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':name', $name);
            $stmt->bindParam(':email', $email);
            $hashPassword = password_hash($password, PASSWORD_DEFAULT); // Criptografa a senha
            $stmt->bindParam(':hashPassword', $hashPassword);
            $stmt->bindParam(':phone', $phone);
            $code = md5(uniqid(rand(), true)); // Gera um código único
            $stmt->bindParam(':code', $code);

            if ($stmt->execute()) {
                return true; // Retorna true em caso de sucesso
            }
        }
        return false; // Retorna false se algum campo estiver vazio ou ocorrer um erro
    }

    public function update($id, $name = null, $email = null, $password = null, $phone = null)
    {
        if (is_numeric($id)) {
            $fields = [];
            $params = [':id' => $id];

            if (!empty($name)) {
                $fields[] = "name = :name";
                $params[':name'] = trim($name);
            }

            if (!empty($email)) {
                $fields[] = "email = :email";
                $params[':email'] = trim($email);
            }

            if (!empty($password)) {
                $fields[] = "password = :password";
                $params[':password'] = password_hash(trim($password), PASSWORD_DEFAULT); // Criptografa a nova senha
            }

            if (!empty($phone)) {
                $fields[] = "phone = :phone";
                $params[':phone'] = trim($phone);
            }

            // Verifica se algum campo foi fornecido para atualizar
            if (empty($fields)) {
                return false;
            }

            $sql = "UPDATE clients SET " . implode(', ', $fields) . " WHERE id = :id";
            $stmt = $this->conn->prepare($sql);

            // Vincula os parâmetros dinamicamente
            foreach ($params as $key => $value) {
                $stmt->bindValue($key, $value);
            }

            return $stmt->execute(); // Retorna true em caso de sucesso
        }
        return false; // Retorna false se o ID não for numérico
    }

    public function delete($id)
    {
        if (is_numeric($id)) {
            $schePrev = $this->sche->get('prev', null, $id); // Busca agendamentos anteriores
            $scheToday = $this->sche->get('today', null, $id); // Busca agendamentos para hoje
            $scheNext = $this->sche->get('next', null, $id);   // Busca agendamentos futuros

            // Exclui agendamentos para hoje
            if ($scheToday && count($scheToday) > 0) {
                foreach ($scheToday as $val) {
                    $this->sche->delete($val['id']);
                }
            }

            // Exclui agendamentos futuros
            if ($scheNext && count($scheNext) > 0) {
                foreach ($scheNext as $val) {
                    $this->sche->delete($val['id']);
                }
            }

            // Se houver agendamentos anteriores, inativa o cliente, senão, exclui completamente
            if ($schePrev && count($schePrev) > 0) {
                $sql = "UPDATE clients SET name = 'ghost', email = null, password = null, phone = null, code = null, active = 0 WHERE id = :id";
                $stmt = $this->conn->prepare($sql);
                $stmt->bindParam(':id', $id);
            } else {
                $sql = "DELETE FROM clients WHERE id = :id";
                $stmt = $this->conn->prepare($sql);
                $stmt->bindParam(':id', $id);
            }

            if ($stmt->execute()) {
                return true; // Retorna true em caso de sucesso
            }
        }
        return false; // Retorna false se o ID não for numérico ou ocorrer um erro
    }
}