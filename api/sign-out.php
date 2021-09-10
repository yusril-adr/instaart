<?php 
  require_once './utils/import-helper.php';
  if (isset($_SERVER['HTTP_X_AUTH_ID'])) {
    $authId = $_SERVER['HTTP_X_AUTH_ID'];
  }

  if (isset($_SERVER['HTTP_X_AUTH_TOKEN'])) {
    $authToken = $_SERVER['HTTP_X_AUTH_TOKEN'];
  }

  if(!isset($authId) || !checkToken($authToken, $authId)) {
    unauthorizedResponse();
  }

  $response['status'] = 'success';
  $response['message'] = 'Logout succesfully.';

  echo json_encode($response);
?>