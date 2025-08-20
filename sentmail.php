<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = !empty($_POST['subject']) ? $_POST['subject'] : "New Contact Form Submission";
    $message = $_POST['message'];

    // Receiver email
    $to = "test@example.com";

    // Subject line
    $mail_subject = "Contact Form: " . $subject;

    // Body of the mail
    $body = "You received a new message from your website contact form:\n\n";
    $body .= "Name: $name\n";
    $body .= "Email: $email\n\n";
    $body .= "Message:\n$message\n";

    // Headers
    $headers = "From: contact-form@" . $_SERVER['SERVER_NAME'] . "\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Send mail
    if (mail($to, $mail_subject, $body, $headers)) {
        echo "✅ Message sent successfully!'";
    } else {
        echo "❌ Message could not be sent.'";
    }
}
?>
