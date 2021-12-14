<?php
  class Admin {
    private $username;
    private $id;

    public function __construct($username) {
      $this->username = $username;

      $id = $this->getId();
      if($id) $this->id = (int) $id;
    }

    public static function getAdmins() {
      global $conn;
  
      $result = mysqli_query(
        $conn, 
        "SELECT *
        FROM admin;"
      );
  
      if(!$result) throw new Exception(mysqli_error($conn));
  
      $adminFounds = [];
  
      if($result->num_rows > 0) {
        while($adminFound = mysqli_fetch_assoc($result)) $adminFounds[] = $adminFound;
      }
  
      return $adminFounds;
    }

    public static function getUsers() {
      global $conn;
  
      $result = mysqli_query(
        $conn, 
        "SELECT *
        FROM users;"
      );
  
      if(!$result) throw new Exception(mysqli_error($conn));
  
      $users = [];
  
      if($result->num_rows > 0) {
        while($userData = mysqli_fetch_assoc($result)) {
          $user = new User($userData['username']);
          $users[] = $user->getUser();
        }
      }
  
      return $users;
    }

    public static function getPost() {
      global $conn;
  
      $result = mysqli_query(
        $conn, 
        "SELECT *
        FROM posts;"
      );
  
      if(!$result) throw new Exception(mysqli_error($conn));
  
      $posts = [];
  
      if($result->num_rows > 0) {
        while($postData = mysqli_fetch_assoc($result)) {
          $post = new Post($postData['id']);
          $posts[] = $post->getPost();
        }
      }
  
      return $posts;
    }

    public static function newAdmin($data) {
      $username = $data['username'];
      $username = strtolower($username);
      $username = htmlspecialchars($username);
      $username = stripslashes($username);
  
      $hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT);
  
      global $conn;
  
      $result = mysqli_query($conn,
      "INSERT INTO users (
        username,
        password
      ) values (
        '{$username}', 
        '{$hashedPassword}'
      );");
  
      if(!$result) throw new Exception(mysqli_error($conn));
  
      return $result;
    }

    public static function deleteAdmin($id) {
      global $conn;
  
      $result = mysqli_query($conn,
        "DELETE FROM admins 
        WHERE id = {$id};"
      );
  
      if(!$result) throw new Exception(mysqli_error($conn));
  
      return $result;
    }

    public static function deleteUser($username) {
      global $conn;
      
      $user = new User($username);

      $user->unbookmarkAllPost();
      $user->deleteAllComment();
      $user->dislikeAllPost();
      Admin::removeFollowUser($user->getId());
      Job::deleteJobFromUser($user->getId());
      Post::deletePostFromUser($user->getId());
      Token::deleteTokenFromUser($user->getId());

      $result = mysqli_query($conn,
        "DELETE FROM users 
        WHERE id = '{$user->getId()}';"
      );
  
      if(!$result) throw new Exception(mysqli_error($conn));
  
      return $result;
    }

    public static function removeFollowUser(int $user_id) {
      global $conn;
  
      $result = mysqli_query($conn,
        "DELETE FROM follows 
        WHERE following_id = '{$user_id}' OR follower_id = '{$user_id}';"
      );
  
      if(!$result) throw new Exception(mysqli_error($conn));
  
      return $result;
    }

    public function getId() {
      global $conn;
  
      $result = mysqli_query(
        $conn, 
        "SELECT
          id
        FROM admins 
        WHERE username = '{$this->username}';"
      );
  
      if(!$result) throw new Exception(mysqli_error($conn));
  
      $data = mysqli_fetch_assoc($result);
  
      if($data === null) $data['id'] = null;
      return $data['id'];
    }

    public function getAdmin() {
      global $conn;
  
      $result = mysqli_query(
        $conn, 
        "SELECT *
        FROM admins 
        WHERE username = '{$this->username}';"
      );
  
      if(!$result) throw new Exception(mysqli_error($conn));
  
      $data = mysqli_fetch_assoc($result);
  
      return $data;
    }
  
    public function updateAdmin($data) {
      // $username = htmlspecialchars($data['username']);
      // $username = stripslashes($username);
      // $username = strtolower($username);
      $username = 'admin';
  
      if(isset($data['password']) && $data['password']) {
        $password = password_hash($data['password'], PASSWORD_DEFAULT);
      }
  
      $query = "UPDATE admins 
      SET
        username = '{$username}'";

      if(isset($password)) $query .= ", password = '{$password}'";
  
      $query.="WHERE id = {$this->id};";
  
      global $conn;
      $user = mysqli_query($conn, $query);
  
      if ($user) {
        $this->identifier = $username;
        return $this->getAdmin();
      }
  
      return false;
    }
  
    public function verifyPassword(string $password) {
      global $conn;
  
      $result = mysqli_query(
        $conn, 
        "SELECT 
        password
        FROM admins 
        WHERE username = '{$this->username}';"
      );
  
      
      if(!$result) throw new Exception(mysqli_error($conn));
  
      $data = mysqli_fetch_assoc($result);
  
      if(!$data) throw new Exception('Pengguna atau Kata Sandi salah', 404);
      return password_verify($password, $data["password"]);
    }
  }
?>