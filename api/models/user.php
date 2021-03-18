<?php 
 class User {
  private $identifier;
  private int $id;

  public function __construct($identifier) {
    $this->identifier = $identifier;

    // Check if user exist, add id into property
    $id = $this->getId();
    if($id) $this->id = (int) $id;
  }

  public static function registerUser($data) {
    global $conn;

    $username = htmlspecialchars($data['username']);
    $username = stripslashes($data['username']);
    $username = strtolower($username);
    $hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT);

    $result = mysqli_query($conn,
    "INSERT INTO users (
      username,
      password,
      display_name, 
      biodata, 
      email, 
      phone_number
    ) values (
      '{$username}', 
      '{$hashedPassword}', 
      '{$data['display_name']}',  
      '{$data['biodata']}',
      '{$data['email']}', 
      '{$data['phone_number']}'
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

  public static function searchUser(string $keyword) {
    global $conn;

    $result = mysqli_query(
      $conn, 
      "SELECT
        username,
        display_name,
        image
      FROM users
      WHERE username LIKE '%{$keyword}%'
      OR display_name LIKE '%{$keyword}%'
      OR email LIKE '%{$keyword}%';"
    );

    $userFounds = [];

    if($result->num_rows > 0) {
      while($userFound = mysqli_fetch_assoc($result)) $userFounds[] = $userFound;
    }

    return $userFounds;
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
        phone_number 
      FROM users 
      WHERE username = '{$this->identifier}' 
      OR email = '{$this->identifier}';"
    );

    $user = mysqli_fetch_assoc($result);

    if ($user) {
      $user['followers'] = $this->getFollowers();
      $user['following'] = $this->getFollowing();
      return $user;
    }

    return false;
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
        users.image
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
        users.image
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

  public function followUser(int $id) {
    global $conn;

    if($this->id === $id) throw new Exception('Users can\'t follow his own account.', 428);

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

    if($this->id === $id) throw new Exception('sers can\'t unfollow his own account.', 428);

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

  public function commentPost(string $comment, int $postId) {
    global $conn;

    $comment =  htmlspecialchars($comment);
    $comment =  stripslashes($comment);

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

    $username = stripslashes($data['username']);
    $username = strtolower($username);

    $user = mysqli_query(
      $conn, 
      "UPDATE users 
      SET
        username = '{$username}',
        display_name = '{$data['display_name']}', 
        biodata = '{$data['biodata']}',
        email = '{$data['email']}',
        phone_number = '{$data['phone_number']}'
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

    throw new Exception('Current password incorrect.', 401);
  }
 }
?>