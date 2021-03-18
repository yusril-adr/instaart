<?php 
  require_once './utils/import-helper.php';

  if($_SERVER["REQUEST_METHOD"] !== 'GET') {
    errorResponse('This request method is not supprted for this endpoint.', 405);
  }

  if(!isset($_GET['keyword'])) errorResponse('Keyword Needed', 428);

  try {
    $users = User::searchUser($_GET['keyword']);
    $posts = Post::searchPost($_GET['keyword']);

    $response['user'] = [];
    $response['post'] = [];

    foreach ($users as $user) {
      $data = (new User($user['username']))->getUser();
      $response['user'][] = $data;
    }

    foreach ($posts as $post) {
      $data = (new Post((int) $post['id']))->getPost();
      $response['post'][] = $data;
    }

    echo json_encode($response);
    exit;
  } catch (Exception $error) {
    if($error->getCode() !== 0) {
      errorResponse($error->getMessage(), $error->getCode());
    }
    errorResponse($error->getMessage());
  }
?>