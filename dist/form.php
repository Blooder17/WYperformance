<?php
    // Get the POST data
    $content = file_get_contents("php://input");

    // Decode the JSON data
    $data = json_decode($content, true);

    // Declare response array
    $response = [];

    // Check if data is received and properly decoded
    if ($data !== null) {
        // Extract name and email
        $name = isset($data['name']) ? $data['name'] : '';
        $email = isset($data['email']) ? $data['email'] : '';
        
        // Get data in array
        $response = [
            'name' => $data['name'],
            'email' => $data['email']
        ];

        // Output the response encoded
        echo json_encode($response);
    }
?>