<?php 
  require_once "./utils/import-helper.php";

  $request = json_decode(file_get_contents('php://input'), true);
  $requestMethod = $_SERVER["REQUEST_METHOD"];

  if ($requestMethod === 'POST') {
    $loginstatus = login($request['identifier'], $request['password']);

    if($loginstatus) {
      $response['status'] = 'success';
      $response['message'] = 'Login successfully.';
  
      echo json_encode($response);
      exit;
    }

    errorResponse('User not found or your password is incorrect', 401);
  }

  errorResponse('This request method is not supprted for this endpoint.', 405);
?>