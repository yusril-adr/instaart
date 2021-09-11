<?php 
 class Token {
   public static function getToken(int $userId) {
    global $conn;

    $results = mysqli_query(
      $conn, 
      "SELECT
        token
      FROM tokens 
      WHERE user_id = '{$userId}';"
    );


    while($token = mysqli_fetch_assoc($results)) $tokens[] = $token['token'];

    return $tokens;
   }

   public static function createToken(int $userId) {
    global $conn;
    $token = uniqid();

    $result = mysqli_query(
      $conn, 
      "INSERT INTO tokens (
        user_id,
        token
      ) values (
        '{$userId}', 
        '{$token}'
      );"
    );

    if ($result) return $token;

    throw new Exception(mysqli_error($conn));
   }

   public static function deleteToken(string $token) {
    global $conn;

    $result = mysqli_query($conn, 
      "DELETE FROM tokens 
      WHERE token = '{$token}';"
    );
    
    if (!$result) throw new Exception(mysqli_error($conn));

    return $result;
   }

   public static function checkToken(string $token, int $userId) {
    global $conn;

    $result = mysqli_query(
      $conn, 
      "SELECT
        *
      FROM tokens 
      WHERE user_id = '{$userId}' AND token = '{$token}';"
    );

    if($result->num_rows > 0) {
      return true;
    }

    return false;
   }
 }