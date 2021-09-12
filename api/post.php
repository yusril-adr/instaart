<?php 
  require_once './utils/import-helper.php';

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
        if(isset($_GET['id'])) {
          $post = new Post((int) $_GET['id']);

          if(isset($_GET['insight']) && $_GET['insight'] !== '') {
            $post->increaseInsight();
          }

          $result = $post->getPost();

          echo json_encode($result);
          exit;
        }

        if(isset($authId) && checkToken($authToken, $authId)) {
          $post = Post::getPostsFromUser($authId);

          echo json_encode($post);
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
        if(!isset($authId) || !checkToken($authToken, $authId)) unauthorizedResponse();

        $result = Post::newPost($request, (int) $authId);

        if ($result) {
          $response['status'] = 'success';
          $response['message'] = 'Post added.';
          $response['id'] = Post::getPostsFromUser((int) $authId)[0]['id'];

          echo json_encode($response);
          exit;
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
        if(!isset($authId) || !checkToken($authToken, $authId)) unauthorizedResponse();

        $post = new Post((int) $request['post_id']);

        $result = $post->updatePost($request);

        echo json_encode($post->getPost());
        exit;
      } catch (Exception $error) {
        if($error->getCode() !== 0) {
          errorResponse($error->getMessage(), $error->getCode());
        }
        errorResponse($error->getMessage());
      }
      break;

    case 'DELETE':
      try {
        if(!isset($authId) || !checkToken($authToken, $authId)) unauthorizedResponse();

        $post = new Post((int) $request['post_id']);

        $result = $post->deletePost();

        $response['status'] = 'success'; 
        $response['message'] = 'Post successfully Deleted'; 

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