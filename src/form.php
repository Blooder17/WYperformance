<?php
    // Get the POST data
    $content = file_get_contents("php://input");

    // Decode the JSON data
    $data = json_decode($content, true);
    
    // Output the response encoded
    echo json_encode($data);
?>