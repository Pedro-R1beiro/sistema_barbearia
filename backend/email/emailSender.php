<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'lib/vendor/autoload.php';

class EmailSender {
    private $mail;
    
    public function __construct() {
        $this->mail = new PHPMailer(true);
        require 'lib/vendor/autoload.php';

        $this->mail->SMTPDebug = SMTP::DEBUG_SERVER;
        $this->mail->CharSet = "UTF-8";
        $this->mail->isSMTP();
        $this->mail->Host = 'sandbox.smtp.mailtrap.io';
        $this->mail->SMTPAuth = true;
        $this->mail->Username = '06259d999d81f3';
        $this->mail->Password = '6cd99d63e29fc1';
        $this->mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $this->mail->Port = 2525;
    }

    public function sendEmail($addressEmail, $addressName, $subject, $HTMLbody, $textBody) {
        try {
            $this->mail->setFrom('atendimento@barbershop.araplay.com.br', 'Atendimento Barbearia');
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