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

    if(count($followingData) > 0) {
      foreach ($followingData as $id) {
        $following[] = $id['following_id'];
      }
      $response = Post::getExplore($following);
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