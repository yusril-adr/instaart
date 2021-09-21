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
  

  try {
    if(isset($_GET['username'])) {
      $user = new User($_GET['username']);
  
      $result = $user->getFollowersUser();
      echo json_encode($result);
      exit;
    }

    if(isset($_GET['email'])) {
      $user = new User($_GET['email']);
  
      $result = $user->getFollowersUser();
      echo json_encode($result);
      exit;
    }

    $username = User::getUserFromId($authId)['username'];
    $user = new User($username);
    
    $followers = $user->getFollowersUser();

    echo json_encode($followers);
    exit;
  } catch (Exception $error) {
    if($error->getCode() !== 0) {
      errorResponse($error->getMessage(), $error->getCode());
    }
    errorResponse($error->getMessage());
  }
?>