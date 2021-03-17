<?php   
  require_once "./utils/import-helper.php";

  $request = json_decode(file_get_contents('php://input'), true);
  $requestMethod = $_SERVER["REQUEST_METHOD"];

  switch ($requestMethod) {
    case 'GET':
      try {
        if(isset($_GET['username'])) {
          $user = new User($_GET['username']);
          $result = $user->getUser();

          if($result) {
            $result['posts'] = Post::getPostsFromUser($result['id']);
            echo json_encode($result);
            exit;
          } else {
            errorResponse('User didn\'t exist.', 404);
          }
        }
      
        if(isset($_GET['email'])) {
          $user = new User($_GET['email']);
          $result = $user->getUser();
      
          if($result) {
            echo json_encode($result);
          } else {
            errorResponse('User didn\'t exist.', 404);
          }
  
          exit;
        }
      
        if(isset($_SESSION['username'])) {
          $user = new User($_SESSION['username']);
      
          echo json_encode($user->getUser());
          exit;
        }
      
        unauthorizedResponse();
      } catch (Exception $error) {
        if($error->getCode() !== 0) {
          errorResponse($error->getMessage(), $error->getCode());
        }
        errorResponse($error->getMessage());
      }
      break;

    case 'PUT':
      try {
        if(isset($_SESSION['username'])) {
          $oldUserWithUsername = new User($request['username']);
          $oldUserWithEmail = new User($request['email']);
    
          if($oldUserWithUsername->getUser() && $request['username'] !== $_SESSION['username']) {
            errorResponse('Username already exist.', 428);
          }

          if($oldUserWithEmail->getUser() && $request['email'] !== $_SESSION['email']) {
            errorResponse('Email already exist.', 428);
          }

          $user = new User($_SESSION['username']);
          $result = $user->updateUser($request);

          if ($result) {
            $_SESSION['username'] = $request['username'];
            $_SESSION['email'] = $request['email'];
            echo json_encode($result);
            exit;
          }
  
          errorResponse('Register failed with unknown error.');
          exit;
        }

        unauthorizedResponse();
      } catch (Exception $error) {
        if($error->getCode() !== 0) {
          errorResponse($error->getMessage(), $error->getCode());
        }
        errorResponse($error->getMessage());
      }
      break;
    
    default:
      errorResponse('This request method is not supprted for this endpoint.', 405);
      break;
  }
?>