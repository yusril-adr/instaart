<?php 
  require_once "./utils/import-helper.php";

  $request = json_decode(file_get_contents('php://input'), true);
  $requestMethod = $_SERVER["REQUEST_METHOD"];

  if ($requestMethod !== 'POST') {    
    errorResponse('This request method is not supported for this endpoint.', 405);
  }

  try {
    $loginstatus = login($request['identifier'], $request['password']);

    if($loginstatus) {
      $response['status'] = 'success';
      $response['message'] = 'Login successfully.';

      echo json_encode($response);
      exit;
    }
  } catch (Exception $error) {
    if($error->getCode() !== 0) {
      errorResponse($error->getMessage(), $error->getCode());
    }
    errorResponse($error->getMessage());
  }

  errorResponse('User not found or your password is incorrect', 401);
?>