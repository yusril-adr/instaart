<?php 
  require_once './utils/import-helper.php';

  if(!isset($_SESSION["username"])) {
    unauthorizedResponse();
  }

  setcookie('key', '', time()-60*60);

    $_SESSION = [];
    session_unset();
    session_destroy();

    $response['status'] = 'success';
    $response['message'] = 'Logout succesfully.';

    echo json_encode($response);
?>