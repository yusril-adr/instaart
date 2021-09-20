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

      return $color['name'];
    }
  }