<?php 
  require_once "../helpers/utils/import-helper.php";
  header('Content-Type: application/json');

  if($_SERVER["REQUEST_METHOD"] !== 'GET') {
    errorResponse('This request method is not supprted for this endpoint.', 405);
  }

  if(!isset($_GET['keyword'])) errorResponse('Keyword Needed', 428);

  if(!isset($_GET['category'])) $_GET['category'] = '';
  if(!isset($_GET['color'])) $_GET['color'] = '';

  if(!isset($_GET['province'])) $_GET['province'] = '';
  if(!isset($_GET['city'])) $_GET['city'] = '';

  try {
    $users = User::searchUser($_GET['keyword'], $_GET['province'], $_GET['city']);
    $posts = Post::searchPost($_GET['keyword'], $_GET['category'], $_GET['color']);

    $response['user'] = [];
    foreach ($users as $user) {
      $data = (new User($user['username']))->getUser();
      $response['user'][] = $data;
    }

    $response['post'] = [];
    foreach ($posts as $post) {
      $data = (new Post((int) $post['id']))->getPost();
      $response['post'][] = $data;
    }

    if (isset($_GET['type']) && $_GET['type'] === 'post') {
      echo json_encode($response['post']);
      exit;
    }

    if (isset($_GET['type']) && $_GET['type'] === 'user') {
      echo json_encode($response['user']);
      exit;
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