<?php

namespace App\Services;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require_once __DIR__ . '/../../vendor/autoload.php';

class EmailSender {
    private $mail;
    
    public function __construct() {
        $this->mail = new PHPMailer(true);
        require_once __DIR__ . '/../../vendor/autoload.php';

        $this->mail->SMTPDebug = false;
        $this->mail->CharSet = "UTF-8";
        $this->mail->isSMTP();
        $this->mail->Host = $_ENV['MAIL_HOST'];
        $this->mail->SMTPAuth = true;
        $this->mail->Username = $_ENV['MAIL_USERNAME'];
        $this->mail->Password = $_ENV['MAIL_PASSWORD'];
        $this->mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $this->mail->Port = $_ENV['MAIL_PORT'];
    }

    public function sendEmail($addressEmail, $addressName, $subject, $HTMLbody, $textBody) {
        try {
            $this->mail->setFrom($_ENV['MAIL_FROM_ADDRESS'], $_ENV['MAIL_FROM_NAME']);
            $this->mail->addAddress($addressEmail, $addressName);

            $this->mail->isHTML(true);
            $this->mail->Subject = $subject;
            $this->mail->Body = $HTMLbody;
            $this->mail->AltBody = $textBody;

            $this->mail->send();

            return true;
        } catch (Exception $e) {
            return false;
        }
    }
}