<?php 
  require_once './utils/import-helper.php';
  if (isset($_SERVER['HTTP_X_AUTH_ID'])) {
    $authId = $_SERVER['HTTP_X_AUTH_ID'];
  }
  if (isset($_SERVER['HTTP_X_AUTH_TOKEN'])) {
    $authToken = $_SERVER['HTTP_X_AUTH_TOKEN'];
  }

  if($_SERVER["REQUEST_METHOD"] !== 'GET') {
    errorResponse('This request method is not supprted for this endpoint.', 405);
  }

  if(!isset($authId) || !checkToken($authToken, $authId)) unauthorizedResponse();

  try {
    $username = User::getUserFromId($authId)['username'];
    $user = new User($username);
    $followingData = $user->getFollowing();

    $response = [];
    $following = [ (int) $authId ];

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