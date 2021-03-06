<?php 
  session_start();

  function login($identifier, $password) {
    $user = new User($identifier);

    if ($user->verifyPassword($password)) {
      $user = $user->getUser();
      $_SESSION['username'] = $user['username'];
      $_SESSION['email'] = $user['email'];

      $_COOKIE['key'] = $user['id'];
      return true;
    }

    return false;
  }

  function checkCookie() {
    if (isset($_COOKIE['key'])) {
      $user = User::getUserFromId($_COOKIE['key']);

      if($user) {
        $_SESSION['username'] = $user['username'];
        $_SESSION['email'] = $user['email'];
        return true;
      }
    }
  }
?>