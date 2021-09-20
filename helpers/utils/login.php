<?php 
  function login($identifier, $password) {
    try {
      $user = new User($identifier);

      if ($user->verifyPassword($password)) {
        $user = $user->getUser();
        $result['user'] = $user; 
        $result['token'] = Token::createToken((int) $user['id']); 
        return $result;
      }

      return false;
    } catch (Exception $error) {
      throw new Exception('User or password is incorrect', 404);
    }

  }

  function checkToken($token, $userId) {
    return Token::checkToken($token, (int) $userId);
  }

  function loginAsAdmin($username, $password) {
    $admin = new Admin($username);

    if(!$admin->verifyPassword($password)) throw new Exception('Username atau password salah.', 404);

    $admin = $admin->getAdmin();

    $_SESSION['username'] = $admin['username'];
    $_SESSION['id'] = $admin['id'];

    return true;
  }

  function cors() {
    // Allow from any origin
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        // Decide if the origin in $_SERVER['HTTP_ORIGIN'] is one
        // you want to allow, and if so:
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }
    
    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            // may also be using PUT, PATCH, HEAD etc
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
        
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    
        exit(0);
    }
  }
?>