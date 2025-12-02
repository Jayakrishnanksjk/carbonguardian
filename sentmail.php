<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // reCAPTCHA secret key (from Google)
    $secretKey = "6Ldk_BcsAAAAAPGmxL7TTb2_yZNZS9MK9BPCz6qV"; // 🔄 secret key

    $captchaResponse = $_POST['g-recaptcha-response'];

    // Verify captcha with Google
    $verifyResponse = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=$secretKey&response=$captchaResponse");
    $responseData = json_decode($verifyResponse);

    if ($responseData->success) {
        // Captcha passed ✅
        $name = $_POST['name'];
        $email = $_POST['email'];
        $subject = !empty($_POST['subject']) ? $_POST['subject'] : "New Contact Form Submission";
        $message = $_POST['message'];

        $to = "info@carbonguardian.com"; // receiver email
        $mail_subject = "Contact Form: " . $subject;

        $body = "You received a new message from your website contact form:\n\n";
        $body .= "Name: $name\n";
        $body .= "Email: $email\n\n";
        $body .= "Message:\n$message\n";

        $headers = "From: contact-form@" . $_SERVER['SERVER_NAME'] . "\r\n";
        $headers .= "Reply-To: $email\r\n";

        if (mail($to, $mail_subject, $body, $headers)) {
            echo "✅ Message sent successfully!";
        } else {
            echo "❌ Message could not be sent.";
        }
    } else {
        echo "⚠️ Please verify that you are not a robot.";
    }
}
?>
