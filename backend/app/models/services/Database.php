<?php

namespace App\Models\Services;

use PDO;
use PDOException;

abstract class Database
{
    protected string $host;
    protected string $dbname;
    protected string $username;
    protected string $password;
    protected object $conn;

    public function __construct()
    {
        $this->host = $_ENV['MYSQL_HOST'];
        $this->dbname = $_ENV['MYSQL_DATABASE'];
        $this->username = $_ENV['MYSQL_USERNAME'];
        $this->password = $_ENV['MYSQL_PASSWORD'];
    }

    public function getConnection()
    {
        try {
            $this->conn = new PDO(
                "mysql:host={$this->host};dbname=" . $this->dbname,
                $this->username,
                $this->password
            );
            return $this->conn;
        } catch (PDOException) {
            die("Erro na conexão, tente novamente mais tarde ou entre em contato com o administrador.");
        }

        return $this->conn;
    }
}
