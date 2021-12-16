<?php
  require_once '../helpers/utils/import-helper.php';
  session_start();

  if(!isset($_SESSION['username'])) header('location: ./index.php');

  $pageTitle = 'Daftar Pekerjaan';

  try {
    $jobs = Job::getJobs();
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

                    <!-- DataTales Example -->
                    <div class="card shadow mt-3 mb-4">
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                    <thead>
                                        <tr>
                                            <th>Id</th>                                            
                                            <th>Pengunggah</th>
                                            <th>Judul Pekerjaan</th>
                                            <th>Provinsi</th>
                                            <th>Kabupaten/Kota</th>                                            
                                            <th>Tipe Pekerjaan</th>                                            
                                            <th>Link Form</th>
                                            <th>Aksi</th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        <tr>
                                            <th>Id</th>                                            
                                            <th>Pengunggah</th>
                                            <th>Judul Pekerjaan</th>
                                            <th>Provinsi</th>
                                            <th>Kabupaten/Kota</th>                                            
                                            <th>Tipe Pekerjaan</th>                                            <th>Link Form</th>
                                            <th>Aksi</th>
                                        </tr>
                                    </tfoot>
                                    <tbody>
                                        <?php if(isset($jobs) && count($jobs) > 0) :?>
                                            <?php foreach ($jobs as $job) : ?>
                                                <tr>
                                                    <td><?= $job['id'] ?></td>
                                                    <td><?= $job['username'] ?></td>
                                                    <td><?= $job['title'] ?></td>
                                                    <td>
                                                        <?= $job['province_name'] ?>
                                                    </td>
                                                    <td><?= $job['city_name'] ?></td>
                                                    <td><?= $job['work_type'] ?></td>
                                                    <td>
                                                        <a href="<?= $job['form_link'] ?>" target="_blank">
                                                            <?= $job['form_link'] ?>
                                                        </a>
                                                    </td>
                                                    <td>
                                                        <form method="POST" class="form-delete d-flex">
                                                            <a 
                                                                href="../#/job/<?= $job['id'] ?>" 
                                                                class="btn btn-info" 
                                                                target="_blank"
                                                                data-toggle="tooltip"
                                                                data-placement="bottom" 
                                                                title="Detail"
                                                            >
                                                                <i class="fas fa-info-circle"></i>
                                                            </a>

                                                            <input type="hidden" name="job-id" value="<?= $job['id'] ?>">

                                                            <button 
                                                                type="submit" 
                                                                class="btn btn-danger ml-3"
                                                                data-toggle="tooltip"
                                                                data-placement="bottom" 
                                                                title="Hapus"
                                                            >
                                                                <i class="fas fa-trash-alt"></i>
                                                            </button>
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
        $(function () {
            $('[data-toggle="tooltip"]').tooltip()
        });
        
        const forms = document.querySelectorAll('form.form-delete');
        forms.forEach(function(form) {
            form.addEventListener('submit', function(event) {
                event.stopPropagation();
                event.preventDefault();

                Swal.fire({
                    title: 'Apakah anda yakin?',
                    text: "Pekerjaan yang dihapus tidak akan bisa dikembalikan.",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Iya, hapus pekerjaan!',
                    cancelButtonText: 'Batal'
                }).then((result) => {
                    if (!result.isConfirmed) return;

                    fetch('./delete-job.php', {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            id: event.target.querySelector('[name=job-id]').value,
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