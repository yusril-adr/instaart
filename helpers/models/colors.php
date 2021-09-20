<?php
  class Colors {
    public static function getColors() {
      global $conn;

      $result = mysqli_query(
        $conn, 
        "SELECT
          *
        FROM colors
        ORDER BY name ASC;"
      );

      $colors = [];

      if ($result->num_rows > 0) {
        while($color = mysqli_fetch_assoc($result)) $colors[] = $color;
      }

      return $colors;
    }

    public static function getColor(int $id) {
      global $conn;

      $result = mysqli_query(
        $conn, 
        "SELECT
          *
        FROM colors
        WHERE id = '{$id}';"
      );

      $color = mysqli_fetch_assoc($result);

      if (isset($color['name'])) return $color['name'];
      else return null;
    }

    public static function newColor($name) {
      global $conn;

      $name = htmlspecialchars($name);
      $name = stripslashes($name);
  
      $result = mysqli_query($conn,
      "INSERT INTO colors (
        name
      ) values (
        '{$name}'
      );");

      if(!$result) throw new Exception(mysqli_error($conn));
  
      return $result;
    }

    public static function updateColor(int $colorId, $name) {
      global $conn;

      $name = htmlspecialchars($name);
      $name = stripslashes($name);

      $result = mysqli_query(
        $conn, 
        "UPDATE colors
        SET
          name = '{$name}'
        WHERE id = '{$colorId}';"
      );

      if (!$result) throw new Exception(mysqli_error($conn));

      return $result;
    }

    public static function deleteColor(int $colorId) {
      global $conn;

      $result = mysqli_query(
        $conn, 
        "DELETE FROM colors
        WHERE id = {$colorId};"
      );

      if (!$result) throw new Exception(mysqli_error($conn));

      return $result;
    }
  }