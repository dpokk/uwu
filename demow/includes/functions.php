<?php
/**
 * Utility functions for the application
 */

/**
 * Sanitize output to prevent XSS
 * 
 * @param string $data The data to sanitize
 * @return string The sanitized data
 */
function sanitizeOutput($data) {
    return htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
}

/**
 * Check if user is logged in, redirect if not
 */
function requireLogin() {
    if (!isset($_SESSION['user_id'])) {
        header("Location: login.html");
        exit();
    }
}

/**
 * Generate a random token
 * 
 * @param int $length Length of the token
 * @return string The generated token
 */
function generateToken($length = 32) {
    return bin2hex(random_bytes($length / 2));
}

/**
 * Log activity
 * 
 * @param string $action The action performed
 * @param int $user_id The user ID
 * @param string $details Additional details
 */
function logActivity($action, $user_id, $details = '') {
    try {
        $db = new Database();
        $conn = $db->getConnection();
        
        $stmt = $conn->prepare("INSERT INTO activity_logs (user_id, action, details, created_at) VALUES (?, ?, ?, NOW())");
        $stmt->bind_param("iss", $user_id, $action, $details);
        $stmt->execute();
    } catch (Exception $e) {
        // Just log to error log, don't stop execution
        error_log("Failed to log activity: " . $e->getMessage());
    }
}
?> 