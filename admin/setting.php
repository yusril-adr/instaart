<?php
  require_once '../helpers/utils/import-helper.php';
  session_start();

  if(!isset($_SESSION['username'])) header('location: ./index.php');

  $pageTitle = 'Pengaturan';

  try {
    $admin = new Admin($_SESSION['username']);

    if (isset($_POST['save'])) {
        if ($_POST['new-password'] !== $_POST['new-password-confirm']) {
            throw new Exception('Password baru tidak cocok.');
        }

        // if ($_POST['old-password'] !== $_POST['old-password-confirm']) {
        //     throw new Exception('Password lama tidak cocok.');
        // }

        if (!password_verify($_POST['current-password'], $admin->getAdmin()['password'])) {
            throw new Exception('Password lama salah.');
        }

        // $data['username'] = $_POST['username'];
        $data['password'] = $_POST['new-password'];
        $admin->updateAdmin($data);

        $admin = new Admin($_SESSION['username']);

        // $_SESSION['username'] = $admin->getAdmin()['username'];
        $_SESSION['id'] = $admin->getAdmin()['id'];

        $alertMessage = 'Akun berhasil diperbarui';
    }

  } catch (Exception $error) {
    $error = $error;
  }
?>

<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="shortcut icon" href="../public/images/logo.png" type="image/png">

    <title>InstaArt Admin | <?= $pageTitle ?></title>

    <!-- Custom fonts for this template -->
    <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
    <link
        href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
        rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="css/sb-admin-2.min.css" rel="stylesheet">

    <!-- Custom global styles -->
    <link href="css/style.css" rel="stylesheet">

    <!-- Custom styles for this page -->
    <link href="vendor/datatables/dataTables.bootstrap4.min.css" rel="stylesheet">

</head>

<body id="page-top">

    <!-- Page Wrapper -->
    <div id="wrapper">

        <!-- Sidebar -->
        <?php include_once './partials/aside.php' ?>
        <!-- End of Sidebar -->

        <!-- Content Wrapper -->
        <div id="content-wrapper" class="d-flex flex-column">

            <!-- Main Content -->
            <div id="content">

                <!-- Topbar -->
                <?php include_once './partials/top-nav.php' ?>  
                <!-- End of Topbar -->

                <!-- Begin Page Content -->
                <div class="container-fluid">

                    <!-- Page Heading -->
                    <h1 class="h3 mb-2 text-center text-gray-800"><?= $pageTitle ?></h1>

                    <div class="row mt-3 mb-4">
                        <div class="card shadow col-12 col-md-6 offset-md-3">
                            <div class="card-body">
                                <form method="post">
                                    <!-- <div class="form-group">
                                        <label for="username">Username</label>

                                        <div class="input-group">
                                            <input type="text" placeholder="Username" class="form-control" id="username" name="username"  autocomplete="off" required value="<?= $admin->getAdmin()['username'] ?>">
                                        </div>
                                    </div> -->

                                    <div class="form-group">
                                        <label for="new-password">Kata Sandi Baru</label>

                                        <div class="input-group">
                                            <input type="password" placeholder="Kata Sandi Baru" class="form-control" id="new-password" name="new-password"  autocomplete="off" minlength="8" required>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label for="new-password-confirm">Konfirmasi Kata Sandi Baru</label>

                                        <div class="input-group">
                                            <input type="password" placeholder="Konfirmasi Kata Sandi Baru" class="form-control" id="new-password-confirm" name="new-password-confirm"  autocomplete="off" minlength="8" required>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label for="current-password">Kata Sandi Lama</label>

                                        <div class="input-group">
                                            <input type="password" placeholder="Kata Sandi Lama" class="form-control" id="current-password" name="current-password" autocomplete="off" minlength="8" required>
                                        </div>
                                    </div>

                                    <!-- <div class="form-group">
                                        <label for="old-password-confirm">Konfirmasi Password Lama</label>

                                        <div class="input-group">
                                            <input type="password" placeholder="Konfirmasi Password Lama" class="form-control" id="old-password-confirm" name="old-password-confirm"  autocomplete="off" minlength="8" required>
                                        </div>
                                    </div> -->
        
                                    <button type="submit" class="btn btn-primary d-block mx-auto" name="save">Simpan</button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
                <!-- /.container-fluid -->

            </div>
            <!-- End of Main Content -->

            <!-- Footer -->
            <?php include_once './partials/footer.php' ?> 
            <!-- End of Footer -->

        </div>
        <!-- End of Content Wrapper -->

    </div>
    <!-- End of Page Wrapper -->

    <!-- Scroll to Top Button-->
    <a class="scroll-to-top rounded" href="#page-top">
        <i class="fas fa-angle-up"></i>
    </a>

    <!-- Bootstrap core JavaScript-->
    <script src="vendor/jquery/jquery.min.js"></script>
    <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

    <!-- Core plugin JavaScript-->
    <script src="vendor/jquery-easing/jquery.easing.min.js"></script>
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <!-- Custom scripts for all pages-->
    <script src="js/sb-admin-2.min.js"></script>

    <!-- Page level plugins -->
    <script src="vendor/datatables/jquery.dataTables.min.js"></script>
    <script src="vendor/datatables/dataTables.bootstrap4.min.js"></script>

    <!-- Page level custom scripts -->
    <script src="js/demo/datatables-demo.js"></script>

    <?php if(isset($error)) :?>
        <script> Swal.fire('Oopss ...', "<?= $error->getMessage() ?>", 'error'); </script>
    <?php endif; ?>

    <?php if(isset($alertMessage)) :?>
        <script> Swal.fire('Sukses', "<?= $alertMessage ?>", 'success'); </script>
    <?php endif; ?>

</body>

</html>