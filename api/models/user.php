<?php 
 class User {
  private $identifier;
  private $id;

  public function __construct($identifier) {
    $this->identifier = $identifier;

    // Check if user exist, add id into property
    $data = $this->getUser();
    if($data) $this->id = $data['id'];
  }

  public static function registerUser($data) {
    global $conn;

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
        email, 
      FROM users 
      WHERE username = '{$id}':"
    );

    $user = mysqli_fetch_assoc($result);

    if ($user) {
      return $user;
    }

    return false;
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
      $followers = mysqli_fetch_assoc($result);

      while($follower = mysqli_fetch_assoc($result)) $followers[] = $follower;
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
      $followings = mysqli_fetch_assoc($result);

      while($following = mysqli_fetch_assoc($result)) $followings[] = $following;
    }

    return $followings;
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
  }
 }
?>