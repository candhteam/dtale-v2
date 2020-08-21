<?php




//Recepient Email Address
$to_email       = "mail@dtaledecor.com";
// $to_email       = "anvar@codeandhue.com";

//check if its an ajax request, exit if not
if (!isset($_SERVER['HTTP_X_REQUESTED_WITH']) and strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest') {
    $output = json_encode(array( //create JSON data
        'type' => 'error',
        'text' => 'Sorry Request must be Ajax POST'
    ));
    die($output); //exit script outputting json data
}

//Sanitize input data using PHP filter_var().
$first_name      = filter_var($_POST["fname"], FILTER_SANITIZE_STRING);
$email_address   = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
$phonenumber   = filter_var($_POST["phoneNumber"], FILTER_SANITIZE_STRING);
$date   = filter_var($_POST["date"], FILTER_SANITIZE_STRING);
$description   = filter_var($_POST["message"], FILTER_SANITIZE_STRING);

$subject         = "Dtale - Appointment request";



//Textbox Validation 
if (strlen($first_name) < 2) { // If length is less than 4 it will output JSON error.
    $output = json_encode(array('type' => 'message', 'text' => 'Name is too short or empty!'));
    die($output);
}



$message = '<html><body>';
$message .= '<table rules="all" style="border-color: #666;" cellpadding="10">';
$message .= "<tr style='background: #eee;'><td><strong>Name:</strong> </td><td>" . strip_tags($_POST['fname']) . "</td></tr>";
$message .= "<tr><td><strong>Email Address :</strong> </td><td>" . strip_tags($_POST['email']) . "</td></tr>";
$message .= "<tr><td><strong>Phone Number :</strong> </td><td>" . strip_tags($_POST['phoneNumber']) . "</td></tr>";
$message .= "<tr><td><strong>Date :</strong> </td><td>" . strip_tags($_POST['date']) . "</td></tr>";
$message .= "<tr><td><strong>Message :</strong> </td><td>" . strip_tags($_POST['message']) . "</td></tr>";
$message .= "</table>";
$message .= "</body></html>";








$eol = "\r\n";

$headers = "From: " . $first_name . " <" . $to_email  . ">" . $eol;
$headers .= "Reply-To: " . strip_tags($to_email) . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
$body .= $message . $eol;

//please uncomment for working form
$send_mail = mail($to_email, $subject, $body, $headers);

if (!$send_mail) {
    //If mail couldn't be sent output error. Check your PHP email configuration (if it ever happens)
    $output = json_encode(array('type' => 'error', 'text' => 'Could not send mail! Please check your details'));
    die($output);
} else {
    $output = json_encode(array('type' => 'message', 'text' => 'Hi ' . $first_name . ' Thanks for contacting us! We will be in touch with you shortly '));
    die($output);
}

// $output = json_encode(array('type' => 'message', 'text' => 'Hi ' . $first_name . ' Thanks for contacting us! We will be in touch with you shortly '));
// die($output);