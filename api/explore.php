<?php 
  require_once './utils/import-helper.php';

  if($_SERVER["REQUEST_METHOD"] !== 'GET') {
    errorResponse('This request method is not supprted for this endpoint.', 405);
  }

  if(!isset($_SESSION['id'])) unauthorizedResponse();

  try {
    $user = new User($_SESSION['username']);
    $followingData = $user->getFollowing();

    $response = [];
    $following = [ (int) $_SESSION['id'] ];

    foreach($followingData as $id) {
      $following[] = $id;
    }
    $posts = Post::getExplore($following);

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
?>