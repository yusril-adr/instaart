<?php 
  class Post {
    public $id;

    public function __construct(int $id) {
      $this->id = $id;
    }

    public static function getPostsFromUser(string $username) {
      global $conn;

      $result = mysqli_query(
        $conn, 
        "SELECT * FROM posts WHERE user_id = '{$username}';"
      );

      if (!$result) throw new Exception('User not found.', 404);

      $posts = [];
      if($result->num_rows > 0) {
        while($post = mysqli_fetch_assoc($result)) $posts[] = $post;
      }

      return $posts;
    }

    public static function newPost($data, int $id) {
      global $conn;

      $title = stripslashes($data['title']);
      $caption = stripslashes($data['caption']);

      $result = mysqli_query($conn,
      "INSERT INTO posts (
        user_id,
        title, 
        caption, 
        image
      ) values (
        {$id}, 
        '{$title}', 
        '{$caption}',  
        '{$data['image']}'
      );");



      return $result;
    }

    public function getPost() {
      global $conn;

      $result = mysqli_query(
        $conn, 
        "SELECT * FROM posts WHERE id = {$this->id};"
      );

      if (!$result) throw new Exception('Post not found.', 404);

      $post = mysqli_fetch_assoc($result);
      return $post;
    }

    public function updatePost($data) {
      global $conn;

      $title = stripslashes($data['title']);
      $caption = stripslashes($data['caption']);

      $result = mysqli_query(
        $conn, 
        "UPDATE posts
        SET
          title = '$title',
          caption = '{$caption}'
        WHERE id = {$this->id};"
      );

      if (!$result) throw new Exception('Post not found.', 404);

      return $result;
    }

    public function deletePost() {
      global $conn;

      $info = $this->getPost();
      unlink("../public/img/posts/{$info['image']}");

      $result = mysqli_query(
        $conn, 
        "DELETE FROM posts
        WHERE id = {$this->id};"
      );

      if (!$result) throw new Exception('Post not found.', 404);

      return $result;
    }
  }
?>