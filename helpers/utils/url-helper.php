<?php
  function startsWith($text, $keyword) {
    $length = strlen($keyword);
    return substr($text, 0, $length) === $keyword;
  }

  function endsWith($text, $keyword) {
  $length = strlen($keyword);
  if(!$length) {
      return true;
  }
  return substr($text, -$length) === $keyword;
  }

  function getPathUrl() {
    $url = $_SERVER['REQUEST_URI'];
    $url = explode('/', $url);
    $url = end($url);
    return $url;
  }
?>