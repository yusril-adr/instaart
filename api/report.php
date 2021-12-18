<?php 
  require_once "../helpers/utils/import-helper.php";
  header('Content-Type: application/json');

  $request = json_decode(file_get_contents('php://input'), true);
  $requestMethod = $_SERVER["REQUEST_METHOD"];

  if (isset($_SERVER['HTTP_X_AUTH_ID'])) {
    $authId = $_SERVER['HTTP_X_AUTH_ID'];
  }

  if (isset($_SERVER['HTTP_X_AUTH_TOKEN'])) {
    $authToken = $_SERVER['HTTP_X_AUTH_TOKEN'];
  }
  
  if ($requestMethod !== "POST") {
    errorResponse('This request method is not supprted for this endpoint.', 405);
  }

  try {
    if(!isset($authId) || !checkToken($authToken, $authId)) unauthorizedResponse();

    if(!isset($request['type'])) throw new Exception('Definisikan Tipe Laporan', 428);
    
    $result = Report::createReport($request, (int) $authId);

    if ($result) {
      $response['status'] = 'success';
      $response['message'] = 'Report created.';

      echo json_encode($response);
      exit;
    }

  } catch (Exception $error) {
    if($error->getCode() !== 0) {
      errorResponse($error->getMessage(), $error->getCode());
    }
    errorResponse($error->getMessage());
  }
?>