<?php 
  require_once './utils/import-helper.php';

  $request = json_decode(file_get_contents('php://input'), true);
  $requestMethod = $_SERVER["REQUEST_METHOD"];

  if(isset($_GET['username'])) {
    $user = new User($_GET['username']);
        
    if($user->getUser()) {
      $result = $user->getFollowersUser();

      if($result) {
        echo json_encode($result);
        exit;
      }
    } else {
      errorResponse('User didn\'t exist.', 404);
    }
  }

  if(isset($_GET['email'])) {
    $user = new User($_GET['email']);
        
    if($user->getUser()) {
      $result = $user->getFollowersUser();

      if($result) {
        echo json_encode($result);
        exit;
      }
    } else {
      errorResponse('User didn\'t exist.', 404);
    }
  }

  try {
    $user = new User($_SESSION['username']);
    
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