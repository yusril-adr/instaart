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
        while($category = mysqli_fetch_assoc($result)) $colors[] = $category;
      }

      return $colors;
    }
  }