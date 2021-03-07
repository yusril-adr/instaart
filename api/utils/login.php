<?php 
  session_start();

  function login($identifier, $password) {
    $user = new User($identifier);

    if ($user->verifyPassword($password)) {
      $user = $user->getUser();
      $_SESSION['username'] = $user['username'];
      $_SESSION['email'] = $user['email'];
      $_SESSION['id'] = $user['id'];

      setcookie('key', "{$user['id']}", time()+24*60*60, '/');
      return true;
    }

    return false;
  }

  function checkCookie() {
    try {
      if (isset($_COOKIE['key'])) {
        $user = User::getUserFromId((int) $_COOKIE['key']);
  
        if($user) {
          $_SESSION['username'] = $user['username'];
          $_SESSION['email'] = $user['email'];
          return true;
        }
      }
    } catch(Exception $error) {
      errorResponse($error->getMessage());
    }
  }
?>