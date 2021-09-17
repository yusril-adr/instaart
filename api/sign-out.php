<?php 
  require_once "../helpers/utils/import-helper.php";
  header('Content-Type: application/json');

  if (isset($_SERVER['HTTP_X_AUTH_ID'])) {
    $authId = $_SERVER['HTTP_X_AUTH_ID'];
  }

  if (isset($_SERVER['HTTP_X_AUTH_TOKEN'])) {
    $authToken = $_SERVER['HTTP_X_AUTH_TOKEN'];
  }

  if(!isset($authId) || !checkToken($authToken, $authId)) {
    unauthorizedResponse();
  }

  Token::deleteToken($authToken);

  $response['status'] = 'success';
  $response['message'] = 'Logout succesfully.';

  echo json_encode($response);
?>