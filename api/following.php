<?php 
  require_once './utils/import-helper.php';

  $request = json_decode(file_get_contents('php://input'), true);
  $requestMethod = $_SERVER["REQUEST_METHOD"];

  switch ($requestMethod) {
    case 'GET':
      if(isset($_GET['username'])) {
        $user = new User($_GET['username']);
        
        if($user->getUser()) {
          $result = $user->getFollowingUser();

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
          $result = $user->getFollowingUser();

          if($result) {
            echo json_encode($result);
            exit;
          }
        } else {
          errorResponse('User didn\'t exist.', 404);
        }
      }

      if (!isset($_SESSION['username'])) {
        unauthorizedResponse();
      }

      try {
        $user = new User($_SESSION['username']);
        
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
      if (!isset($_SESSION['username'])) {
        unauthorizedResponse();
      }

      try {
        $user = new User($_SESSION['username']);
        
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
      if (!isset($_SESSION['username'])) {
        unauthorizedResponse();
      }

      try {
        $user = new User($_SESSION['username']);
        
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