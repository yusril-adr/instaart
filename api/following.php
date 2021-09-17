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

  switch ($requestMethod) {
    case 'GET':

      if(isset($_GET['username'])) {
        $user = new User($_GET['username']);
      } else if(isset($_GET['email'])) {
        $user = new User($_GET['email']);
      }

      if(isset($user) && $user->getUser()) {
        $result = $user->getFollowingUser();
        
        echo json_encode($result);
        exit;
      } else if (!$user->getUser()) {
        errorResponse('User didn\'t exist.', 404);
      }

      try {
        $username = User::getUserFromId($authId)['username'];
        $user = new User($username);
        
        $following = $user->getFollowingUser();

        echo json_encode($following);
        exit;
      } catch (Exception $error) {
        if($error->getCode() !== 0) {
          errorResponse($error->getMessage(), $error->getCode());
        }
        errorResponse($error->getMessage());
      }
      break;
    
    case 'POST':
      if (!isset($authId) || !checkToken($authToken, $authId)) {
        unauthorizedResponse();
      }

      try {
        $username = User::getUserFromId($authId)['username'];
        $user = new User($username);
        
        $user->followUser($request['user_id']);

        $response['status'] = 'success'; 
        $response['message'] = 'successfully followed.';
        $response['followers'] = $user->getFollowers();
        echo json_encode($response);
        exit;
      } catch (Exception $error) {
        if($error->getCode() !== 0) {
          errorResponse($error->getMessage(), $error->getCode());
        }
        errorResponse($error->getMessage());
      }
      break;

    case 'DELETE':
      if (!isset($authId) || !checkToken($authToken, $authId)) {
        unauthorizedResponse();
      }

      try {
        $username = User::getUserFromId($authId)['username'];
        $user = new User($username);
        
        $user->unFollowUser($request['user_id']);

        $response['status'] = 'success'; 
        $response['message'] = 'successfully unfollowed.'; 
        $response['followers'] = $user->getFollowers();
        echo json_encode($response);
        exit;
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