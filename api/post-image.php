<?php 
  require_once "./utils/import-helper.php";

  $request = json_decode(file_get_contents('php://input'), true);
  $requestMethod = $_SERVER["REQUEST_METHOD"];

  if ($requestMethod !== "POST") {
    errorResponse('This request method is not supprted for this endpoint.', 405);
  }

  if(!isset($_SESSION['username'])) {
    unauthorizedResponse();
  }

  if(!isset($_FILES['image'])) {
    errorResponse('Image is empty or not uploaded.', 428);
  }

  try {
    $imgFile = $_FILES['image'];

    $allowedImgExtension = ["jpg",  "jpeg", "png"];
    $extension = explode('.', $imgFile['name']);
    $extension = end($extension);
    $extension = strtolower($extension);

    if (!in_array($extension, $allowedImgExtension)) {
      throw new Exception('File is not supported');
    }

    $randomString = uniqid();
    $newFileName = "{$randomString}.{$extension}";
    $fileTmp = $imgFile["tmp_name"];
    move_uploaded_file($fileTmp, "../public/images/posts/$newFileName");

    $response['status'] = 'success';
    $response['message'] = 'Image updated.';
    $response['fileName'] = $newFileName;
    echo json_encode($response);
  } catch (Exception $error) {
    if($error->getCode() !== 0) {
      errorResponse($error->getMessage(), $error->getCode());
    }
    errorResponse($error->getMessage());
  } 
?>