<?php

// let's get all form values
$name = htmlspecialchars($_POST['name']);
$email = htmlspecialchars($_POST['email']);
$phone = htmlspecialchars($_POST['phone']);
$website = htmlspecialchars($_POST['website']);
$message = htmlspecialchars($_POST['message']);

// if email and message field is not empty
if (!empty($email) && !empty($message)) {
  if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
    // email receiver email address
    $receiver = "bzmkun@gmail.com";
    // subject of the email. Subject looks like From: BrunoZielinski <abc@gmail.com>
    $subject = "From: $name <$email>";
    // merging concating all user values inside body variables. \n is used fpr new line
    $body = "Name: $name\nEmail: $email\nPhone: $phone\nWebsite: $website\n\nMessage: $message";
    // sender email
    $sender = "From: $email";
    // main() is a inbuilt php function to send email
    if (mail($receiver, $subject, $body, $sender)) {
      echo "Your message has been sent!";
    } else {
      echo "Sorry, failed to send your message!";
    }
  } else {
    echo 'Enter a valid email address!';
  }
} else {
  echo "Email and message field is required!";
}
