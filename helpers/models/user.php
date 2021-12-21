<?php 
 class User {
  private $identifier;
  private $id;

  public function __construct($identifier) {
    $this->identifier = $identifier;

    // Check if user exist, add id into property
    $id = $this->getId();
    if($id) $this->id = (int) $id;
  }

  public static function registerUser($data) {
    global $conn;

    $username = htmlspecialchars($data['username']);
    $username = stripslashes($username);
    $username = strtolower($username);

    $display_name = htmlspecialchars($data['display_name']);
    $display_name = stripslashes($display_name);

    $biodata = htmlspecialchars($data['biodata']);
    $biodata = stripslashes($biodata);

    $email = htmlspecialchars($data['email']);
    $email = stripslashes($email);
    $email = strtolower($email);

    $hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT);

    $result = mysqli_query($conn,
    "INSERT INTO users (
      username,
      password,
      display_name, 
      biodata, 
      email, 
      phone_number,
      province_id,
      province_name,
      city_id,
      city_name
    ) values (
      '{$username}', 
      '{$hashedPassword}', 
      '{$display_name}',  
      '{$biodata}',
      '{$email}', 
      '{$data['phone_number']}',
      '{$data['province_id']}',
      '{$data['province_name']}',
      '{$data['city_id']}',
      '{$data['city_name']}'
    );");

    return $result;
  }

  public static function getUserFromId(int $id) {
    global $conn;

    $result = mysqli_query(
      $conn, 
      "SELECT
        username,  
        email
      FROM users 
      WHERE id = {$id};"
    );

    $user = mysqli_fetch_assoc($result);

    if ($user) {
      return $user;
    }

    return false;
  }

  public static function searchUser(string $keyword, string $province_id, string $city_id) {
    global $conn;

    $query = "
      SELECT
        id,
        username,
        display_name,
        image,
        province_id,
        province_name,
        city_id,
        city_name
      FROM users
      WHERE (username LIKE '%{$keyword}%'
      OR display_name LIKE '%{$keyword}%'
      OR email LIKE '%{$keyword}%')";

    if ($province_id !== '') {
      $query .= " AND province_id = '{$province_id}'";
    }

    if ($city_id !== '') {
      $query .= " AND city_id = '{$city_id}'";
    }

    $query .= ";";

    $result = mysqli_query($conn, $query);

    $userFounds = [];

    if($result->num_rows > 0) {
      while($userFound = mysqli_fetch_assoc($result)) $userFounds[] = $userFound;
    }

    return $userFounds;
  }

  public static function verifyRecoveryToken(string $token) {
    global $conn;

    $result = mysqli_query(
      $conn, 
      "SELECT
        recovery_tokens.id,
        recovery_tokens.token,
        users.id as user_id,
        users.username,
        users.email
      FROM recovery_tokens 
      INNER JOIN users
      ON recovery_tokens.user_id = users.id
      WHERE recovery_tokens.token = '{$token}';"
    );

    if (!$result) throw new Exception(mysqli_error($conn));

    $token = mysqli_fetch_assoc($result);
    if(!$token) throw new Exception('Token tidak ditemukan.', 404);

    return $token;
  }

  public function verifyPassword(string $password) {
    global $conn;

    $result = mysqli_query(
      $conn, 
      "SELECT 
      username,
      email,
      password
      FROM users 
      WHERE username = '{$this->identifier}' 
      OR email = '{$this->identifier}';"
    );

    $userFound = [];
    while($user = mysqli_fetch_assoc($result)) $userFound[] = $user;

    if (count($userFound) === 0) {
      return false;
    }

    return password_verify($password, $userFound[0]["password"]);
  }

  public function getId() {
    global $conn;

    $result = mysqli_query(
      $conn, 
      "SELECT
        id
      FROM users 
      WHERE username = '{$this->identifier}' 
      OR email = '{$this->identifier}';"
    );

    if(!$result) throw new Exception(mysqli_error($conn));

    $data = mysqli_fetch_assoc($result);

    if($data === null) $data['id'] = null;
    return $data['id'];
  }

  public function getUser() {
    global $conn;

    $result = mysqli_query(
      $conn, 
      "SELECT
        id,
        username, 
        display_name, 
        biodata, 
        image, 
        email, 
        phone_number,
        province_id,
        province_name,
        city_id,
        city_name
      FROM users 
      WHERE username = '{$this->identifier}' 
      OR email = '{$this->identifier}';"
    );

    $user = mysqli_fetch_assoc($result);

    if ($user) {
      $user['followers'] = $this->getFollowers();
      $user['following'] = $this->getFollowing();
      $user['bookmark_posts'] = $this->getBookmarkedPosts();
      return $user;
    }

    return false;
  }

  public function getActivites() {
    global $conn;

    $result = mysqli_query(
      $conn, 
      "SELECT 
        posts.id AS post_id,
        posts.title AS post_title,
        posts.user_id AS owner_id,
        users.image AS other_image,
        users.username AS other_username,
        comments.user_id AS other_id,
        comments.type AS relation,
        comments.date AS date
      FROM posts
      INNER JOIN comments
      ON comments.post_id = posts.id
      INNER JOIN users
      ON users.id = comments.user_id
      WHERE posts.user_id = {$this->id} AND NOT users.id = {$this->id}
        
      UNION
      
      SELECT 
        users.id AS post_id,
        users.username AS post_title,
        follows.following_id AS owner_id,
        users.image AS other_image,
        users.username AS other_username,
        follows.follower_id AS other_id,
        follows.type AS relation,
        follows.date AS date
      FROM follows
      INNER JOIN users
      ON users.id = follows.follower_id
      WHERE follows.following_id = {$this->id} AND NOT users.id = {$this->id}

      UNION
      
      SELECT 
        users.id AS post_id,
        users.username AS post_title,
        likes.user_id AS owner_id,
        users.image AS other_image,
        users.username AS other_username,
        likes.post_id AS other_id,
        likes.type AS relation,
        likes.date AS date
      FROM likes
      INNER JOIN users
      ON users.id = likes.user_id
      INNER JOIN posts
      ON posts.id = likes.post_id
      WHERE posts.user_id = {$this->id} AND NOT users.id = {$this->id}

      ORDER BY date DESC;"
    );

    $activities = [];

    if($result->num_rows > 0) {
      while($activity = mysqli_fetch_assoc($result)) {
        if ($activity['relation'] == 'follow') {
          $activity['post_id'] = null;
          $activity['post_title'] = null;
        }
        $activities[] = $activity;
      }
    }

    return $activities;
  }

  public function getFollowers() {
    global $conn;

    $result = mysqli_query(
      $conn, 
      "SELECT
        follower_id
      FROM follows 
      WHERE following_id = '{$this->id}';"
    );

    $followers = [];

    if($result->num_rows > 0) {
      while($follower = mysqli_fetch_assoc($result)) $followers[] = $follower['follower_id'];
    }

    return $followers;
  }

  public function getFollowing() {
    global $conn;

    $result = mysqli_query(
      $conn, 
      "SELECT
        following_id
      FROM follows 
      WHERE follower_id = '{$this->id}';"
    );

    $followings = [];

    if($result->num_rows > 0) {
      while($following = mysqli_fetch_assoc($result)) $followings[] = $following['following_id'];
    }

    return $followings;
  }

  public function getFollowingUser() {
    global $conn;

    $result = mysqli_query(
      $conn, 
      "SELECT
        users.username,
        users.image,
        province_id,
        province_name,
        city_id,
        city_name
      FROM follows
      INNER JOIN users
      ON follows.following_id = users.id
      WHERE follower_id = '{$this->id}';"
    );

    $followings = [];

    if($result->num_rows > 0) {
      while($following = mysqli_fetch_assoc($result)) $followings[] = $following;
    }

    return $followings;
  }

  public function getFollowersUser() {
    global $conn;

    $result = mysqli_query(
      $conn, 
      "SELECT
        users.username,
        users.image,
        province_id,
        province_name,
        city_id,
        city_name
      FROM follows
      INNER JOIN users
      ON follows.follower_id = users.id
      WHERE following_id = '{$this->id}';"
    );

    $followers = [];

    if($result->num_rows > 0) {
      while($follower = mysqli_fetch_assoc($result)) $followers[] = $follower;
    }

    return $followers;
  }

  public function getBookmarkedPosts() {
    global $conn;

    $result = mysqli_query(
      $conn, 
      "SELECT
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
       WHERE posts.user_id = '{$this->id}';"
    );

    $bookmarkeds = [];

    if($result->num_rows > 0) {
      while($bookmarked = mysqli_fetch_assoc($result)) $bookmarkeds[] = $bookmarked;
    }

    return $bookmarkeds;
  }

  public function followUser(int $id) {
    global $conn;

    if($this->id === $id) throw new Exception('Pengguna tidak dapat mengikuti dirinya sendiri.', 428);

    $result = mysqli_query($conn,
    "INSERT INTO follows (
      following_id,
      follower_id
    ) values (
      '{$id}', 
      '{$this->id}'
    );");

    return $result;
  }

  public function unFollowUser(int $id) {
    global $conn;

    if($this->id === $id) throw new Exception('Pengguna tidak dapat mengikuti dirinya sendiri.', 428);

    $result = mysqli_query($conn,
    "DELETE FROM follows 
    WHERE following_id = {$id}
    AND follower_id = {$this->id};");

    return $result;
  }

  public function likePost(int $postId) {
    global $conn;

    $result = mysqli_query($conn,
    "INSERT INTO likes (
      post_id,
      user_id
    ) values (
      {$postId}, 
      {$this->id}
    );");

    return $result;
  }

  public function dislikePost(int $postId) {
    global $conn;

    $result = mysqli_query($conn, 
    "DELETE FROM likes 
    WHERE post_id = {$postId}
    AND user_id = {$this->id};");

    return $result;
  }

  public function dislikeAllPost() {
    global $conn;

    $result = mysqli_query($conn, 
    "DELETE FROM likes 
    WHERE user_id = {$this->id};");

    return $result;
  }

  public function bookmarkPost(int $postId) {
    global $conn;

    $result = mysqli_query($conn,
    "INSERT INTO bookmark_posts (
      post_id,
      user_id
    ) values (
      {$postId}, 
      {$this->id}
    );");

    return $result;
  }

  public function unbookmarkPost(int $postId) {
    global $conn;

    $result = mysqli_query($conn, 
    "DELETE FROM bookmark_posts 
    WHERE post_id = {$postId}
    AND user_id = {$this->id};");

    return $result;
  }

  public function unbookmarkAllPost() {
    global $conn;

    $result = mysqli_query($conn, 
    "DELETE FROM bookmark_posts 
    WHERE user_id = {$this->id};");

    return $result;
  }

  public function commentPost(string $comment, int $postId) {
    global $conn;

    $comment = htmlspecialchars($comment);
    $comment = stripslashes($comment);

    $result = mysqli_query($conn,
    "INSERT INTO comments (
      post_id,
      user_id,
      body
    ) values (
      {$postId}, 
      {$this->id},
      '{$comment}'
    );");

    if (!$result) throw new Exception(mysqli_error($conn));

    return $result;
  }

  public function deleteAllComment() {
    global $conn;

    $result = mysqli_query($conn, 
      "DELETE FROM comments 
      WHERE user_id = '{$this->getId()}';"
    );
    
    if (!$result) throw new Exception(mysqli_error($conn));

    return $result;
  }

  public function deleteComment(int $commentId) {
    global $conn;

    $result = mysqli_query($conn, 
      "DELETE FROM comments 
      WHERE id = {$commentId};"
    );
    
    if (!$result) throw new Exception(mysqli_error($conn));

    return $result;
  }

  public function updateUser($data) {
    global $conn;

    $username = htmlspecialchars($data['username']);
    $username = stripslashes($username);
    $username = strtolower($username);

    $display_name = htmlspecialchars($data['display_name']);
    $display_name = stripslashes($display_name);

    $biodata = htmlspecialchars($data['biodata']);
    $biodata = stripslashes($biodata);

    $email = htmlspecialchars($data['email']);
    $email = stripslashes($email);
    $email = strtolower($email);

    $user = mysqli_query(
      $conn, 
      "UPDATE users 
      SET
        username = '{$username}',
        display_name = '{$display_name}', 
        biodata = '{$biodata}',
        email = '{$email}',
        phone_number = '{$data['phone_number']}',
        province_id = '{$data['province_id']}',
        province_name = '{$data['province_name']}',
        city_id = '{$data['city_id']}',
        city_name = '{$data['city_name']}'
      WHERE id = {$this->id};"
    );

    if ($user) {
      $this->identifier = $username;
      return $this->getUser();
    }

    return false;
  }

  public function updateImage(string $imageName) {
    global $conn;

    $user = mysqli_query(
      $conn, 
      "UPDATE users 
      SET
        image = '{$imageName}'
      WHERE id = {$this->id};"
    );

    if ($user) {
      return $this->getUser();
    }

    return false;
  }

  public function changePassword(string $oldPassword, string $newPassword) {
    if ($this->verifyPassword($oldPassword)) {
      $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);

      global $conn;
      $user = mysqli_query(
        $conn,
        "UPDATE users 
        SET
          password = '{$hashedPassword}'
        WHERE id = {$this->id};"
      );

      if($user) {
        return true;
      }

      return false; 
    }

    throw new Exception('Password lama tidak cocok.', 401);
  }

  public function createRecoveryToken() {
    global $conn;

    if ($this->id == null) {
      throw new Exception('Email tidak terdaftar.', 404);
    }

    $token = uniqid();

    $result = mysqli_query($conn,
    "INSERT INTO recovery_tokens (
      token,
      user_id
    ) values (
      '{$token}', 
      '{$this->id}'
    );");

    if (!$result) throw new Exception(mysqli_error($conn));

    return $token;
  }

  public function deleteRecoveryToken() {
    global $conn;

    $result = mysqli_query($conn, 
      "DELETE FROM recovery_tokens 
      WHERE user_id = '{$this->id}';"
    );
    
    if (!$result) throw new Exception(mysqli_error($conn));

    return $result;
  }

  public function recoveryPassword(string $newPassword) {
    $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);

    global $conn;
    $user = mysqli_query(
      $conn,
      "UPDATE users 
      SET
        password = '{$hashedPassword}'
      WHERE id = {$this->id};"
    );

    if($user) {
      return true;
    }

    return false; 
  }
 }
?>