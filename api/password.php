<?php 
  require_once "./utils/import-helper.php";

  $request = json_decode(file_get_contents('php://input'), true);
  $requestMethod = $_SERVER["REQUEST_METHOD"];

  if ($requestMethod !== 'PUT') {
    errorResponse('This request method is not supprted for this endpoint.', 405);
  }

  if (!isset($_SESSION['username'])) {
    unauthorizedResponse();
  }

  try {
    $user = new User($_SESSION['username']);
    $user->changePassword($request['old_password'], $request['new_password']);
    
    $response['status'] = 'success';
    $response['message'] = 'Password successfully changed.';

    echo json_encode($response);
  } catch(Exception $error) {
    if($error->getCode() !== 0) {
      errorResponse($error->getMessage(), $error->getCode());
    }
    errorResponse($error->getMessage());
  }
?>