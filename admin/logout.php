
<?php
  require_once '../helpers/utils/import-helper.php';
  session_start();

  session_destroy();
  header('location: ./index.php');
?>