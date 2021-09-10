<?php 
  require_once "./data/mysql.php";
  require_once "./models/user.php";
  require_once "./models/post.php";
  require_once "./utils/login.php";
  require_once "./utils/error-helper.php";

  cors();
  header('Content-Type: application/json');
?>