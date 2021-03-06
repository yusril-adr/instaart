<?php 
  require_once './utils/error-helper.php';
  session_start();

  if(isset($_SESSION["username"])) {
    setcookie('key', '', time()-60*60);

    $_SESSION = [];
    session_unset();
    session_destroy();

    $response['status'] = 'success';
    $response['message'] = 'Logout succesfully.';

    echo json_encode($response);
    exit;
  }

  unauthorizedResponse();
?>