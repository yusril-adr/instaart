<?php 
  require_once './utils/import-helper.php';

  $request = json_decode(file_get_contents('php://input'), true);
  $requestMethod = $_SERVER["REQUEST_METHOD"];

  switch ($requestMethod) {
    case 'GET':
      try {
        if(isset($_GET['id'])) {
          $post = new Post((int) $_GET['id']);

          $result = $post->getPost();
          echo json_encode($result);
          exit;
        }

        if(isset($_SESSION['id'])) {
          $post = Post::getPostsFromUser($_SESSION['id']);

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
        if(!isset($_SESSION['id'])) unauthorizedResponse();

        $result = Post::newPost($request, (int) $_SESSION['id']);

        if ($result) {
          $response['status'] = 'success';
          $response['message'] = 'Post added.';

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

    default:
      errorResponse('This request method is not supprted for this endpoint.', 405);
      break;
  }
?>