<?php 
  require_once './utils/import-helper.php';

  $request = json_decode(file_get_contents('php://input'), true);
  $requestMethod = $_SERVER["REQUEST_METHOD"];

  if($_SERVER["REQUEST_METHOD"] !== 'GET') {
    errorResponse('This request method is not supprted for this endpoint.', 405);
  }

  try {
    $posts = Post::getPopularPosts();

    $response['status'] = 'success';
    $response['posts'] = $posts;

    echo json_encode($response);
    exit;
  } catch (Exception $error) {
    if($error->getCode() !== 0) {
      errorResponse($error->getMessage(), $error->getCode());
    }
    errorResponse($error->getMessage());
  }
?>