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

  $currentUsername = User::getUserFromId($authId)['username'];

  if(isset($request['setDefault'])) {
    $user = new User($currentUsername);
    $info = $user->getUser();

    $defaultFileName = 'default_user.png';

    if($info['image'] !== $defaultFileName) {
      unlink("../public/images/users/{$info['image']}");
    }

    $user->updateImage($defaultFileName);

    $response['status'] = 'success';
    $response['message'] = 'Image updated.';
    $response['filename'] = $defaultFileName;
    echo json_encode($response);
    exit;
  }

  if(!isset($authId) || !checkToken($authToken, $authId)) {
    unauthorizedResponse();
  }

  if(!isset($_FILES['profile_image'])) {
    errorResponse('Image is empty or not uploaded.', 428);
  }

  try {
    $imgFile = $_FILES['profile_image'];
    $imgSize = $_FILES["profile_image"]["size"];

    $allowedImgExtension = ["jpg",  "jpeg", "png"];
    $extension = explode('.', $imgFile['name']);
    $extension = end($extension);
    $extension = strtolower($extension);

    if (!in_array($extension, $allowedImgExtension)) {
      throw new Exception('File is not supported', 415);
    }

    if ($imgSize > 1000000) {
      throw new Exception('File is more than 1mb.', 413);
    }

    $user = new User($currentUsername);
    $info = $user->getUser();

    $defaultFileName = 'default_user.png';

    if($info['image'] !== $defaultFileName) {
      unlink("../public/images/users/{$info['image']}");
    }

    $id = $info['id'];
    $newFileName = "{$id}.{$extension}";
    $fileTmp = $imgFile["tmp_name"];
    move_uploaded_file($fileTmp, "../public/images/users/$newFileName");

    $user->updateImage($newFileName);

    $response['status'] = 'success';
    $response['message'] = 'Image updated.';
    $response['filename'] = $newFileName;
    echo json_encode($response);
  } catch (Exception $error) {
    if($error->getCode() !== 0) {
      errorResponse($error->getMessage(), $error->getCode());
    }
    errorResponse($error->getMessage());
  }  
?>