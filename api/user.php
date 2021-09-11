<?php   
  require_once "./utils/import-helper.php";

  $request = json_decode(file_get_contents('php://input'), true);
  $requestMethod = $_SERVER["REQUEST_METHOD"];
  if (isset($_SERVER['HTTP_X_AUTH_ID'])) {
    $authId = $_SERVER['HTTP_X_AUTH_ID'];
  }

  if (isset($_SERVER['HTTP_X_AUTH_TOKEN'])) {
    $authToken = $_SERVER['HTTP_X_AUTH_TOKEN'];
  }

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
      
        if(isset($authId) && checkToken($authToken, $authId)) {
          $username = User::getUserFromId($authId)['username'];
          $user = new User($username);

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

    case 'POST':
      try {
        if(isset($authId) && checkToken($authToken, $authId)) {
          errorResponse('You need to logout first');
        }
      
        if(isset($request['username'])) {
          $oldUserWithUsername = new User($request['username']);
          $oldUserWithEmail = new User($request['email']);
      
          if($oldUserWithUsername->getUser()) {
            errorResponse('Username already exist.', 428);
          }
    
          if($oldUserWithEmail->getUser()) {
            errorResponse('Email already exist.', 428);
          }
      
          $user = User::registerUser($request);
          if ($user) {
            $loginResult = login($request['username'], $request['password']);

            $response['user'] = $loginResult['user'];
            $response['token'] = $loginResult['token'];

            echo json_encode($response);
            exit;
          }
        }
      } catch (Exception $error) {
        if($error->getCode() !== 0) {
          errorResponse($error->getMessage(), $error->getCode());
        }
        errorResponse($error->getMessage());
      }
      break;

    case 'PUT':
      try {
        if(isset($authId) && checkToken($authToken, $authId)) {
          $oldUserWithUsername = new User($request['username']);
          $oldUserWithEmail = new User($request['email']);

          $currentUsername = User::getUserFromId($authId)['username'];
          $currentEmail = User::getUserFromId($authId)['email'];
    
          if($oldUserWithUsername->getUser() && $request['username'] !== $currentUsername) {
            errorResponse('Username already exist.', 428);
          }

          if($oldUserWithEmail->getUser() && $request['email'] !== $currentEmail) {
            errorResponse('Email already exist.', 428);
          }

          $user = new User($currentUsername);
          $result = $user->updateUser($request);

          if ($result) {
            echo json_encode($result);
            exit;
          }
  
          errorResponse('Update failed with unknown error.');
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