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

      if (isset($category['name'])) return $category['name'];
      else return null;
    }

    public static function newCategory($name) {
      global $conn;

      $name = htmlspecialchars($name);
      $name = stripslashes($name);
  
      $result = mysqli_query($conn,
      "INSERT INTO categories (
        name
      ) values (
        '{$name}'
      );");

      if(!$result) throw new Exception(mysqli_error($conn));
  
      return $result;
    }

    public static function updateCategory(int $categoryId, $name) {
      global $conn;

      $name = htmlspecialchars($name);
      $name = stripslashes($name);

      $result = mysqli_query(
        $conn, 
        "UPDATE categories
        SET
          name = '{$name}'
        WHERE id = '{$categoryId}';"
      );

      if (!$result) throw new Exception(mysqli_error($conn));

      return $result;
    }

    public static function deleteCategory(int $categoryId) {
      global $conn;

      $result = mysqli_query(
        $conn, 
        "DELETE FROM categories
        WHERE id = {$categoryId};"
      );

      if (!$result) throw new Exception(mysqli_error($conn));

      return $result;
    }
  }
?>
