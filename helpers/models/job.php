<?php
  class Job {
    private $id;

    public function __construct(int $id) {
      $this->id = $id;
    }

    public static function getJobs() {
      global $conn;

      $result = mysqli_query(
        $conn, 
        "SELECT
          jobs.id,
          jobs.title,
          jobs.description,
          jobs.province_id,
          jobs.province_name,
          jobs.city_id,
          jobs.city_name,
          jobs.work_type,
          jobs.shift,
          jobs.form_link,
          users.id as user_id,
          users.username,
          users.display_name as user_display_name,
          users.image as user_image
        FROM jobs 
        INNER JOIN users
        ON jobs.user_id = users.id
        WHERE jobs.is_accepted = 'true'
        ORDER BY id DESC;"
      );

      $jobs = [];

      if($result->num_rows > 0) {
        while($job = mysqli_fetch_assoc($result)) $jobs[] = $job;
      }

      return $jobs;
    }

    public static function getAllJobs() {
      global $conn;

      $result = mysqli_query(
        $conn, 
        "SELECT
          jobs.id,
          jobs.title,
          jobs.description,
          jobs.province_id,
          jobs.province_name,
          jobs.city_id,
          jobs.city_name,
          jobs.work_type,
          jobs.shift,
          jobs.form_link,
          jobs.is_accepted,
          users.id as user_id,
          users.username,
          users.display_name as user_display_name,
          users.image as user_image
        FROM jobs 
        INNER JOIN users
        ON jobs.user_id = users.id
        ORDER BY id DESC;"
      );

      $jobs = [];

      if($result->num_rows > 0) {
        while($job = mysqli_fetch_assoc($result)) $jobs[] = $job;
      }

      return $jobs;
    }

    public static function getJobsFromUser(string $id) {
      global $conn;

      $result = mysqli_query(
        $conn, 
        "SELECT jobs.id as id FROM jobs WHERE user_id = {$id} ORDER BY jobs.id DESC;"
      );

      if (!$result) throw new Exception(mysqli_error($conn));

      $jobs = [];
      if($result->num_rows > 0) {
        while($job = mysqli_fetch_assoc($result)) {
          $job = new Job((int) $job['id']);
          $job = $job->getjob();
          $jobs[] = $job;
        }
      }

      return $jobs;
    }

    public static function searchJob(string $keyword, string $workType, string $shift) {
      global $conn;

      $query = "
        SELECT
          id
        FROM jobs
        WHERE title LIKE '%{$keyword}%' AND is_accepted = 'true'
      ";

      if ($workType !== '') {
        $query .= " AND work_type = '{$workType}'";
      }

      if ($shift !== '') {
        $query .= " AND shift = '{$shift}'";
      }

      $query .= "ORDER BY id DESC;";
  
      $result = mysqli_query($conn, $query);
  
      $jobFounds = [];
      if($result->num_rows > 0) {
        while($jobFound = mysqli_fetch_assoc($result)) $jobFounds[] = $jobFound;
      }

      return $jobFounds;
    }

    public static function postJob($data, $userId) {
      global $conn;

      $title = htmlspecialchars($data['title']);
      $title = stripslashes($title);
  
      $description = htmlspecialchars($data['description']);
      $description = stripslashes($description);

      $formLink = htmlspecialchars($data['form_link']);
      $formLink = stripslashes($formLink);
  
      $result = mysqli_query($conn,
      "INSERT INTO jobs (
        user_id,
        province_id,
        province_name,
        city_id,
        city_name,
        work_type,
        shift,
        title,
        description, 
        form_link
      ) values (
        '{$userId}', 
        '{$data['province_id']}', 
        '{$data['province_name']}', 
        '{$data['city_id']}', 
        '{$data['city_name']}', 
        '{$data['work_type']}', 
        '{$data['shift']}', 
        '{$title}', 
        '{$description}',  
        '{$formLink}'
      );");
  
      return $result;
    }

    public static function deleteJobFromUser($userId) {
      global $conn;
  
      $result = mysqli_query($conn, 
        "DELETE FROM jobs 
        WHERE user_id = '{$userId}';"
      );
      
      if (!$result) throw new Exception(mysqli_error($conn));
  
      return $result;
    }

    public function getJob() {
      global $conn;

      $result = mysqli_query(
        $conn, 
        "SELECT
          jobs.id,
          jobs.title,
          jobs.description,
          jobs.province_id,
          jobs.province_name,
          jobs.city_id,
          jobs.city_name,
          jobs.work_type,
          jobs.shift,
          jobs.form_link,
          jobs.is_accepted,
          users.id as user_id,
          users.username,
          users.display_name,
          users.image as user_image
        FROM jobs 
        INNER JOIN users
        ON jobs.user_id = users.id
        WHERE jobs.id = {$this->id};"
      );

      if (!$result) throw new Exception(mysqli_error($conn));

      $job = mysqli_fetch_assoc($result);
      if(!$job) throw new Exception('Pekerjaan tidak ditemukan.', 404);

      return $job;
    }

    public function updateJob($data) {
      global $conn;

      $title = htmlspecialchars($data['title']);
      $title = stripslashes($title);

      $description = htmlspecialchars($data['description']);
      $description = stripslashes($description);

      $formLink = htmlspecialchars($data['form_link']);
      $formLink = stripslashes($formLink);

      $result = mysqli_query(
        $conn, 
        "UPDATE jobs
        SET
          title = '{$title}',
          description = '{$description}',
          province_id = '{$data['province_id']}',
          province_name = '{$data['province_name']}',
          city_id = '{$data['city_id']}',
          city_name = '{$data['city_name']}',
          work_type = '{$data['work_type']}',
          shift = '{$data['shift']}',
          form_link = '{$formLink}'
        WHERE id = {$this->id};"
      );

      if (!$result) throw new Exception('Pekerjaan tidak ditemukan.', 404);

      return $result;
    }

    public function updateJobValidation($status) {
      global $conn;

      $result = mysqli_query(
        $conn, 
        "UPDATE jobs
        SET
         is_accepted = '{$status}'
        WHERE id = {$this->id};"
      );

      if (!$result) throw new Exception('Pekerjaan tidak ditemukan.', 404);

      return $result;
    }

    public function deleteJob() {
      global $conn;
  
      $result = mysqli_query($conn, 
        "DELETE FROM jobs 
        WHERE id = '{$this->id}';"
      );
      
      if (!$result) throw new Exception(mysqli_error($conn));
  
      return $result;
    }
  }
?>