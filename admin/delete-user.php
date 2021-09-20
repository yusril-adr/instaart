<?php
  require_once '../helpers/utils/import-helper.php';

  $request = json_decode(file_get_contents('php://input'), true);
  $requestMethod = $_SERVER["REQUEST_METHOD"];

try {
  if($requestMethod !== 'DELETE') throw new Exception('Request method tidak didukung.', 405);

  if(isset($request['username'])) {
    Admin::deleteUser($request['username']);
    $response['status'] = 'success';
    $response['message'] = 'Pengguna berhasil dihapus.';

    echo json_encode($response);
    exit;
  }

} catch (Exception $error) {
  http_response_code($error->getCode());
  $response['status'] = 'error';
  $response['message'] = $error->getMessage();

  echo json_encode($response);
  exit;
}