<?php
  require_once '../helpers/utils/import-helper.php';
  session_start();

  if(!isset($_SESSION['username'])) header('location: ./index.php');

  $pageTitle = 'Daftar Pekerjaan yang Dilaporkan';

  try {
    $reports = Report::getReports('job');
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
                                            <th>Status</th>
                                            <th>Aksi</th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        <tr>
                                            <th>Id</th>                                            
                                            <th>Pengunggah</th>
                                            <th>Judul Pekerjaan</th>
                                            <th>Status</th>
                                            <th>Aksi</th>
                                        </tr>
                                    </tfoot>
                                    <tbody>
                                        <?php if(isset($reports) && count($reports) > 0) :?>
                                            <?php foreach ($reports as $report) : ?>
                                                <tr>
                                                    <td><?= $report['id'] ?></td>
                                                    <td><?= $report['username'] ?></td>
                                                    <td><a href="../#/job/<?= $report['id'] ?>"><?= $report['title'] ?></a></td>
                                                    <td>
                                                        <?= $report['status'] == 'false' ? 'Belum ditanggulangi': 'Sudah ditanggulangi' ?>
                                                    </td>
                                                    <td>
                                                        <form method="POST" class="form-delete d-flex">
                                                            <button
                                                                type="button"
                                                                data-toggle="modal"
                                                                data-target="#modaldetail-<?= $report['id'] ?>"
                                                                style="outline:none; border: none; margin: 0; padding: 0;"
                                                            >
                                                                <a 
                                                                    class="btn btn-info" 
                                                                    data-toggle="tooltip"
                                                                    data-placement="bottom" 
                                                                    title="Detail"
                                                                >
                                                                    <i class="fas fa-info-circle"></i>
                                                                </a>
                                                            </button>

                                                            <input type="hidden" name="job-id" value="<?= $report['id'] ?>">

                                                            <!-- <button 
                                                                type="submit" 
                                                                class="btn btn-danger ml-3"
                                                                data-toggle="tooltip"
                                                                data-placement="bottom" 
                                                                title="Hapus"
                                                            >
                                                                <i class="fas fa-trash-alt"></i>
                                                            </button> -->

                                                            <?php if ($report['status'] == 'false') : ?>
                                                                <button 
                                                                    type="button" 
                                                                    class="btn btn-success ml-3 btn-status-to-completed"
                                                                    reportId=<?= $report['id'] ?>
                                                                    data-toggle="tooltip"
                                                                    data-placement="bottom" 
                                                                    title="Sudah ditanggulangi"
                                                                >
                                                                    <i class="fas fa-check-circle"></i>
                                                                </button>
                                                            <?php else : ?>
                                                                <button 
                                                                    type="button" 
                                                                    class="btn btn-warning ml-3 btn-status-to-uncompleted"
                                                                    reportId=<?= $report['id'] ?>
                                                                    data-toggle="tooltip"
                                                                    data-placement="bottom" 
                                                                    title="Belum ditanggulangi"
                                                                >
                                                                    <i class="fas fa-times-circle"></i>
                                                                </button>
                                                            <?php endif; ?>
                                                        </form>

                                                        <!-- Modal -->
                                                        <div class="modal fade" id="modaldetail-<?= $report['id'] ?>" tabindex="-1" aria-labelledby="modaldetail-<?= $report['id'] ?>Label" aria-hidden="true">
                                                            <div class="modal-dialog">
                                                                <div class="modal-content">
                                                                    <div class="modal-header">
                                                                        <h5 class="modal-title" id="modaldetail-<?= $report['id'] ?>Label"><?= $report['title'] ?></h5>
                                                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                        <span aria-hidden="true">&times;</span>
                                                                        </button>
                                                                    </div>
                                                                    <div class="modal-body">
                                                                        <div class="d-flex flex-column justify-content-center">
                                                                            <p>
                                                                                <?= $report['reason'] ?>
                                                                            </p>

                                                                            <img src="../public/images/reports/<?= $report['reason_image'] ?>" alt="Report">
                                                                        </div>
                                                                    </div>
                                                                    <div class="modal-footer">
                                                                        <button type="button" class="btn btn-primary" data-dismiss="modal">Tutup</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
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

        const completeBtns = document.querySelectorAll('button.btn-status-to-completed');
        completeBtns.forEach(function(completeBtn) {
            completeBtn.addEventListener('click', function(event) {
                event.stopPropagation();
                event.preventDefault();

                Swal.fire({
                    title: 'Rubah status manjadi sudah ditanggulangi?',
                    text: "Pastikan pekerjaan sudah benar-benar ditanggulangi.",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Iya!',
                    cancelButtonText: 'Batal'
                }).then((result) => {
                    if (!result.isConfirmed) return;

                    fetch('./toggle-report.php', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            id: completeBtn.getAttribute('reportId'),
                            status: 'true',
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

        const uncompleteBtns = document.querySelectorAll('button.btn-status-to-uncompleted');
        uncompleteBtns.forEach(function(uncompleteBtn) {
            uncompleteBtn.addEventListener('click', function(event) {
                event.stopPropagation();
                event.preventDefault();

                Swal.fire({
                    title: 'Rubah status manjadi belum ditanggulangi?',
                    // text: "Laporan pekerjaan sudah benar-benar ditanggulangi.",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Iya!',
                    cancelButtonText: 'Batal'
                }).then((result) => {
                    if (!result.isConfirmed) return;

                    fetch('./toggle-report.php', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            id: uncompleteBtn.getAttribute('reportId'),
                            status: 'false',
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
        })
        
        // const forms = document.querySelectorAll('form.form-delete');
        // forms.forEach(function(form) {
        //     form.addEventListener('submit', function(event) {
        //         event.stopPropagation();
        //         event.preventDefault();

        //         Swal.fire({
        //             title: 'Apakah anda yakin?',
        //             text: "Laporan yang dihapus tidak akan bisa dikembalikan.",
        //             icon: 'warning',
        //             showCancelButton: true,
        //             confirmButtonColor: '#3085d6',
        //             cancelButtonColor: '#d33',
        //             confirmButtonText: 'Iya, hapus laporan!',
        //             cancelButtonText: 'Batal'
        //         }).then((result) => {
        //             if (!result.isConfirmed) return;

        //             fetch('./delete-report.php', {
        //                 method: 'DELETE',
        //                 headers: {
        //                     'Content-Type': 'application/json',
        //                 },
        //                 body: JSON.stringify({
        //                     id: event.target.querySelector('[name=job-id]').value,
        //                 }),
        //             }).then(function(response) {
        //                 return response.json(); 
        //             }).then(function(json) {
        //                 if(json.status !== 'success') throw new Error(json.message);
        //                 Swal.fire('Sukses', json.message, 'success')
        //                 .then(function() { location.reload(); });
        //             }).catch(function(error) {
        //                 Swal.fire('Oopss ...', error.message, 'error');
        //             });
        //         });
        //     });
        // });
    </script>

</body>

</html>