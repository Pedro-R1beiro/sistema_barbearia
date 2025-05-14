<?php

require_once __DIR__ . '/appointment.php';

class Professional
{
    private $conn;
    private $appo;

    public function __construct($conn)
    {
        $this->conn = $conn;
        $this->appo = new Appointment($conn); // Instancia a classe de agendamento
    }

    public function getById($id)
    {
        if (is_numeric($id)) {
            $sql = "SELECT * FROM professionals WHERE id = :id AND active = 1";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':id', $id);
            if ($stmt->execute()) {
                return $stmt->fetch(PDO::FETCH_ASSOC); // Retorna o profissional encontrado ou false
            }
        }
        return false; // Retorna false se o ID não for numérico ou ocorrer um erro
    }

    public function getByEmail($email)
    {
        if (!empty($email)) {
            $email = trim($email);
            $sql = "SELECT * FROM professionals WHERE email = :email AND active = 1";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':email', $email);
            if ($stmt->execute()) {
                return $stmt->fetch(PDO::FETCH_ASSOC); // Retorna o profissional encontrado ou false
            }
        }
        return false; // Retorna false se o email estiver vazio ou ocorrer um erro
    }

    public function get()
    {
        $sql = "SELECT * FROM professionals WHERE active = 1";
        $stmt = $this->conn->query($sql);

        return $stmt->fetchAll(PDO::FETCH_ASSOC); // Retorna todos os profissionais ativos
    }

    public function post($name, $email, $password, $phone)
    {
        if (!empty($name) && !empty($email) && !empty($password) && !empty($phone)) {
            $name = trim($name);
            $email = trim($email);
            $password = trim($password);
            $phone = trim($phone);

            $hashPassword = password_hash($password, PASSWORD_DEFAULT); // Criptografa a senha
            $code = md5(uniqid(rand(), true)); // Gera um código único

            $sql = "INSERT INTO professionals (name, email, password, phone, code) VALUES (:name, :email, :hashPassword, :phone, :code)";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':name', $name);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':hashPassword', $hashPassword);
            $stmt->bindParam(':phone', $phone);
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

            $sql = "UPDATE professionals SET " . implode(', ', $fields) . " WHERE id = :id";
            $stmt = $this->conn->prepare($sql);

            // Vincula os parâmetros dinamicamente
            foreach ($params as $key => $value) {
                $stmt->bindValue($key, $value);
            }

            if ($stmt->execute()) {
                return true; // Retorna true em caso de sucesso
            }
        }
        return false; // Retorna false se o ID não for numérico
    }

    public function delete($id)
    {
        if (is_numeric($id)) {
            $appoPrev = $this->appo->get('prev', null, $id); // Busca agendamentos anteriores
            $appoToday = $this->appo->get('today', null, $id); // Busca agendamentos para hoje
            $appoNext = $this->appo->get('next', null, $id);   // Busca agendamentos futuros

            // Exclui agendamentos para hoje
            if ($appoToday && count($appoToday) > 0) {
                foreach ($appoToday as $val) {
                    $this->appo->delete($val['id']);
                }
            }

            // Exclui agendamentos futuros
            if ($appoNext && count($appoNext) > 0) {
                foreach ($appoNext as $val) {
                    $this->appo->delete($val['id']);
                }
            }

            // Se houver agendamentos anteriores, inativa o profissional, senão, exclui completamente
            if ($appoPrev && count($appoPrev) > 0) {
                $sql = "UPDATE professionals SET name = 'ghost', email = null, password = null, phone = null, code = null, active = 0 WHERE id = :id";
                $stmt = $this->conn->prepare($sql);
                $stmt->bindParam(':id', $id);
            } else {
                $sql = "DELETE FROM professionals WHERE id = :id";
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
