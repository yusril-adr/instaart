<?php 
  function errorResponse(string $message, int $errorCode = 400) {
    http_response_code($errorCode);
    $response['status'] = 'error';
    $response['message'] = $message;

    echo json_encode($response);
    exit;
  }

  function unauthorizedResponse() {
    errorResponse('Login required.', 401);
  }
?>