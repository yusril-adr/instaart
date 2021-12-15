<?php 
  require_once "../helpers/utils/import-helper.php";
  header('Content-Type: application/json');

  $request = json_decode(file_get_contents('php://input'), true);
  $requestMethod = $_SERVER["REQUEST_METHOD"];

  switch ($requestMethod) {
    case 'GET':
      try {
        if(isset($_GET['token'])) {
          $recoveryTokenData = User::verifyRecoveryToken($_GET['token']);

          $user = new User($recoveryTokenData['username']);
          $user->deleteRecoveryToken();

          echo json_encode($recoveryTokenData);
          exit;
        }

        throw new Exception('Token kosong.', 428);
      } catch (Exception $error) {
        if($error->getCode() !== 0) {
          errorResponse($error->getMessage(), $error->getCode());
        }
        errorResponse($error->getMessage());
      }
      break;
    
    case 'POST':
      try {
        if(!isset($request['email'])) {
          throw new Exception('Email kosong.', 428);
        }

        $user = new User($request['email']);
        $token = $user->createRecoveryToken();

        $response['token'] = $token;
        echo json_encode($response);
        exit;
      } catch (Exception $error) {
        if($error->getCode() !== 0) {
          errorResponse($error->getMessage(), $error->getCode());
        }
        errorResponse($error->getMessage());
      }
      break;
    default:
      errorResponse('This request method is not supprted for this endpoint.', 405);
      break;
  }
?>