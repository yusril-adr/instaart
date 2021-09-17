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
    case 'POST':
      if(!isset($authId) || !checkToken($authToken, $authId)) unauthorizedResponse();

      try {
        $username = User::getUserFromId($authId)['username'];
        $user = new User($username);

        $result = $user->commentPost($request['body'], (int) $request['post_id']);

        $post = new Post((int) $request['post_id']);

        $response['status'] = 'success';
        $response['comments'] = $post->getComments();
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
      if(!isset($authId) || !checkToken($authToken, $authId)) unauthorizedResponse();

      try {
        $username = User::getUserFromId($authId)['username'];
        $user = new User($username);

        $result = $user->deleteComment((int) $request['comment_id']);

        $response['status'] = 'success';
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