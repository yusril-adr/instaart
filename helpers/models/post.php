<?php
  class Post {
    private $id;

    public function __construct(int $id) {
      $this->id = $id;
    }

    public static function getPostsFromUser(string $id) {
      global $conn;

      $result = mysqli_query(
        $conn, 
        "SELECT * FROM posts WHERE user_id = {$id} ORDER BY date DESC LIMIT 15;"
      );

      if (!$result) throw new Exception(mysqli_error($conn));

      $posts = [];
      if($result->num_rows > 0) {
        while($post = mysqli_fetch_assoc($result)) {
          $post = new Post((int) $post['id']);
          $post = $post->getPost();
          $posts[] = $post;
        }
      }

      return $posts;
    }

    public static function getPopularPosts() {
      global $conn;

      $result = mysqli_query(
        $conn, 
        "SELECT 
          posts.id,
          count(likes.id) as likes
        FROM posts 
        INNER JOIN likes
        ON likes.post_id = posts.id
        GROUP BY posts.id
        ORDER BY likes DESC
        LIMIT 12;"
      );

      if (!$result) throw new Exception(mysqli_error($conn));

      $posts = [];
      if($result->num_rows > 0) {
        while($post = mysqli_fetch_assoc($result)) {
          $post = new Post((int) $post['id']);
          $post = $post->getPost();
          $posts[] = $post;
        }
      }

      return $posts;
    }

    public static function getExplore(array $usersId) {
      global $conn;

      $query = "SELECT 
       posts.id,
       posts.color_id,
       posts.category_id,
       posts.image,
       posts.title,
       posts.date,
       posts.insight,
       users.image as user_image,
       users.username
       FROM posts 
       INNER JOIN users
       ON posts.user_id = users.id
       WHERE posts.user_id = {$usersId[0]}";

      foreach ($usersId as $id) {
        if($id === $usersId[0]) continue;
        $query .= " OR posts.user_id = {$id}";
      }

      $query .= ' ORDER BY posts.date DESC;';

      $result = mysqli_query($conn, $query);

      if (!$result) throw new Exception(mysqli_error($conn));

      $posts = [];
      if($result->num_rows > 0) {
        while($post = mysqli_fetch_assoc($result)) $posts[] = $post;
      }

      return $posts;
    }

    public static function getFavoritePosts(int $userId) {
      global $conn;

      $query = "SELECT 
       posts.id,
       posts.color_id,
       posts.category_id,
       posts.image,
       posts.title,
       posts.date,
       posts.insight,
       users.image as user_image,
       users.username
       FROM posts 
       INNER JOIN users
       ON posts.user_id = users.id
       INNER JOIN likes
       ON likes.post_id = posts.id
       WHERE likes.user_id = '{$userId}'
       ORDER BY likes.id DESC;";

      $result = mysqli_query($conn, $query);

      if (!$result) throw new Exception(mysqli_error($conn));

      $posts = [];
      if($result->num_rows > 0) {
        while($post = mysqli_fetch_assoc($result)) $posts[] = $post;
      }

      return $posts;
    }

    public static function getBookmarkedPosts(int $userId) {
      global $conn;

      $query = "SELECT 
       posts.id,
       posts.color_id,
       posts.category_id,
       posts.image,
       posts.title,
       posts.date,
       posts.insight,
       users.image as user_image,
       users.username
       FROM posts 
       INNER JOIN users
       ON posts.user_id = users.id
       INNER JOIN bookmark_posts
       ON bookmark_posts.post_id = posts.id
       WHERE bookmark_posts.user_id = '{$userId}'
       ORDER BY bookmark_posts.id DESC;";

      $result = mysqli_query($conn, $query);

      if (!$result) throw new Exception(mysqli_error($conn));

      $posts = [];
      if($result->num_rows > 0) {
        while($post = mysqli_fetch_assoc($result)) $posts[] = $post;
      }

      return $posts;
    }

    public static function newPost($data, int $userId) {
      global $conn;

      $title = htmlspecialchars($data['title']);
      $title = stripslashes($title);

      $caption = htmlspecialchars($data['caption']);
      $caption = stripslashes($caption);

      $result = mysqli_query($conn,
      "INSERT INTO posts (
        user_id,
        category_id,
        color_id,
        title,
        caption,
        image
      ) values (
        '{$userId}',
        '{$data['category_id']}',
        '{$data['color_id']}',
        '{$title}', 
        '{$caption}',  
        '{$data['image']}'
      );");

      return $result;
    }

    public static function searchPost(string $keyword, string $category_id, string $color_id) {
      global $conn;

      $query = "
        SELECT
          id,
          title,
          image,
          date
        FROM posts
        WHERE title LIKE '%{$keyword}%'
      ";

      if ($category_id !== '') {
        $query .= " AND category_id = '{$category_id}'";
      }

      if ($color_id !== '') {
        $query .= " AND color_id = '{$color_id}'";
      }

      $query .= "ORDER BY date DESC;";
  
      $result = mysqli_query($conn, $query);
  
      $postFounds = [];
  
      if($result->num_rows > 0) {
        while($postFound = mysqli_fetch_assoc($result)) $postFounds[] = $postFound;
      }
  
      return $postFounds;
    }

    public static function deletePostFromUser($userId) {
      $posts = Post::getPostsFromUser($userId);

      foreach ($posts as $postData) {
        $post =  new Post($postData['id']);
        $post->deleteBookmarks();
        $post->deletePost();
      }
    }

    public function getPost() {
      global $conn;

      $result = mysqli_query(
        $conn, 
        "SELECT 
          posts.id,
          posts.color_id,
          posts.category_id,
          posts.title,
          posts.caption,
          posts.image,
          posts.date,
          posts.user_id,
          posts.insight,
          users.image as user_image,
          users.username
        FROM `posts`
        INNER JOIN users
        ON users.id = posts.user_id
        WHERE posts.id = {$this->id};"
      );

      if (!$result) throw new Exception(mysqli_error($conn));

      $post = mysqli_fetch_assoc($result);
      if(!$post) throw new Exception('Portofolio tidak ditemukan.', 404);

      $likes = $this->getLikes();
      $post['likes'] = $likes;

      $comments = $this->getComments();
      $post['comments'] = $comments;
      return $post;
    }

    public function getLikes() {
      global $conn;

      $result = mysqli_query(
        $conn, 
        "SELECT user_id
        FROM likes
        WHERE post_id = '{$this->id}';"
      );
  
      $likes = [];
  
      if($result->num_rows > 0) {
        while($like = mysqli_fetch_assoc($result)) $likes[] = $like['user_id'];
      }

      return $likes;
    }

    public function getComments() {
      global $conn;

      $result = mysqli_query(
        $conn, 
        "SELECT 
	        users.id AS user_id,
          users.username,
          users.image AS user_image,
          comments.id,
          comments.body,
          comments.date
        FROM comments
        INNER JOIN users
        ON comments.user_id = users.id
        WHERE post_id = '{$this->id}'
        ORDER BY comments.date DESC;"
      );
  
      $comments = [];
  
      if($result->num_rows > 0) {
        while($comment = mysqli_fetch_assoc($result)) $comments[] = $comment;
      }

      return $comments;
    }

    public function increaseInsight() {
      global $conn;

      $currentInsight = (int) $this->getPost()['insight'];
      $currentInsight++;

      $result = mysqli_query(
        $conn, 
        "UPDATE posts
        SET
          insight = '{$currentInsight}'
        WHERE id = {$this->id};"
      );

      if (!$result) throw new Exception('Portofolio tidak ditemukan.', 404);

      return $result;
    }

    public function updatePost($data) {
      global $conn;

      $title = htmlspecialchars($data['title']);
      $title = stripslashes($title);

      $caption = htmlspecialchars($data['caption']);
      $caption = stripslashes($caption);

      $result = mysqli_query(
        $conn, 
        "UPDATE posts
        SET
          title = '$title',
          caption = '{$caption}',
          color_id = '{$data['color_id']}',
          category_id = '{$data['category_id']}'
        WHERE id = {$this->id};"
      );

      if (!$result) throw new Exception('Portofolio tidak ditemukan.', 404);

      return $result;
    }

    public function deletePost() {
      global $conn;

      $info = $this->getPost();
      unlink("../public/images/posts/{$info['image']}");

      $this->deleteBookmarks();
      $this->deleteLikes();
      $this->deleteComments();

      $result = mysqli_query(
        $conn, 
        "DELETE FROM posts
        WHERE id = {$this->id};"
      );

      if (!$result) throw new Exception(mysqli_error($conn));

      return $result;
    }

    private function deleteBookmarks() {
      global $conn;
  
      $result = mysqli_query(
        $conn, 
        "DELETE FROM bookmark_posts
        WHERE post_id = {$this->id};"
      );
  
      return $result;
    }

    private function deleteLikes() {
      global $conn;
  
      $result = mysqli_query(
        $conn, 
        "DELETE FROM likes
        WHERE post_id = {$this->id};"
      );
  
      return $result;
    }

    private function deleteComments() {
      global $conn;
  
      $result = mysqli_query(
        $conn, 
        "DELETE FROM comments
        WHERE post_id = {$this->id};"
      );
  
      return $result;
    }
  }
?>