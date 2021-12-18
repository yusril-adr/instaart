<?php 
 class Report {
   public static function getReports(string $type) {
    global $conn;

    $results = mysqli_query(
      $conn, 
      "SELECT
        *
      FROM reports
      WHERE type = '{$type}';"
    );


    $reports = [];

    if($results->num_rows > 0) {
      while($report = mysqli_fetch_assoc($results)) {
        if ($type == 'job') {
          $report = Report::getReportJob($report['id']);
        }
        $reports[] = $report;
      }
    }

    return $reports;
   }

   public static function getReport(string $id) {
    global $conn;

    $result = mysqli_query(
      $conn, 
      "SELECT
        *
      FROM reports
      WHERE id = '{$id}';"
    );

    $report = mysqli_fetch_assoc($result);

    if($report) return $report;

    return false;
   }

   public static function getReportJob(string $id) {
    global $conn;

    $result = mysqli_query(
      $conn, 
      "SELECT
        reports.id,
        reports.user_id,
        reports.reported_id as job_id,
        reports.reason_image,
        reports.reason,
        reports.status,
        users.username,
        jobs.title
      FROM reports
      INNER JOIN users 
      ON reports.user_id = users.id
      INNER JOIN jobs 
      ON reports.reported_id = jobs.id
      WHERE reports.id = '{$id}';"
    );

    $report = mysqli_fetch_assoc($result);

    if($report) return $report;

    return false;
   }

   public static function createReport($data, int $userId) {
    global $conn;

    $reason = htmlspecialchars($data['reason']);
    $reason = stripslashes($reason);
    $reason = strtolower($reason);

    $result = mysqli_query(
      $conn, 
      "INSERT INTO reports (
        user_id,
        reported_id,
        reason_image,
        reason,
        type
      ) values (
        '{$userId}', 
        '{$data['reported_id']}',
        '{$data['reason_image']}',
        '{$reason}',
        '{$data['type']}'
      );"
    );

    return $result;
   }

   public static function updateReport($id, $status) {
    global $conn;

    $result = mysqli_query(
      $conn, 
      "UPDATE reports
      SET
        status = '{$status}'
      WHERE id = '{$id}';"
    );

    if (!$result) throw new Exception('Laporan tidak ditemukan.', 404);

    return $result;
   }

   public static function deleteReport(string $id) {
    global $conn;

    $info = Report::getReport($id);
    unlink("../public/images/reports/{$info['reason_image']}");

    $result = mysqli_query($conn, 
      "DELETE FROM reports 
      WHERE id = '{$id}';"
    );
    
    if (!$result) throw new Exception(mysqli_error($conn));

    return $result;
   }
 }