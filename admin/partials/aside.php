<?php
  $url = getPathUrl();
?>

<ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

    <!-- Sidebar - Brand -->
    <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.php">
        <img src="../public/images/logo.png" alt="logo" width="40px" height="40px">

        <div class="sidebar-brand-text mx-3 text-capitalize">
            <span class="font-redressed font-weight-bold">InstaArt</span>
        </div>
    </a>

    <!-- Divider -->
    <hr class="sidebar-divider">

    <!-- Heading -->
    <div class="sidebar-heading">
        Aplikasi
    </div>

    <!-- Nav Item - Users -->
    <li class="nav-item <?= startsWith($url, 'users')? 'active': '' ?>">
        <a class="nav-link" href="users.php">
            <i class="fas fa-fw fa-user"></i>
            <span>Pengguna</span>
        </a>
    </li>

    <!-- Nav Item - Posts -->
    <li class="nav-item <?= startsWith($url, 'posts')? 'active': '' ?>">
        <a class="nav-link" href="posts.php">
            <i class="fas fa-fw fa-palette"></i>
            <span>Desain</span>
        </a>
    </li>

    <!-- Nav Item - Jobs -->
    <li class="nav-item <?= startsWith($url, 'jobs')? 'active': '' ?>">
        <a class="nav-link" href="jobs.php">
            <i class="fas fa-fw fa-briefcase"></i>
            <span>Pekerjaan</span>
        </a>
    </li>

    <!-- Divider -->
    <hr class="sidebar-divider">

    <!-- Heading -->
    <div class="sidebar-heading">
        Admin
    </div>

    <!-- Nav Item - Categories -->
    <li class="nav-item <?= startsWith($url, 'categories')? 'active': '' ?>">
        <a class="nav-link" href="categories.php">
            <i class="fas fa-fw fa-th-large"></i>
            <span>Kategori</span>
        </a>
    </li>

    <!-- Nav Item - Colors -->
    <li class="nav-item <?= startsWith($url, 'colors')? 'active': '' ?>">
        <a class="nav-link" href="colors.php">
            <i class="fas fa-fw fa-eye-dropper"></i>
            <span>Warna</span>
        </a>
    </li>

    <!-- Nav Item - Report Job -->
    <!-- <li class="nav-item <?= startsWith($url, 'report-jobs')? 'active': '' ?>">
        <a class="nav-link" href="report-jobs.php">
            <i class="fas fa-exclamation-triangle"></i>
            <span>Pekerjaan yang dilaporkan</span>
        </a>
    </li> -->

    <!-- Nav Item - Setting -->
    <li class="nav-item <?= startsWith($url, 'setting')? 'active': '' ?>">
        <a class="nav-link" href="setting.php">
            <i class="fas fa-fw fa-cog"></i>
            <span>Pengaturan</span>
        </a>
    </li>

    <!-- Divider -->
    <hr class="sidebar-divider d-none d-md-block">

    <!-- Sidebar Toggler (Sidebar) -->
    <div class="text-center d-none d-md-inline">
        <button class="rounded-circle border-0" id="sidebarToggle"></button>
    </div>

</ul>