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

  switch ($requestMethod) {
    case 'GET':
      try {
        if(isset($_GET['id'])) {
          $job = new Job((int) $_GET['id']);

          $result = $job->getJob();

          echo json_encode($result);
          exit;
        }

        if(isset($_GET['user_id'])) {
          $jobs = Job::getJobsFromUser($_GET['user_id']);

          echo json_encode($jobs);
          exit;
        }

        $jobs = Job::getJobs();

        echo json_encode($jobs);
        exit;
      } catch (Exception $error) {
        if($error->getCode() !== 0) {
          errorResponse($error->getMessage(), $error->getCode());
        }
        errorResponse($error->getMessage());
      }
      break;
    
    case 'POST':
      try {
        if(!isset($authId) || !checkToken($authToken, $authId)) unauthorizedResponse();

        $result = Job::postJob($request, (int) $authId);

        if ($result) {
          $response['status'] = 'success';
          $response['message'] = 'Job added.';
          $response['id'] = Job::getJobsFromUser((int) $authId)[0]['id'];

          echo json_encode($response);
          exit;
        }
      } catch (Exception $error) {
        if($error->getCode() !== 0) {
          errorResponse($error->getMessage(), $error->getCode());
        }
        errorResponse($error->getMessage());
      }
      break;

    case 'PUT':
      try {
        if(!isset($authId) || !checkToken($authToken, $authId)) unauthorizedResponse();

        $job = new Job((int) $request['job_id']);

        $result = $job->updateJob($request);

        echo json_encode($job->getJob());
        exit;
      } catch (Exception $error) {
        if($error->getCode() !== 0) {
          errorResponse($error->getMessage(), $error->getCode());
        }
        errorResponse($error->getMessage());
      }
      break;

    case 'DELETE':
      try {
        if(!isset($authId) || !checkToken($authToken, $authId)) unauthorizedResponse();

        $job = new Job((int) $request['job_id']);

        $result = $job->deleteJob();

        $response['status'] = 'success'; 
        $response['message'] = 'Job successfully Deleted'; 

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