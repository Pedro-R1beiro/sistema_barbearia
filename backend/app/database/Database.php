<?php

namespace App\Database;

use PDO;
use PDOException;

class Database 
{
    private $host;
    private $dbname;
    private $username;
    private $password;
    public $conn;

    public function __construct()
    {
        $this->host = $_ENV['DB_HOST'];
        $this->dbname = $_ENV['DB_NAME'];
        $this->username = $_ENV['DB_USERNAME'];
        $this->password = $_ENV['DB_PASSWORD'];
    }

    public function connect() 
    {
        $this->conn = null;
        try {
            $this->conn = new PDO(
                "mysql:host={$this->host};dbname={$this->dbname};charset=utf8",
                $this->username,
                $this->password
            );
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $e) {
            die("Erro na conexão: " . $e->getMessage());
        }

        return $this->conn;
    }
}