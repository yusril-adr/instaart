<?php
  class Categories {
    public static function getCategories() {
      global $conn;

      $result = mysqli_query(
        $conn, 
        "SELECT
          *
        FROM categories
        ORDER BY name ASC;"
      );

      $categories = [];

      if ($result->num_rows > 0) {
        while($category = mysqli_fetch_assoc($result)) $categories[] = $category;
      }

      return $categories;
    }

    public static function getCategory(int $id) {
      global $conn;

      $result = mysqli_query(
        $conn, 
        "SELECT
          *
        FROM categories
        WHERE id = '{$id}';"
      );

      $category = mysqli_fetch_assoc($result);

      return $category['name'];
    }
  }
?>