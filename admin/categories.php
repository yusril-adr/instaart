<?php
  require_once '../helpers/utils/import-helper.php';
  session_start();

  if(!isset($_SESSION['username'])) header('location: ./index.php');

  $pageTitle = 'Daftar Kategori';

  try {
    if (isset($_POST['new-category'])) {
        Categories::newCategory($_POST['name']);
    }

    if (isset($_POST['edit-category'])) {
        Categories::updateCategory((int) $_POST['category-id'], $_POST['name']);
    }

    $categories = Categories::getCategories();
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

                    <div class="d-flex justify-content-center mt-4 mb-4">
                        <button class="btn btn-primary d-flex align-items-center" data-toggle="modal" data-target="#new-category-modal">
                           <i class="fas fa-plus mr-2"></i> Tambah
                        </button>
                    </div>

                    <!-- DataTales Example -->
                    <div class="card shadow mt-3 mb-4">
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                    <thead>
                                        <tr>
                                            <th>Nama</th>
                                            <th>Aksi</th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        <tr>
                                            <th>Nama</th>
                                            <th>Aksi</th>
                                        </tr>
                                    </tfoot>
                                    <tbody>
                                        <?php if(isset($categories) && count($categories) > 0) :?>
                                            <?php foreach ($categories as $category) : ?>
                                                <tr>
                                                    <td><?= $category['name'] ?></td>
                                                    <td>
                                                        <form method="POST" class="form-delete d-flex">
                                                            <button 
                                                                type="button"
                                                                class="btn btn-warning mr-3" 
                                                                data-toggle="modal" 
                                                                data-target="#edit-category-<?= $category['id'] ?>"
                                                            >
                                                                Edit
                                                            </button>

                                                            <input type="hidden" name="category-id" value="<?= $category['id'] ?>">

                                                            <button type="submit" class="btn btn-danger">Hapus</button>
                                                        </form>

                                                        <!-- Edit Category Modal -->
                                                        <form method="POST" class="modal fade" id="edit-category-<?= $category['id'] ?>" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                            <div class="modal-dialog">
                                                                <div class="modal-content">
                                                                    <div class="modal-header">
                                                                        <h5 class="modal-title" id="exampleModalLabel">Edit</h5>
                                                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                            <span aria-hidden="true">&times;</span>
                                                                        </button>
                                                                    </div>
                                                                    <div class="modal-body">
                                                                        <div class="form-group">
                                                                            <label for="edit-category-name-<?= $category['id'] ?>">Nama Kategori</label>

                                                                            <input type="hidden" name="category-id" value="<?= $category['id'] ?>">

                                                                            <div class="input-group">
                                                                                <input 
                                                                                    type="text"
                                                                                    placeholder="Nama kategori baru"
                                                                                    class="form-control"
                                                                                    id="edit-category-name-<?= $category['id'] ?>"
                                                                                    name="name"
                                                                                    autocomplete="off"
                                                                                    value="<?= $category['name'] ?>"
                                                                                    required
                                                                                >
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="modal-footer">
                                                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Batal</button>
                                                                        <button type="submit" class="btn btn-primary" name="edit-category">Simpan</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </td>
                                                </tr>
                                            <?php endforeach; ?>
                                        <?php endif; ?>
                                    </tbody>
                                </table>
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

    <!-- New Category Modal -->
    <form method="POST" class="modal fade" id="new-category-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Kategori Baru</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="new-category-name">Nama Kategori</label>

                        <div class="input-group">
                            <input type="text" placeholder="Nama kategori baru" class="form-control" id="new-category-name" name="name"  autocomplete="off" required>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Batal</button>
                    <button type="submit" class="btn btn-primary" name="new-category">Buat</button>
                </div>
            </div>
        </div>
    </form>

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

    <script>
        const forms = document.querySelectorAll('form.form-delete');
        forms.forEach(function(form) {
            form.addEventListener('submit', function(event) {
                event.stopPropagation();
                event.preventDefault();

                Swal.fire({
                    title: 'Apakah anda yakin?',
                    text: "Kategori yang dihapus tidak dapat dikembalikan lagi.",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Iya, hapus kategori!',
                    cancelButtonText: 'Batal'
                }).then((result) => {
                    if (!result.isConfirmed) return;

                    fetch('./delete-category.php', {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            id: event.target.querySelector('[name=category-id]').value,
                        }),
                    }).then(function(response) {
                        return response.json(); 
                    }).then(function(json) {
                        if(json.status !== 'success') throw new Error(json.message);
                        Swal.fire('Sukses', json.message, 'success')
                        .then(function() { location.reload(); });
                    }).catch(function(error) {
                        Swal.fire('Oopss ...', error.message, 'error');
                    });
                });
            });
        });
    </script>

</body>

</html>