<?php
/**
 * Database Connection Class
 */
class Database {
    private $host = 'localhost';
    private $username = 'root';
    private $password = '';
    private $database = 'bb'; // Make sure this database exists in your XAMPP
    private $conn;

    /**
     * Constructor - connects to database
     */
    public function __construct() {
        try {
            $this->conn = new mysqli($this->host, $this->username, $this->password, $this->database);
            
            if ($this->conn->connect_error) {
                throw new Exception("Connection failed: " . $this->conn->connect_error);
            }
            
            // Set charset
            $this->conn->set_charset("utf8mb4");
        } catch (Exception $e) {
            error_log("Database connection error: " . $e->getMessage());
            throw new Exception("Database connection failed");
        }
    }

    /**
     * Get the database connection
     * 
     * @return mysqli The database connection
     */
    public function getConnection() {
        return $this->conn;
    }

    /**
     * Close the database connection
     */
    public function closeConnection() {
        if ($this->conn) {
            $this->conn->close();
        }
    }
}
?> 