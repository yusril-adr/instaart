<?php 
  require_once "../helpers/utils/import-helper.php";
  header('Content-Type: application/json');

  $request = json_decode(file_get_contents('php://input'), true);
  $requestMethod = $_SERVER["REQUEST_METHOD"];
  
  if (isset($_SERVER['HTTP_X_AUTH_ID'])) {
    $authId = $_SERVER['HTTP_X_AUTH_ID'];
  }
  if (isset($_SERVER['HTTP_X_AUTH_TOKEN'])) {
    $authToken = $_SERVER['HTTP_X_AUTH_TOKEN'];
  }

  if ($requestMethod !== 'PUT') {
    errorResponse('This request method is not supprted for this endpoint.', 405);
  }

  if (!isset($authId) || !checkToken($authToken, $authId)) {
    unauthorizedResponse();
  }

  try {
    $username = User::getUserFromId($authId)['username'];
    $user = new User($username);
    $user->changePassword($request['current_password'], $request['new_password']);
    
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