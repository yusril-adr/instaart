<?php 
  require_once "./utils/import-helper.php";

  $request = json_decode(file_get_contents('php://input'), true);
  $requestMethod = $_SERVER["REQUEST_METHOD"];

  switch ($requestMethod) {
    case 'POST':
      if(!isset($_SESSION['username'])) unauthorizedResponse();

      try {
        $user = new User($_SESSION['username']);

        $result = $user->likePost((int) $request['id']);

        $post = new Post((int) $request['id']);

        $response['status'] = 'success';
        $response['likes'] = $post->getLikes();
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
        if(!isset($_SESSION['username'])) unauthorizedResponse();
  
        try {
          $user = new User($_SESSION['username']);
  
          $result = $user->unlikePost((int) $request['id']);
  
          $post = new Post((int) $request['id']);
  
          $response['status'] = 'success';
          $response['likes'] = $post->getLikes();
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
      errorResponse('This request method is not supported for this endpoint.', 405);
      break;
  }
?>