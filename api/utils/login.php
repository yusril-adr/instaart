<?php 
  session_start();

  function login($identifier, $password) {
    try {
      $user = new User($identifier);

      if ($user->verifyPassword($password)) {
        $user = $user->getUser();
        $_SESSION['username'] = $user['username'];
        $_SESSION['email'] = $user['email'];
        $_SESSION['id'] = $user['id'];

        setcookie('key', "{$user['id']}", time()+30*24*60*60, '/');
        return true;
      }

      return false;
    } catch (Exception $error) {
      throw new Exception('User or password is incorrect', 404);
    }

  }

  function checkCookie() {
    if (isset($_COOKIE['key'])) {
      $user = User::getUserFromId((int) $_COOKIE['key']);

      if($user) {
        $_SESSION['username'] = $user['username'];
        $_SESSION['email'] = $user['email'];
        $_SESSION['id'] = $_COOKIE['key'];
        return true;
      }
    }
  }
?>