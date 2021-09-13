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
      if(!isset($authId) || !checkToken($authToken, $authId)) unauthorizedResponse();

      try {
        $response = [];
        $posts = Post::getBookmarkedPosts($authId);

        foreach ($posts as $post) {
          $data = new Post($post['id']);
          $post['likes'] = $data->getLikes();
          $post['comments'] = $data->getComments();
          $response[] = $post;
        }

        echo json_encode($response);
        exit;
      } catch (Exception $error) {
        if($error->getCode() !== 0) {
          errorResponse($error->getMessage(), $error->getCode());
        }
        errorResponse($error->getMessage());
      }

      break;
    case 'POST':
      if(!isset($authId) || !checkToken($authToken, $authId)) unauthorizedResponse();

      try {
        $username = User::getUserFromId($authId)['username'];
        $user = new User($username);

        $result = $user->bookmarkPost((int) $request['post_id']);

        $post = new Post((int) $request['post_id']);

        $response['status'] = 'success';
        $response['message'] = 'successfully bookmarked';
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

        $result = $user->unbookmarkPost((int) $request['post_id']);

        $post = new Post((int) $request['post_id']);

        $response['status'] = 'success';
        $response['message'] = 'successfully unbookmarked';
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