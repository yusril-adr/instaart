<?php 
  require_once './utils/import-helper.php';

  $request = json_decode(file_get_contents('php://input'), true);
  $requestMethod = $_SERVER["REQUEST_METHOD"];

  switch ($requestMethod) {
    case 'GET':
      # code ...
      break;
    
    case 'POST':
      if (!isset($_SESSION['username'])) {
        unauthorizedResponse();
      }

      try {
        $user = new User($_SESSION['username']);
        
        $user->followUser($request['user_id']);

        $response['status'] = 'success'; 
        $response['message'] = 'successfully followed.'; 
        echo json_encode($response);
        exit;
      } catch (Exception $error) {
        if($error->getCode() !== 0) {
          errorResponse($error->getMessage(), $error->getCode());
        }
        errorResponse($error->getMessage());
      }

    default:
      errorResponse('This request method is not supprted for this endpoint.', 405);
      break;
  }
?>