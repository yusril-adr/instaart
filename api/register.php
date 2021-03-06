<?php 
  require_once "./utils/import-helper.php";

  $request = json_decode(file_get_contents('php://input'), true);
  $requestMethod = $_SERVER["REQUEST_METHOD"];

  if ($requestMethod === "POST") {
    try {
      if(isset($_SESSION['username'])) {
        errorResponse('You need to logout first');
      }
    
      if(isset($request['username'])) {
        $oldUserWithUsername = new User($request['username']);
        $oldUserWithEmail = new User($request['email']);
    
        if($oldUserWithUsername->getUser() || $oldUserWithEmail->getUser()) {
          errorResponse('User already exist.', 428);
        }
    
        $user = User::registerUser($request);
        if ($user) {
          $user = new User($request['username']);
    
          login($request['username'], $request['password']);
          echo json_encode($user->getUser());
          exit;
        }
    
        errorResponse('Register failed.');
      }
    } catch (Exception $error) {
      errorResponse($error->getMessage());
    }
  }

  errorResponse('This request method is not supprted for this endpoint.', 405);
?>