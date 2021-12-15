<?php 
  require_once "../helpers/utils/import-helper.php";
  header('Content-Type: application/json');

  $request = json_decode(file_get_contents('php://input'), true);
  $requestMethod = $_SERVER["REQUEST_METHOD"];

  switch ($requestMethod) {
    case 'POST':
      try {
        if(!isset($request['password'])) {
          throw new Exception('Password kosong.', 428);
        }

        $user = new User($request['email']);
        $user->recoveryPassword($request['password']);

        $response['message'] = 'Password berhasil dirubah.';

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