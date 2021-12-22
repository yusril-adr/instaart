import CONFIG from '../../global/config';
import DateHelper from '../../utils/date-helper';

const Templates = {
  optionWithValue(text, value) {
    return `<option value=${value}>${text}</option>`;
  },

  optionWithoutValue(text) {
    return `<option selected value="" disabled>${text}</option>`;
  },

  hidePasswordToggler() {
    return `
      <i class="far fa-eye-slash"></i>
    `;
  },

  showPassswordToggler() {
    return `
      <i class="far fa-eye"></i>
    `;
  },

  likedIcon({ color = 'primary' } = {}) {
    const className = color ? `text-${color}` : '';
    return `
      <i class="fas fa-thumbs-up ${className}"></i>
    `;
  },

  likeIcon() {
    return `
      <i class="far fa-thumbs-up"></i>
    `;
  },

  bookmarkIcon() {
    return '<i class="far fa-bookmark text-lg"></i>';
  },

  bookmarkedIcon() {
    return '<i class="fas fa-bookmark text-lg"></i>';
  },

  loadMoreBtn() {
    return '<button class="btn btn-outline-primary mx-auto">Muat lebih banyak</button>';
  },

  header() {
    return `
      <div class="container">
        <nav class="navbar navbar-expand-lg navbar-dark px-0">
          <a class="navbar-brand" href="#/">
            <img src="${CONFIG.IMAGE_PATH.BASE}/logo.png" width="32" height="32" alt="Logo" class="d-inline-block align-top">
            <span class="font-redressed font-weight-bold ml-2">InstaArt</span>
          </a>

          <ul class="navbar-nav d-none d-lg-flex">
            <li class="nav-item">
              <a class="nav-link text-light" href="#/">Beranda <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-light" href="#/job/">Pekerjaan</a>
            </li>
          </ul>

          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <form class="form-inline ml-auto my-2 my-lg-0" id="navbar-search-form">
              <div class="input-group">
                <input type="text" class="form-control" id="navbar-search-input" placeholder="Cari ..." aria-label="Cari">

                <div class="input-group-append">
                  <button class="btn btn-light" type="submit" aria-label="cari"><i class="fas fa-search"></i></button>
                </div>
              </div>
            </form>

            <a href="#/sign-in/" class="mt-2 mt-lg-0 ml-lg-4 btn btn-link text-decoration-none text-light">Masuk</a>
            <a href="#/sign-up/" class="mt-2 mt-lg-0 ml-lg-4 btn btn-light">Daftar</a>
          </div>
        </nav>
      </div>
    `;
  },

  loginHeader({ username }) {
    return `
      <div class="container">
        <nav class="navbar navbar-expand-xl navbar-dark px-0">
          <a class="navbar-brand" href="#/">
            <img src="${CONFIG.IMAGE_PATH.BASE}/logo.png" width="32" height="32" alt="Logo" class="d-inline-block align-top">
            <span class="font-redressed font-weight-bold ml-2">InstaArt</span>
          </a>

          <ul class="navbar-nav d-none d-lg-flex">
            <li class="nav-item">
              <a class="nav-link text-light" href="#/explore">Beranda</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-light" href="#/job/">Pekerjaan</a>
            </li>
          </ul>

          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <form class="form-inline ml-auto my-2 my-lg-0" id="navbar-search-form">
              <div class="input-group">
                <input type="text" class="form-control" id="navbar-search-input" placeholder="Cari ..." aria-label="Cari">

                <div class="input-group-append">
                  <button class="btn btn-light" type="submit" aria-label="Cari"><i class="fas fa-search"></i></button>
                </div>
              </div>
            </form>

            <ul class="navbar-nav ml-lg-2">
              <li class="nav-item home d-lg-none">
                <a class="nav-link px-0 ml-lg-2 d-flex align-items-center text-light" href="#/explore/"><i class="fas fa-home"></i> <span class="ml-2">Beranda</span></a>
              </li>

              <!-- <li class="nav-item d-lg-none">
                <a class="nav-link px-0 ml-lg-2 d-flex align-items-center text-light" href="#/activity/"><i class="fas fa-compass"></i> <span class="d-lg-none ml-2">Aktivitas</span></a>
              </li>
              
              <li class="nav-item new-post d-lg-none">
                <a class="nav-link px-0 ml-lg-2 d-flex align-items-center text-light" href="#/new-post/"><i class="fas fa-plus-circle"></i> <span class="d-lg-none ml-2">Portofolio Baru</span></a>
              </li>

              <li class="nav-item d-lg-none">
                <a class="nav-link px-0 ml-lg-2 d-flex align-items-center text-light" href="#/bookmark/"><i class="fas fa-bookmark"></i> <span class="d-lg-none ml-2">Disimpan</span></a>
              </li>

              <li class="nav-item d-lg-none">
                <a class="nav-link px-0 ml-lg-2 d-flex align-items-center text-light" href="#/favorite/"><i class="fas fa-heart"></i> <span class="d-lg-none ml-2">Disukai</span></a>
              </li> -->

              <li class="nav-item d-lg-none">
                <a class="nav-link px-0 ml-lg-2 d-flex align-items-center text-light" href="#/job/"><i class="fas fa-briefcase"></i> <span class="d-lg-none ml-2">Pekerjaan</span></a>
              </li>

              <li class="nav-item profile">
                <a class="nav-link px-0 ml-lg-2 d-flex align-items-center text-light" href="#/profile/${username}"><i class="fas fa-user-circle"></i> <span class="ml-2">Profil</span></a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    `;
  },

  homePage() {
    return `
      <div id="home">
        <div class="jumbotron">
          <div class="container">
            <div class="d-flex flex-column flex-lg-row align-items-center justify-content-between">
              <img src="${CONFIG.IMAGE_PATH.ILLUST}/work.svg" alt="Illustration" class="max-w-lg-50 max-w-lg-50">

              <div class="d-flex flex-column align-items-center align-items-lg-end justify-content-lg-end">
                <h1 class="font-poppins font-weight-bold h2">Temukan sesuatu yang baru</h1>
                <h2 class="font-poppins h6">Unggah portofolio dan berkreasilah di InstaArt</h2>
                
                <div>
                  <a href="#/sign-up/" class="btn btn-primary">Daftar</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="container">
          <div class="row post-list">
            <div class="loading-container col-12">
              <div class="spinner-border text-secondary" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          </div>

          <div class="d-flex flex-column align-items-center">
            <h3 class="h5 text-center">Daftar atau masuk untuk melanjutkan</h3>

            <div class="d-flex align-items-center justify-content-center mt-2">
              <a href="#/sign-up/" class="btn btn-primary">Daftar</a>
              <a href="#/sign-in/" class="btn btn-outline-primary ml-3">Masuk</a>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  homePost(post, userId = null) {
    const { month, date, year } = DateHelper.parse(post.date);

    return `
      <div class="col-sm-12 col-md-6 col-lg-4 mb-4">
        <div class="card border-0 border-radius-5px overflow-hidden">
          <a href="#/post/${post.id}/" class="post-img-container border-radius-5px">
            <img src="${CONFIG.IMAGE_PATH.POST}/${post.image}" class="post-img" alt="${post.title} image">

            <!-- <div class="hover-post">
              <i class="fas fa-search" aria-label="visit ${post.title}"></i>
            </div> -->
          </a>
          
          <div class="card-body px-0 pt-2">
            <div class="d-flex align-items-center">
              <div class="d-flex align-items-center">
                <a href="#/profile/${post.username}/" class="user-image">
                  <img src="${CONFIG.IMAGE_PATH.USER}/${post.user_image}" alt="user-image">
                </a>

                <div class="d-flex flex-column ml-2">
                  <a href="#/post/${post.id}/" class="text-decoration-none hover:text-primary">${post.title}</a>
                
                  <a href="#/profile/${post.username}/" class="text-decoration-none hover:text-primary text-sm">${post.username}</a>
                </div>
              </div>

              <div class="d-flex align-items-center ml-auto">
                <button post-id="${post.id}" class="like border-0 p-0 mr-1 bg-transparent hover:text-primary ${post.likes.includes(userId) ? 'liked' : ''}" aria-label="${post.likes.includes(userId) ? 'batal sukai' : 'sukai'}">
                  ${post.likes.includes(userId) ? this.likedIcon() : this.likeIcon()}
                </button>

                <span class="pb-2px">${post.likes.length}<span class="sr-only"> meyukai desain ini</span></span>

                <a href="#/post/${post.id}/" class="hover:text-primary pb-2px ml-2 mr-1" aria-label="komentari desain ini">
                  <i class="far fa-comment"></i>
                </a>

                <span class="pb-2px">${post.comments.length}<span class="sr-only"> mengomentari</span></span>
                
                
                <i class="far fa-eye ml-2 mr-1"></i>
                
                <span class="pb-2px">${post.insight}<span class="sr-only"> melihat desain ini</span></span>
              </div>
            </div>
          </div>

          <!-- <div class="card-footer d-flex">
            <span class="d-block mx-auto">${date} ${month} ${year}</span>
          </div> -->
        </div>
      </div>
    `;
  },

  signInPage() {
    return `
      <div class="container" id="home">
        <div class="row">
          <div class="col-sm-12 col-md-6">
            <img src="${CONFIG.IMAGE_PATH.ILLUST}/work.svg" alt="Illustration">
          </div>

          <div class="col-sm-12 col-md-6">
            <div style="width: 320px;" class="card shadow-sm mt-3 mx-auto">
              <div class="card-body">
                <span class="card-title d-block font-redressed font-weight-bold h3 text-center mb-3">InstaArt</span>

                <form id="signin-form">
                  <div class="form-group">
                    <label for="identifier">Username/Email</label>
                    <input type="text" placeholder="Username atau Email" class="form-control" id="identifier" autocomplete="off" required>
                  </div>

                  <div class="form-group">
                    <label for="password">Password</label>

                    <div class="input-group">
                      <input type="password" placeholder="Password" class="form-control" id="password" autocomplete="off" required>
      
                      <div class="input-group-append">
                        <button type="button" class="btn btn-light" id="password-toggler" aria-label="perlihatkan password">
                          <i class="far fa-eye"></i>
                        </button>
                      </div>
                    </div>
                  </div>
        
                  <button type="submit" class="btn btn-primary d-block mx-auto">Masuk</button>

                  <a href="#/forget/" class="d-block text-center mt-3 text-dark">Lupa password ?</a>
                </form>
              </div>
            </div>

            <div style="width: 320px;" class="card shadow-sm mt-3 mx-auto">
              <div class="card-body d-flex justify-content-center">
                Belum punya akun?
                <a href="#/sign-up/" class="ml-2 font-weight-bold text-primary">Daftar</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  signUpPage() {
    return `
      <div class="container" id="sign-up">
        <div class="row">
          <div class="col-sm-12 col-md-6 offset-md-3">
            <div class="card shadow-sm mt-3 mx-auto">
              <div class="card-body">
                <span class="card-title d-block font-redressed font-weight-bold h1 text-center mb-3">InstaArt</span>

                <form id="signup-form">
                  <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" placeholder="Username" class="form-control" id="username" autocomplete="off" maxlength=${CONFIG.MAX_LENGTH.USER.USERNAME} required>
                  </div>

                  <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" placeholder="Email" class="form-control" id="email" autocomplete="off" maxlength=${CONFIG.MAX_LENGTH.USER.EMAIL} required>
                  </div>

                  <div class="form-group">
                    <label for="password">Password</label>

                    <div class="input-group">
                      <input type="password" placeholder="Password" class="form-control" id="password" autocomplete="off" minlength="${CONFIG.PASSWORD_MIN_LENGTH}" required>

                      <div class="input-group-append">
                        <button type="button" class="btn btn-light" aria-label="show password" id="password-toggler"><i class="far fa-eye"></i></button>
                      </div>
                    </div>
                  </div>

                  <div class="form-group">
                    <label for="confirm-password">Konfirmasi Password</label>

                    <div class="input-group">
                      <input type="password" placeholder="Konfirmasi Password" class="form-control" id="confirm-password" autocomplete="off" minlength="${CONFIG.PASSWORD_MIN_LENGTH}" required>

                      <div class="input-group-append">
                        <button type="button" class="btn btn-light" id="confirm-password-toggler" aria-label="show password"><i class="far fa-eye"></i></button>
                      </div>
                    </div>
                  </div>

                  <div class="form-group">
                    <label for="display-name">Nama Lengkap</label>
                    <input type="text" placeholder="Nama Lengkap" class="form-control" id="display-name" autocomplete="off" maxlength="${CONFIG.MAX_LENGTH.USER.DISPLAY_NAME}" required>
                  </div>

                  <div class="form-group mb-3">
                    <label for="province">Provinsi</label>
                    <select class="custom-select" id="province" required>
                      <option selected value="" disabled>Provinsi</option>
                    </select>
                  </div>

                  <div class="form-group mb-3">
                    <label for="city">Kabupaten/Kota</label>
                    <select class="custom-select" id="city" required>
                      <option selected value="" disabled>Silakan Pilih Kabupaten/Kota</option>
                    </select>
                  </div>

                  <div class="form-group">
                    <label for="biodata">Bio</label>
                    <textarea class="form-control" id="biodata" rows="4" placeholder="Ceritakan Sesuatu Tentang Dirimu"></textarea>
                  </div>
        
                  <button type="submit" class="btn btn-primary d-block mx-auto">Daftar</button>
                </form>
              </div>
            </div>

            <div class="card shadow-sm mt-3 mx-auto">
              <div class="card-body d-flex justify-content-center">
                Sudah memiliki akun?
                <a href="#/sign-in" class="ml-2 font-weight-bold text-primary">Masuk</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  forgetPasswordPage() {
    return `
      <div class="container" id="forget-password">
        <div class="row">
          <div class="col-sm-12 col-md-6 offset-md-3">
            <div class="card shadow-sm mt-3 mx-auto">
              <div class="card-body">
                <span class="card-title d-block font-weight-bold h1 text-center mb-3">Lupa Password</span>

                <form id="forget-form">
                  <div class="form-group">
                    <label for="email">Email</label>
                    <input type="text" placeholder="Email" class="form-control" id="email" autocomplete="off" maxlength=${CONFIG.MAX_LENGTH.USER.EMAIL} required>
                  </div>
        
                  <div class="d-flex justify-content-center items-center">
                    <a href="#/sign-in/" class="btn btn-secondary d-block">Kembali</a>
                    <button type="submit" class="btn btn-primary d-block ml-3">Kirim</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  recoveryPage() {
    return `
      <div class="container" id="recovery">
        <div class="row">
          <div class="col-sm-12 col-md-6 offset-md-3">
            <div class="card shadow-sm mt-3 mx-auto">
              <div class="card-body">
                <span class="card-title d-block font-weight-bold h1 text-center mb-3">Pemulihan Akun</span>

                <form id="recovery-form">
                  <div class="form-group">
                    <label for="password">Password Baru</label>

                    <div class="input-group">
                      <input type="new-password" placeholder="Password Baru" class="form-control" id="new-password" autocomplete="off" minlength="${CONFIG.PASSWORD_MIN_LENGTH}" required>

                      <div class="input-group-append">
                        <button type="button" class="btn btn-light" aria-label="show password" id="new-password-toggler"><i class="far fa-eye"></i></button>
                      </div>
                    </div>
                  </div>

                  <div class="form-group">
                    <label for="confirm-password">Konfirmasi Password Baru</label>

                    <div class="input-group">
                      <input type="password" placeholder="Konfirmasi Password Baru" class="form-control" id="confirm-password" autocomplete="off" minlength="${CONFIG.PASSWORD_MIN_LENGTH}" required>

                      <div class="input-group-append">
                        <button type="button" class="btn btn-light" id="confirm-password-toggler" aria-label="show password"><i class="far fa-eye"></i></button>
                      </div>
                    </div>
                  </div>
        
                  <button type="submit" class="btn btn-primary d-block mx-auto">Kirim</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  explorePage() {
    return `
      <div class="container mt-4" id="explore">
        <div class="explore-content">
          <div class="row post-list">
            <div class="loading-container col-12">
              <div class="spinner-border text-secondary" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          </div>

          <div class="d-flex" id="load-btn"></div>
        </div>
      </div>
    `;
  },

  exploreEmptyList() {
    return `
      <div class="empty-result-container">
        <i class="far fa-smile-wink h1 text-secondary"></i>
        <span class="h4 text-secondary text-center">Belum ada desain untuk saat ini.</span>
        <span class="mt-4 h6 text-secondary">Kirim desain pertamamu <a href="#/new-post/" class="text-primary">Disini</a>.</span>
      </div>
    `;
  },

  explorePost(post, userId = null) {
    const { month, date, year } = DateHelper.parse(post.date);

    return /* html */ `
      <div class="col-sm-12 col-md-6 col-lg-4 mb-4">
        <div class="card border-0 border-radius-5px overflow-hidden">
          <a href="#/post/${post.id}/" class="post-img-container border-radius-5px">
            <img src="${CONFIG.IMAGE_PATH.POST}/${post.image}" class="post-img" alt="${post.title} image">

            <!-- <div class="hover-post">
              <i class="fas fa-search" aria-label="visit ${post.title}"></i>
            </div> -->
          </a>
          
          <div class="card-body px-0 pt-2">
            <div class="d-flex align-items-center">
              <div class="d-flex align-items-center">
                <a href="#/profile/${post.username}/" class="user-image">
                  <img src="${CONFIG.IMAGE_PATH.USER}/${post.user_image}" alt="user-image">
                </a>

                <div class="d-flex flex-column ml-2">
                  <a href="#/post/${post.id}/" class="text-decoration-none hover:text-primary">${post.title}</a>

                  <a href="#/profile/${post.username}/" class="text-decoration-none hover:text-primary text-sm">${post.username}</a>
                </div>
              </div>

              <div class="d-flex align-items-center ml-auto">
                <button post-id="${post.id}" class="like border-0 p-0 mr-1 bg-transparent hover:text-primary ${post.likes.includes(userId) ? 'liked' : ''}" aria-label="${post.likes.includes(userId) ? 'batal sukai' : 'sukai'}">
                  ${post.likes.includes(userId) ? this.likedIcon() : this.likeIcon()}
                </button>

                <span class="pb-2px">${post.likes.length}<span class="sr-only"> meyukai desain ini</span></span>

                <a href="#/post/${post.id}/" class="hover:text-primary pb-2px ml-2 mr-1" aria-label="komentari desain ini">
                  <i class="far fa-comment"></i>
                </a>

                <span class="pb-2px">${post.comments.length}<span class="sr-only"> mengomentari</span></span>
                
                
                <i class="far fa-eye ml-2 mr-1"></i>
                
                <span class="pb-2px">${post.insight}<span class="sr-only"> melihat desain ini</span></span>
              </div>
            </div>
          </div>

          <!-- <div class="card-footer d-flex">
            <span class="d-block mx-auto">${date} ${month} ${year}</span>
          </div> -->
        </div>
      </div>
    `;
  },

  activityPage() {
    return `
      <div class="container mt-4" id="activity">
        <div class="row">
          <div class="col-sm-12 col-md-10 offset-md-1 col-lg-6 offset-lg-3">
            <div class="card shadow-sm mt-3 mx-auto">
              <div class="card-body">
                <span class="card-title d-block font-weight-bold h3 mb-4 ml-2">Aktivitas</span>

                <ul class="list-style-none p-0" id="activity-content"></ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  activityFollow(activity) {
    const {
      year, month, date, hour, minute,
    } = DateHelper.parse(activity.date);

    return `
      <li class="d-flex align-items-center mb-3 pb-3">
        <a href="#/profile/${activity.other_username}/" class="d-flex align-items-center text-decoration-none">
          <div class="user-image mr-3">
            <img src="./public/images/users/${activity.other_image}" alt="${activity.other_username} Profile Picture">
          </div>
        </a>

        <div class="d-flex flex-column">
          <p class="mb-0"><a href="#/profile/${activity.other_username}/" class="text-decoration-none">${activity.other_username}</a> mulai mengikuti anda.</p>

          <p class="mb-0 text-sm">${date} ${month} ${year}, ${hour < 10 ? `0${hour}` : hour}:${minute < 10 ? `0${minute}` : minute}</p>
        </div>
      </li>
    `;
  },

  activityComment(activity) {
    const {
      year, month, date, hour, minute,
    } = DateHelper.parse(activity.date);

    return `
      <li class="d-flex align-items-center mb-3 pb-3">
        <a href="#/profile/${activity.other_username}/" class="d-flex align-items-center text-decoration-none">
          <div class="user-image mr-3">
            <img src="./public/images/users/${activity.other_image}" alt="${activity.other_username} Profile Picture">
          </div>
        </a>

        <div class="d-flex flex-column">
          <p class="mb-0"><a href="#/profile/${activity.other_username}/" class="text-decoration-none">${activity.other_username}</a> memberikan komentar pada <a href="#/post/${activity.post_id}">${activity.post_title}</a>.</p>

          <p class="mb-0 text-sm">${date} ${month} ${year}, ${hour < 10 ? `0${hour}` : hour}:${minute < 10 ? `0${minute}` : minute}</p>
        </div>
      </li>
    `;
  },

  activityLike(activity) {
    const {
      year, month, date, hour, minute,
    } = DateHelper.parse(activity.date);

    return `
      <li class="d-flex align-items-center mb-3 pb-3">
        <a href="#/profile/${activity.other_username}/" class="d-flex align-items-center text-decoration-none">
          <div class="user-image mr-3">
            <img src="./public/images/users/${activity.other_image}" alt="${activity.other_username} Profile Picture">
          </div>
        </a>

        <div class="d-flex flex-column">
          <p class="mb-0"><a href="#/profile/${activity.other_username}/" class="text-decoration-none">${activity.other_username}</a> menyukai <a href="#/post/${activity.post_id}">${activity.post_title}</a>.</p>

          <p class="mb-0 text-sm">${date} ${month} ${year}, ${hour < 10 ? `0${hour}` : hour}:${minute < 10 ? `0${minute}` : minute}</p>
        </div>
      </li>
    `;
  },

  activityEmpty() {
    return `
      <li class="d-flex align-items-center">
        <div class="empty-result-container w-100 min-h-300px">
          <i class="far fa-smile-wink h1 text-secondary"></i>
          <span class="h4 text-secondary text-center">Belum ada aktivitas untuk saat ini.</span>
        </div>
      </li>
    `;
  },

  bookmarkPage() {
    return `
      <div class="container mt-4" id="bookmark">
        <h1 class="text-center font-weight-bold h3 mb-4">Disimpan</h1>
        <div class="bookmark-content">
          <div class="row post-list">
            <div class="loading-container col-12">
              <div class="spinner-border text-secondary" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          </div>

          <div class="d-flex" id="load-btn"></div>
        </div>
      </div>
    `;
  },

  emptyBookmarkPage() {
    return `
      <div class="empty-result-container">
        <i class="far fa-smile-wink h1 text-secondary"></i>
        <span class="h4 text-secondary text-center">Belum ada desain yang kamu simpan untuk saat ini.</span>
      </div>
    `;
  },

  bookmarkPost(post, userId = null) {
    const { month, date, year } = DateHelper.parse(post.date);

    return `
      <div class="col-sm-12 col-md-6 col-lg-4 mb-4">
        <div class="card border-0 border-radius-5px overflow-hidden">
          <a href="#/post/${post.id}/" class="post-img-container border-radius-5px">
            <img src="${CONFIG.IMAGE_PATH.POST}/${post.image}" class="post-img" alt="${post.title} image">

            <!-- <div class="hover-post">
              <i class="fas fa-search" aria-label="visit ${post.title}"></i>
            </div> -->
          </a>
          
          <div class="card-body px-0 pt-2">
            <div class="d-flex align-items-center">
              <div class="d-flex align-items-center">
                <a href="#/profile/${post.username}/" class="user-image">
                  <img src="${CONFIG.IMAGE_PATH.USER}/${post.user_image}" alt="user-image">
                </a>

                <div class="d-flex flex-column ml-2">
                  <a href="#/post/${post.id}/" class="text-decoration-none hover:text-primary">${post.title}</a>

                  <a href="#/profile/${post.username}/" class="text-decoration-none hover:text-primary text-sm">${post.username}</a>
                </div>
              </div>

              <div class="d-flex align-items-center ml-auto">
                <button post-id="${post.id}" class="like border-0 p-0 mr-1 bg-transparent hover:text-primary ${post.likes.includes(userId) ? 'liked' : ''}" aria-label="${post.likes.includes(userId) ? 'batal sukai' : 'sukai'}">
                  ${post.likes.includes(userId) ? this.likedIcon() : this.likeIcon()}
                </button>

                <span class="pb-2px">${post.likes.length}<span class="sr-only"> meyukai desain ini</span></span>

                <a href="#/post/${post.id}/" class="hover:text-primary pb-2px ml-2 mr-1" aria-label="komentari desain ini">
                  <i class="far fa-comment"></i>
                </a>

                <span class="pb-2px">${post.comments.length}<span class="sr-only"> mengomentari</span></span>
                
                
                <i class="far fa-eye ml-2 mr-1"></i>
                
                <span class="pb-2px">${post.insight}<span class="sr-only"> melihat desain ini</span></span>
              </div>
            </div>
          </div>

          <!-- <div class="card-footer d-flex">
            <span class="d-block mx-auto">${date} ${month} ${year}</span>
          </div> -->
        </div>
      </div>
    `;
  },

  favoritePage() {
    return `
      <div class="container mt-4" id="favorite">
        <h1 class="text-center font-weight-bold h3 mb-4">Disukai</h1>
        <div class="favorite-content">
          <div class="row post-list">
            <div class="loading-container col-12">
              <div class="spinner-border text-secondary" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          </div>

          <div class="d-flex" id="load-btn"></div>
        </div>
      </div>
    `;
  },

  emptyFavoritePage() {
    return `
      <div class="empty-result-container">
        <i class="far fa-smile-wink h1 text-secondary"></i>
        <span class="h4 text-secondary text-center">Belum ada desain yang kamu sukai untuk saat ini.</span>
      </div>
    `;
  },

  favoritePost(post, userId = null) {
    const { month, date, year } = DateHelper.parse(post.date);

    return `
      <div class="col-sm-12 col-md-6 col-lg-4 mb-4">
        <div class="card border-0 border-radius-5px overflow-hidden">
          <a href="#/post/${post.id}/" class="post-img-container border-radius-5px">
            <img src="${CONFIG.IMAGE_PATH.POST}/${post.image}" class="post-img" alt="${post.title} image">

            <!-- <div class="hover-post">
              <i class="fas fa-search" aria-label="visit ${post.title}"></i>
            </div> -->
          </a>
          
          <div class="card-body px-0 pt-2">
            <div class="d-flex align-items-center">
              <div class="d-flex align-items-center">
                <a href="#/profile/${post.username}/" class="user-image">
                  <img src="${CONFIG.IMAGE_PATH.USER}/${post.user_image}" alt="user-image">
                </a>

                <div class="d-flex flex-column ml-2">
                  <a href="#/post/${post.id}/" class="text-decoration-none hover:text-primary">${post.title}</a>

                  <a href="#/profile/${post.username}/" class="text-decoration-none hover:text-primary text-sm">${post.username}</a>
                </div>
              </div>

              <div class="d-flex align-items-center ml-auto">
                <button post-id="${post.id}" class="like border-0 p-0 mr-1 bg-transparent hover:text-primary ${post.likes.includes(userId) ? 'liked' : ''}" aria-label="${post.likes.includes(userId) ? 'batal sukai' : 'sukai'}">
                  ${post.likes.includes(userId) ? this.likedIcon() : this.likeIcon()}
                </button>

                <span class="pb-2px">${post.likes.length}<span class="sr-only"> meyukai desain ini</span></span>

                <a href="#/post/${post.id}/" class="hover:text-primary pb-2px ml-2 mr-1" aria-label="komentari desain ini">
                  <i class="far fa-comment"></i>
                </a>

                <span class="pb-2px">${post.comments.length}<span class="sr-only"> mengomentari</span></span>
                
                
                <i class="far fa-eye ml-2 mr-1"></i>
                
                <span class="pb-2px">${post.insight}<span class="sr-only"> melihat desain ini</span></span>
              </div>
            </div>
          </div>

          <!-- <div class="card-footer d-flex">
            <span class="d-block mx-auto">${date} ${month} ${year}</span>
          </div> -->
        </div>
      </div>
    `;
  },

  jobPage() {
    return `
      <div id="job">
        <div class="d-flex flex-column justify-content-center align-items-center w-100 p-5 bg-secondary bg-cubes">
          <h1 class="text-center text-light h2 font-weight-normal mb-5">
            Temukan pekerjaan yang sesuai denganmu.
          </h1>

          <a href="#/new-job/" class="btn btn-primary btn-lg rounded-pill">Pekerjaan Baru</a>
        </div>

        <div class="container">
          <div class="card mt-4 p-4 shadow" style="border-radius: 1rem;">
            <form class="form-block" id="job-search-form">
              <div class="input-group">
                <input type="text" class="form-control" id="job-search-input" placeholder="Cari Pekerjaan ..." aria-label="Cari">

                <div class="input-group-append">
                  <button class="btn btn-outline-primary" type="submit" aria-label="Cari"><i class="fas fa-search"></i></button>
                </div>
              </div>

              <div class="d-flex flex-column flex-md-row align-items-md-center mx-0 mt-3">
                <div class="d-flex flex-column flex-md-row align-items-md-center">
                  <label for="work-type" class="d-block mb-0 mr-md-2 min-w-fit">Tipe Pekerjaan :</label>

                  <select class="d-block custom-select max-w-md-150px" id="work-type" required>
                    <option value="Semua">Semua</option>
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Freelance">Freelance</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>

                <div class="d-flex flex-column flex-md-row align-items-md-center ml-md-3 mt-3 mt-md-0">
                  <label for="shift" class="d-block mb-0 mr-md-2 min-w-fit">Shift :</label>

                  <select class="d-block custom-select max-w-md-150px" id="shift" required>
                    <option value="Semua">Semua</option>
                    <option value="WFO-WFH">WFO-WFH</option>
                    <option value="WFO">WFO</option>
                    <option value="WFH">WFH</option>
                  </select>
                </div>
              </div>
            </form>
          </div>

          <div class="job-content mt-5">
            <div class="row job-list">
              <div class="loading-container col-12">
                <div class="spinner-border text-secondary" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
            </div>

            <div class="d-flex" id="load-btn"></div>
          </div>
        </div>
      </div>
    `;
  },

  jobEmptyList() {
    return `
      <div class="empty-result-container">
        <i class="far fa-smile-wink h1 text-secondary"></i>
        <span class="h4 text-secondary text-center">Belum ada pekerjaan untuk saat ini.</span>
        <span class="mt-4 h6 text-secondary">Buat lowongan pekerjaanmu sekarang!</span>
      </div>
    `;
  },

  jobSearchNotFound() {
    return `
     <div class="col-12">
      <div class="empty-result-container">
        <i class="fas fa-briefcase h1 font-weight-bold text-secondary"></i>
        <span class="h4 text-secondary text-center mt-2">Pekerjaan tidak ditemukan.</span>
      </div>
     </div>
    `;
  },

  jobItem(job) {
    return `
      <div class="col-sm-12 col-md-6 col-lg-4 mb-4">
        <div class="card shadow rounded">          
          <div class="card-body">
            <a href="#/profile/${job.username}/" class="d-flex align-items-center text-decoration-none hover:text-primary">
              <div class="user-image-sm">
                <img src="${CONFIG.IMAGE_PATH.USER}/${job.user_image}" alt="user-image">
              </div>

              <span class="ml-2">${job.username}</span>
            </a>

            <p class="card-title text-ellipsis d-block my-2 h4">${job.title}</p>

            <p class="mt-3"><i class="fas fa-map-marker-alt ml-1 mr-2"></i> ${job.city_name}, ${job.province_name}</p>

            <p class="mt-2"><i class="fas fa-briefcase mr-2"></i> ${job.work_type}</p>
            <p class="mt-2"><i class="fas fa-building mr-2"></i> ${job.shift}</p>
          </div>

          <div class="card-footer">
            <div class="w-100 d-flex justify-content-center align-items-center">
              <a href="#/job/${job.id}" class="btn btn-primary">Detail</a>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  newJob() {
    return `
      <div class="container mt-4" id="new-job">
        <div class="row">
          <div class="col-sm-12 col-md-6 offset-md-3">
            <div class="card shadow-sm mt-3 mx-auto">
              <div class="card-body">
                <span class="card-title d-block font-weight-bold h3 text-center mb-3">Pekerjaan Baru</span>

                <form id="job-form">
                  <div class="form-group">
                    <label for="title">Nama Pekerjaan</label>
                    <input type="text" placeholder="Nama Pekerjaan" class="form-control" id="title" autocomplete="off" maxlength="${CONFIG.MAX_LENGTH.JOB.TITLE}" required>
                  </div>

                  <div class="form-group">
                    <label for="description">Deskripsi</label>
                    <textarea class="form-control" id="description" rows="3" placeholder="Deskripsi pekerjaan ..." style="resize: vertical;"></textarea>
                  </div>

                  <div class="form-group">
                    <label for="work-type">Tipe Pekerjaan</label>
                    <select class="custom-select" id="work-type" required>
                      <option value="Full Time">Full Time</option>
                      <option value="Part Time">Part Time</option>
                      <option value="Freelance">Freelance</option>
                      <option value="Contract">Contract</option>
                    </select>
                  </div>

                  <div class="form-group">
                    <label for="shift">Shift</label>
                    <select class="custom-select" id="shift" required>
                      <option value="WFO-WFH">WFO-WFH</option>
                      <option value="WFO">WFO</option>
                      <option value="WFH">WFH</option>
                    </select>
                  </div>

                  <div class="form-group">
                    <label for="province">Provinsi</label>
                    <select class="custom-select" id="province" required>
                      <option selected value="" disabled>Provinsi</option>
                    </select>
                  </div>                  

                  <div class="form-group">
                    <label for="city">Kabupaten/Kota</label>
                    <select class="custom-select" id="city" required>
                      <option selected value="" disabled>Silakan Pilih Kabupaten/Kota</option>
                    </select>
                  </div>

                  <div class="form-group">
                    <label for="form_link">Tautan Formulir</label>
                    <input type="text" class="form-control" id="form-link" placeholder="https://www.yourcompany.com/job" required>
                  </div>
        
                  <button type="submit" class="btn btn-primary d-block mx-auto mt-4">Buat</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  editJob() {
    return `
      <div class="container mt-4" id="edit-job">
        <div class="row">
          <div class="col-sm-12 col-md-6 offset-md-3">
            <div class="card shadow-sm mt-3 mx-auto">
              <div class="card-body">
                <span class="card-title d-block font-weight-bold h3 text-center mb-3">Edit Pekerjaan</span>

                <form id="job-form">
                  <div class="form-group">
                    <label for="title">Nama Pekerjaan</label>
                    <input type="text" placeholder="Nama Pekerjaan" class="form-control" id="title" autocomplete="off" maxlength="${CONFIG.MAX_LENGTH.JOB.TITLE}" required>
                  </div>

                  <div class="form-group">
                    <label for="description">Deskripsi</label>
                    <textarea class="form-control" id="description" rows="3" placeholder="Deskripsi pekerjaan ..." style="resize: vertical;"></textarea>
                  </div>

                  <div class="form-group">
                    <label for="work-type">Tipe Pekerjaan</label>
                    <select class="custom-select" id="work-type" required>
                      <option value="Full Time">Full Time</option>
                      <option value="Part Time">Part Time</option>
                      <option value="Freelance">Freelance</option>
                      <option value="Contract">Contract</option>
                    </select>
                  </div>

                  <div class="form-group">
                    <label for="shift">Shift</label>
                    <select class="custom-select" id="shift" required>
                      <option value="WFO-WFH">WFO-WFH</option>
                      <option value="WFO">WFO</option>
                      <option value="WFH">WFH</option>
                    </select>
                  </div>

                  <div class="form-group">
                    <label for="province">Provinsi</label>
                    <select class="custom-select" id="province" required>
                      <option selected value="" disabled>Provinsi</option>
                    </select>
                  </div>                  

                  <div class="form-group">
                    <label for="city">Kabupaten/Kota</label>
                    <select class="custom-select" id="city" required>
                      <option selected value="" disabled>Silakan Pilih Kabupaten/Kota</option>
                    </select>
                  </div>

                  <div class="form-group">
                    <label for="form_link">Tautan Formulir</label>
                    <input type="text" class="form-control" id="form-link" placeholder="https://www.yourcompany.com/job" required>
                  </div>

                  <div class="d-flex justify-content-evenly align-items-center mt-4">
                    <button type="button" class="btn btn-danger d-block" id="delete-button">Hapus</button>
                    <button type="submit" class="btn btn-primary d-block">Simpan</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  jobDetailPage() {
    return `
      <div class="container mt-4" id="job-detail">
        <div class="row">
          <div class="col-sm-12 col-lg-10 offset-lg-1">
            <div class="card shadow-sm">
              <div class="card-body d-flex flex-column align-items-center">
                <div class="user-image-lg bg-grey user-image-border">
                  <img src="${CONFIG.IMAGE_PATH.USER}/default_user.png" alt="Profile image" class="user-image-element">
                </div>

                <div class="d-flex flex-column mt-3 w-100 px-3">
                  <span class="h4 text-center job-title"></span>
                  <span class="h6 text-secondary text-center user-display-name"></span>

                  <div class="d-flex flex-column justifiy-content-center align-items-center pt-0 px-3 pb-3">
                    <p class="mb-2">
                      <i class="fas fa-map-marker-alt ml-1 mr-2"></i> 
                      <span class="job-location"></span>
                    </p>

                    <p class="mb-2">
                      <i class="fas fa-briefcase mr-2"></i> 
                      <span class="job-work-type"></span>
                    </p>

                    <p class="mb-2">
                      <i class="fas fa-building mr-2"></i> 
                      <span class="job-shift"></span>
                    </p>
                  </div>

                  <div class="d-flex flex-column-reverse flex-md-row mt-3">
                    <span class="job-desc"></span>
                  </div>

                  <div class="d-flex" id="report-container"></div>
                </div>
              </div>

              <div class="card-footer">
                <div id="button-container" class="w-100 d-flex justify-content-center align-items-center">
                  <button class="btn btn-primary" id="apply-button">Lamar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  jobNotFound() {
    return `
      <div class="empty-result-container mt-4">
        <img src="${CONFIG.IMAGE_PATH.ILLUST}/404.png" alt="404 Illustration" class="empty-img">
        <span class="text-secondary mt-2 h1 text-center">Pekerjaan tidak ditemukan.</span>
        <span class="mt-2 h6 text-secondary">
          Temukan pekerjaan yang sesuai <a href="#/job/" class="text-primary">Disini</a>.
        </span>
      </div>
    `;
  },

  jobEditBtn(id) {
    return `
      <a href="#/edit-job/${id}" class="btn btn-outline-primary">
        <i class="far fa-edit"></i> Edit
      </a>
    `;
  },

  jobReportBtn(id) {
    return `
      <a href="#/report-job/${id}" class="mx-auto mt-4 text-secondary text-sm text-decoration-none">
        <i class="fas fa-exclamation-triangle"></i>
        Laporkan
      </a>
    `;
  },

  jobReportPage() {
    return `
      <div class="container mt-4" id="report-job">
        <div class="row">
          <div class="col-sm-12 col-md-6 offset-md-3">
            <div class="card shadow-sm mt-3 mx-auto">
              <div class="card-body">
                <span class="card-title d-block font-weight-bold h3 text-center mb-3">Laporkan Pekerjaan</span>

                <form id="report-form">
                  <div class="form-group">
                    <label for="reason">Alasan</label>
                    <textarea class="form-control" id="reason" rows="3" placeholder="Tuliskan Alasan Anda .."></textarea>
                  </div>

                  <div class="form-group">
                    <label for="reason-image">Upload Bukti Foto</label>
                    <div class="custom-file">
                      <input type="file" class="custom-file-input" id="reason-image" required>
                      <label class="custom-file-label" for="reason-image">Pilih Berkas</label>
                    </div>
                  </div>

                  <button type="submit" class="btn btn-primary d-block mx-auto mt-4">Laporkan</button>

                  <div class="d-none mt-4" id="preview-image">
                    <img src="" alt="preview" style="width: 100%;">
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  profilePage() {
    return `
      <div class="container mt-4" id="profile">
        <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-4">
            <div class="card shadow-sm">
              <div class="card-body d-flex flex-column align-items-center">
                <div class="user-image-lg bg-grey user-image-border">
                  <img src="${CONFIG.IMAGE_PATH.USER}/default_user.png" alt="Profile image" class="user-image-element">
                </div>

                <div class="d-flex flex-column align-items-center mt-2rem">
                  <span class="h4 text-center user-display-name"></span>
                  <span class="h6 text-secondary text-center user-username"></span>

                  <div id="user-button-container"></div>

                  <span class="mt-3 user-bio pre-wrap"></span>
                </div>

                <ul class="list-group list-group-flush text-sm md:text-md w-100">
                  <li class="list-group-item border-0 px-0">
                    <a href="#/followers" id="followers-anchor" class="text-decoration-none hover:text-primary d-flex justify-content-between align-items-center">
                      <span>Pengikut</span>
                      <span class="user-followers"></span>
                    </a>
                  </li>

                  <li class="list-group-item border-0 px-0">
                    <a href="#/following" id="following-anchor" class="text-decoration-none hover:text-primary d-flex justify-content-between align-items-center">
                      <span>Mengikuti</span>
                      <span class="user-following"></span>
                    </a>
                  </li>

                  <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0">
                    <span>Provinsi</span>
                    <span class="user-province"></span>
                  </li>

                  <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0">
                    <span>Kabupaten/Kota</span>
                    <span class="user-city"></span>
                  </li>
                </ul>
              </div>

              <div class="card-footer d-flex justify-content-center" id="mail-or-signout-btn">
              </div>
            </div>
          </div>

          <div class="col-sm-12 col-md-6 col-lg-8 mt-4 mt-md-0">
            <div class="row post-list ">
              <div class="col-12">
                <div class="loading-container">
                  <div class="spinner-border text-secondary" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="d-flex" id="load-btn"></div>
          </div>
        </div>
      </div>
    `;
  },

  profileMailBtn() {
    return `
      <button class="btn btn-primary" id="mail-btn">Ajak Kerjasama</button>
    `;
  },

  profileSignOutBtn() {
    return `
      <button class="btn btn-danger" id="signout-btn">Keluar</button>
    `;
  },

  profileNotFound() {
    return `
      <div class="empty-result-container mt-4">
        <img src="${CONFIG.IMAGE_PATH.ILLUST}/404.png" alt="404 Illustration" class="empty-img">
        <span class="text-secondary mt-2 h1 text-center">Pengguna tidak ditemukan.</span>
        <span class="mt-2 h6 text-secondary">
          Temukan desain terbaik <a href="#/" class="text-primary">Disini</a>.
        </span>
      </div>
    `;
  },

  profileNewPost() {
    return `
      <a id="edit" href="#/new-post/" class="btn btn-info rounded-circle btn-float" aria-label="New post">
        <i class="fas fa-plus"></i>
      </a>
    `;
  },

  profileEditBtn() {
    return `
      <a href="#/edit-profile/" class="btn btn-outline-primary mt-2">
        <i class="far fa-edit"></i> Edit Profil
      </a>
    `;
  },

  profileFollowBtn() {
    return `
      <button class="btn btn-outline-primary my-3" id="follow">Ikuti</button>
    `;
  },

  profileUnfollowBtn() {
    return `
      <button class="btn btn-primary my-3" id="unfollow">Batal Mengikuti</button>
    `;
  },

  profileEmptyPostsList() {
    return `
      <div class="empty-result-container col-12 mt-4">
        <i class="far fa-smile-wink h1 text-secondary"></i>
        <span class="h4 text-secondary text-center">Belum ada desain yang diunggah untuk saat ini.</span>
      </div>
    `;
  },

  profilePost(post, userId = null) {
    const { month, date, year } = DateHelper.parse(post.date);

    return `
      <div class="col-12 col-lg-6">
        <div class="card border-0 border-radius-5px overflow-hidden">
          <a href="#/post/${post.id}/" class="post-img-container border-radius-5px">
            <img src="${CONFIG.IMAGE_PATH.POST}/${post.image}" class="post-img" alt="${post.title} image">

            <!-- <div class="hover-post">
              <i class="fas fa-search" aria-label="visit ${post.title}"></i>
            </div> -->
          </a>
          
          <div class="card-body px-0 pt-2">
            <div class="d-flex align-items-center">
              <div class="d-flex align-items-center">
                <a href="#/profile/${post.username}/" class="user-image">
                  <img src="${CONFIG.IMAGE_PATH.USER}/${post.user_image}" alt="user-image">
                </a>

                <div class="d-flex flex-column ml-2">
                  <a href="#/post/${post.id}/" class="text-decoration-none hover:text-primary">${post.title}</a>

                  <a href="#/profile/${post.username}/" class="text-decoration-none hover:text-primary text-sm">${post.username}</a>
                </div>
              </div>

              <div class="d-flex align-items-center ml-auto">
                <button post-id="${post.id}" class="like border-0 p-0 mr-1 bg-transparent hover:text-primary ${post.likes.includes(userId) ? 'liked' : ''}" aria-label="${post.likes.includes(userId) ? 'batal sukai' : 'sukai'}">
                  ${post.likes.includes(userId) ? this.likedIcon() : this.likeIcon()}
                </button>

                <span class="pb-2px">${post.likes.length}<span class="sr-only"> meyukai desain ini</span></span>

                <a href="#/post/${post.id}/" class="hover:text-primary pb-2px ml-2 mr-1" aria-label="komentari desain ini">
                  <i class="far fa-comment"></i>
                </a>

                <span class="pb-2px">${post.comments.length}<span class="sr-only"> mengomentari</span></span>
                
                
                <i class="far fa-eye ml-2 mr-1"></i>
                
                <span class="pb-2px">${post.insight}<span class="sr-only"> melihat desain ini</span></span>
              </div>
            </div>
          </div>

          <!-- <div class="card-footer d-flex">
            <span class="d-block mx-auto">${date} ${month} ${year}</span>
          </div> -->
        </div>
      </div>
    `;
  },

  editProfile() {
    return `
      <div class="container mt-4" id="edit-profile">
        <div class="row">
          <div class="col-sm-12 col-md-4">
            <div class="card">
              <div class="card-header font-weight-bold">
                Pengaturan Akun
              </div>

              <div class="list-group">
                <a href="#/edit-profile/" class="list-group-item list-group-item-action hover:bg-secondary disabled">
                  Profil
                </a>

                <a href="#/edit-profile-picture/" class="list-group-item list-group-item-action hover:bg-secondary">Foto Profil</a>

                <a href="#/edit-password/" class="list-group-item list-group-item-action hover:bg-secondary">Password</a>
              </div>
            </div>

            <div class="card mt-3">
              <div class="card-header font-weight-bold">
                Halaman Pribadi
              </div>

              <div class="list-group">
                <a href="#/activity/" class="list-group-item list-group-item-action hover:bg-secondary">
                  Aktivitas
                </a>

                <a href="#/bookmark/" class="list-group-item list-group-item-action hover:bg-secondary">Disimpan</a>

                <a href="#/favorite/" class="list-group-item list-group-item-action hover:bg-secondary">Disukai</a>

                <a href="#/user-jobs/" class="list-group-item list-group-item-action hover:bg-secondary">Daftar Pekerjaan yang Dibuat</a>
              </div>
            </div>
          </div>

          <div class="col-sm-12 col-md-8 col-lg-6 offset-lg-1 mt-4 mt-md-0">
            <div class="card shadow-sm mx-auto">
              <div class="card-body">
                <span class="card-title d-block font-weight-bold h3 text-center mb-3">Profil</span>

                <form id="profile-form">
                  <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" placeholder="Username" class="form-control" id="username" autocomplete="off" maxlength="${CONFIG.MAX_LENGTH.USER.USERNAME}" required>
                  </div>

                  <div class="form-group">
                    <label for="display-name">Nama Lengkap</label>
                    <input type="text" placeholder="Nama Lengkap" class="form-control" id="display-name" autocomplete="off" maxlength="${CONFIG.MAX_LENGTH.USER.DISPLAY_NAME}" required>
                  </div>

                  <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" placeholder="Email" class="form-control" id="email" autocomplete="off" maxlength="${CONFIG.MAX_LENGTH.USER.EMAIL}" required>
                  </div>

                  <div class="form-group">
                    <label for="province">Provinsi</label>
                    <select class="custom-select" id="province" required>
                      <option selected value="" disabled>Provinsi</option>
                    </select>
                  </div>                  

                  <div class="form-group">
                    <label for="city">Kabupaten/Kota</label>
                    <select class="custom-select" id="city" required>
                      <option selected value="" disabled>Silakan Pilih Kabupaten/Kota</option>
                    </select>
                  </div>

                  <div class="form-group">
                    <label for="bio">Bio</label>
                    <textarea class="form-control" id="bio" rows="4" placeholder="Ceritakan Sesuatu Tentang Dirimu"></textarea>
                  </div>
        
                  <div class="d-flex justify-content-evenly">
                    <button type="button" class="btn btn-danger d-block mx-auto" id="sign-out-btn">Keluar</button>

                    <button type="submit" class="btn btn-primary d-block mx-auto">Simpan</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  editProfilePicture() {
    return `
      <div class="container mt-4" id="edit-profile-picture">
        <div class="row">
          <div class="col-sm-12 col-md-4">
            <div class="card">
              <div class="card-header font-weight-bold">
                Pengaturan Akun
              </div>

              <div class="list-group">
                <a href="#/edit-profile/" class="list-group-item list-group-item-action hover:bg-secondary">
                  Profil
                </a>
                <a href="#/edit-profile-picture" class="list-group-item list-group-item-action hover:bg-secondary disabled">Foto Profil</a>

                <a href="#/edit-password" class="list-group-item list-group-item-action hover:bg-secondary">Password</a>
              </div>
            </div>

            <div class="card mt-3">
              <div class="card-header font-weight-bold">
                Halaman Pribadi
              </div>

              <div class="list-group">
                <a href="#/activity/" class="list-group-item list-group-item-action hover:bg-secondary">
                  Aktivitas
                </a>

                <a href="#/bookmark/" class="list-group-item list-group-item-action hover:bg-secondary">Disimpan</a>

                <a href="#/favorite/" class="list-group-item list-group-item-action hover:bg-secondary">Disukai</a>

                <a href="#/user-jobs/" class="list-group-item list-group-item-action hover:bg-secondary">Daftar Pekerjaan yang Dibuat</a>
              </div>
            </div>
          </div>

          <div class="col-sm-12 col-md-8 col-lg-6 offset-lg-1 mt-4 mt-md-0">
            <div class="card shadow-sm mx-auto">
              <div class="card-body">
                <span class="card-title d-block font-weight-bold h3 text-center mb-3">Foto Profil</span>

                <div class="user-image-lg d-block mx-auto my-3">
                  <img src="${CONFIG.IMAGE_PATH.USER}/default_user.png" alt="profile picture" class="user-image-element">
                </div>

                <form id="profile-picture-form" class="d-block mx-auto">
                  <div class="custom-file mb-3">
                    <input type="file" class="custom-file-input" id="profile-picture">
                    <label class="custom-file-label" for="profile-picture">Pilih file</label>
                  </div>
        
                  <div class="d-flex justify-content-center align-items-center">
                    <button type="button" class="btn btn-danger mr-4" id="remove-button">Hapus</button>
                    <button type="submit" class="btn btn-primary">Simpan</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  editPassword() {
    return `
      <div class="container mt-4" id="edit-password">
        <div class="row">
          <div class="col-sm-12 col-md-4">
            <div class="card">
              <div class="card-header font-weight-bold">
                Pengaturan Akun
              </div>

              <div class="list-group">
                <a href="#/edit-profile/" class="list-group-item list-group-item-action hover:bg-secondary">
                  Profil
                </a>

                <a href="#/edit-profile-picture/" class="list-group-item list-group-item-action hover:bg-secondary">Foto Profil</a>

                <a href="#/edit-password/" class="list-group-item list-group-item-action hover:bg-secondary disabled">Password</a>
              </div>
            </div>

            <div class="card mt-3">
              <div class="card-header font-weight-bold">
                Halaman Pribadi
              </div>

              <div class="list-group">
                <a href="#/activity/" class="list-group-item list-group-item-action hover:bg-secondary">
                  Aktivitas
                </a>

                <a href="#/bookmark/" class="list-group-item list-group-item-action hover:bg-secondary">Disimpan</a>

                <a href="#/favorite/" class="list-group-item list-group-item-action hover:bg-secondary">Disukai</a>

                <a href="#/user-jobs/" class="list-group-item list-group-item-action hover:bg-secondary">Daftar Pekerjaan yang Dibuat</a>
              </div>
            </div>
          </div>

          <div class="col-sm-12 col-md-8 col-lg-6 offset-lg-1 mt-4 mt-md-0">
            <div class="card shadow-sm mx-auto">
              <div class="card-body">
                <span class="card-title d-block font-weight-bold h3 text-center mb-3">Password</span>

                <form id="password-form">
                  <div class="form-group">
                    <label for="new-password">Password Baru</label>

                    <div class="input-group">
                      <input type="password" placeholder="Password Baru" class="form-control" id="new-password" autocomplete="off" minlength="${CONFIG.PASSWORD_MIN_LENGTH}" required>
      
                      <div class="input-group-append">
                        <button type="button" class="btn btn-light" id="new-password-toggler" aria-label="show password"><i class="far fa-eye"></i></button>
                      </div>
                    </div>
                  </div>

                  <div class="form-group">
                    <label for="current-password">Password Lama</label>

                    <div class="input-group">
                      <input type="password" placeholder="Password Lama" class="form-control" id="current-password" autocomplete="off" minlength="${CONFIG.PASSWORD_MIN_LENGTH}" required>
      
                      <div class="input-group-append">
                        <button type="button" class="btn btn-light" id="current-password-toggler" aria-label="show password">
                          <i class="far fa-eye"></i>
                        </button>
                      </div>
                    </div>
                  </div>
        
                  <button type="submit" class="btn btn-primary d-block mx-auto">Simpan</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  followersPage() {
    return `
      <div class="container mt-4" id="followers">
        <h1 class="text-center mb-5 h3">Pengikut <span class="user-username"></span></h1>
          <div class="row user-list">
            <div class="loading-container col-12">
              <div class="spinner-border text-secondary" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          </div>

          <div class="d-flex" id="load-btn"></div>
      </div>
    `;
  },

  followingPage() {
    return `
      <div class="container mt-4" id="following">
        <h1 class="text-center mb-5 h3">Diikuti <span class="user-username"></span></h1>
          <div class="row user-list">
            <div class="loading-container col-12">
              <div class="spinner-border text-secondary" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          </div>

          <div class="d-flex" id="load-btn"></div>
      </div>
    `;
  },

  followUserResult(user) {
    return `
      <div class="col-12 col-md-6 col-lg-4 mb-3">
        <div class="card shadow">
          <a href="#/profile/${user.username}/" class="card-body d-flex align-items-center text-decoration-none">
            <div class="user-image-lg mr-4">
              <img src="${CONFIG.IMAGE_PATH.USER}/${user.image}" alt="${user.username} Profile Picture">
            </div>

            <div class="d-flex flex-column hover:text-primary">
              <span class="font-weight-bold">${user.username}</span>
              <span class="font-weight-bold text-sm">${user.city_name.split(' ').splice(1).join(' ')}</span>
              <span class="font-weight-bold text-sm">${user.province_name}</span>
            </div>
          </a>
        </div>
      </div>
    `;
  },

  followUserEmptyResult() {
    return `
      <div class="col-12 empty-result-container">
        <span class="h4 text-secondary text-center">Masih belum ada daftar untuk saat ini.</span>
      </div>
    `;
  },

  postPage() {
    return `
      <div class="container mt-4" id="post">
        <div class="loading-container">
          <div class="spinner-border text-secondary" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    `;
  },

  postNotFound() {
    return `
      <div class="empty-result-container mt-4">
        <img src="${CONFIG.IMAGE_PATH.ILLUST}/404.png" alt="404 Illustration" class="empty-img">
        <h1 class="text-secondary mt-2 text-center">Desain tidak ditemukan.</h1>
        <h2 class="mt-2 h6 text-secondary">
          Temukan desain terbaik <a href="#/" class="text-primary">Disini</a>.
        </h2>
      </div>
    `;
  },

  postDetail(post, userId = null) {
    const { month, date, year } = DateHelper.parse(post.date);

    return `
      <div class="d-flex align-items-center">
        <a href="#/profile/${post.username}/" class="user-image">
          <img src="${CONFIG.IMAGE_PATH.USER}/${post.user_image}" alt="${post.username} profile picture">
        </a>

        <div class="d-flex flex-column ml-2">
          <span class="font-weight-bold">${post.title}</span>

          <a href="#/profile/${post.username}/" class="text-decoration-none hover:text-primary">
            ${post.username}
          </a>
        </div>

        <button class="bg-transparent border-0 ml-auto text-primary" id="bookmark">
        </button>
      </div>

      <div class="card shadow mt-4">
        <img src="${CONFIG.IMAGE_PATH.POST}/${post.image}" alt="${post.title} Image" class="card-img-top w-100">

        <div class="bg-dark py-5">
          <button 
            class="like d-block mx-auto btn btn-primary rounded-circle ${post.likes.includes(userId) ? 'liked' : ''}" 
            aria-label="${post.likes.includes(userId) ? 'dislike this design' : 'like this design'}"
          >
            ${post.likes.includes(userId) ? this.likedIcon({ color: false }) : this.likeIcon()}
          </button>

          <h1 class="h2 font-weight-bold text-white text-center mt-2">${post.title}</h1>
          <span class="text-secondary d-block text-center my-2">${date} ${month} ${year}</span>
          <div class="d-flex justify-content-center align-items-center text-secondary">
            <i class="far fa-thumbs-up"></i>
            <span class="ml-1">${post.likes.length}<span class="sr-only"> like this design</span></span>

            <i class="far fa-comment ml-2"></i>
            <span class="ml-1">${post.comments.length}<span class="sr-only"> commented this design</span></span>

            <i class="far fa-eye ml-2"></i>
            <span class="ml-1">${post.insight}<span class="sr-only"> commented this design</span></span>
          </div>

          <button type="button" class="btn btn-primary d-block mx-auto mt-4" id="share-btn">
          <i class="fas fa-share-alt mr-1"></i> Bagikan
          </button>
        </div>

        <div class="card-body">
          <span class="post-caption pre-wrap"></span>
        </div>

        <div class="card-footer">
          <div class="card">
            <div class="card-header" id="comment-form-container"></div>

            <div class="card-body">
              <span class="h2 card-title">Komentar</span>

              <div id="comments-container">
                <div class="loading-container">
                  <div class="spinner-border text-secondary" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                </div>
              </div>

              <div class="d-flex" id="load-btn"></div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  postCommentForm(user) {
    return `
      <form class="w-100 d-flex justify-content-around align-items-center" id="comment-form">
        <div class="user-image d-none d-lg-block">
          <img src="${CONFIG.IMAGE_PATH.USER}/${user.image}" alt="${user.username} profile picture">
        </div>

        <input type="text" placeholder="Berikan komentar ..." id="comment-text" class="form-control rounded-pill lg:w-85" autocomplete="off" required>

        <button type="submit" class="btn btn-primary rounded-circle ml-2 ml-lg-0" aria-label="send"><i
            class="fas fa-paper-plane"></i></button>
      </form>
    `;
  },

  postCommentLogin() {
    return `
      <span class="h5 text-secondary text-center d-block"><a href="#/sign-in/">Masuk</a> untuk memberi komentar</span>
    `;
  },

  postEmptyComment() {
    return `
      <div class="p-5 d-flex flex-column align-items-center">
        <i class="far fa-smile-wink h1 text-secondary"></i>
        <span class="text-secondary h5 mt-2">Belum ada komentar untuk saat ini.</span>
        <span class="mt-2 h6 text-secondary">
          Jadilah yang pertama mengomentari desain ini.
        </span>
      </div>
    `;
  },

  postComment(comment) {
    const { month, date, year } = DateHelper.parse(comment.date);

    return `
      <div class="d-flex pt-4">
        <div>
          <a href="#/profile/${comment.username}" class="user-image-sm d-block mr-2 mr-lg-3">
            <img src="${CONFIG.IMAGE_PATH.USER}/${comment.user_image}" alt="${comment.username} Profile Picture">
          </a>
        </div>

        <div class="d-flex flex-column">
          <div class="d-flex align-items-center">
            <a href="#/profile/${comment.username}" class="font-weight-bold text-decoration-none hover:text-primary">${comment.username}</a>
            <span class="text-sm ml-1">| ${date} ${month} ${year}</span>
          </div>

          <span>${comment.body}</span>
        </div>
      </div>
    `;
  },

  postEditBtn(post) {
    return `
      <a id="edit" href="#/edit-post/${post.id}/" class="btn btn-info rounded-circle btn-float" aria-label="Edit post"><i class="fas fa-pen"></i></a>
    `;
  },

  newPost() {
    return `
      <div class="container mt-4" id="new-post">
        <div class="row">
          <div class="col-sm-12 col-md-6 offset-md-3">
            <div class="card shadow-sm mt-3 mx-auto">
              <div class="card-body">
                <span class="card-title d-block font-weight-bold h3 text-center mb-3">Portofolio Baru</span>

                <form id="post-form">
                  <div class="form-group">
                    <label for="title">Judul</label>
                    <input type="text" placeholder="Judul" class="form-control" id="title" autocomplete="off" maxlength="${CONFIG.MAX_LENGTH.POST.TITLE}" required>
                  </div>

                  <div class="form-group">
                    <label for="caption">Deskripsi</label>
                    <textarea class="form-control" id="caption" rows="3" placeholder="Deskripsi"></textarea>
                  </div>

                  <div class="form-group mb-3">
                    <label for="colors">Warna Dasar</label>
                    <select class="custom-select" id="colors" required>
                    </select>
                  </div>

                  <div class="form-group mb-3">
                    <label for="categories">Kategori</label>
                    <select class="custom-select" id="categories" required>
                    </select>
                  </div>

                  <div class="form-group">
                    <label for="post-image">Upload Berkas</label>
                    <div class="custom-file">
                      <input type="file" class="custom-file-input" id="post-image" required>
                      <label class="custom-file-label" for="post-image">Pilih Berkas</label>
                    </div>
                  </div>

                  <button type="submit" class="btn btn-primary d-block mx-auto mt-4">Buat</button>

                  <div class="d-none mt-4" id="preview-image">
                    <img src="" alt="preview" style="width: 100%;">
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  editPost() {
    return `
      <div class="container mt-4" id="edit-post">
        <div class="row">
          <div class="col-sm-12 col-md-6 offset-md-3">
            <div class="card shadow-sm mt-3 mx-auto">
              <div class="card-body">
                <span class="card-title d-block font-weight-bold h3 text-center mb-3">Edit portofolio</span>

                <form id="post-form">
                  <div class="form-group">
                    <label for="title">Judul</label>
                    <input type="text" placeholder="Judul" class="form-control" id="title" autocomplete="off" maxlength="${CONFIG.MAX_LENGTH.POST.TITLE}" required>
                  </div>

                  <div class="form-group">
                    <label for="caption">Deskripsi</label>
                    <textarea class="form-control" id="caption" rows="4" placeholder="Deskripsi"></textarea>
                  </div>

                  <div class="form-group mb-3">
                    <label for="colors">Warna Dasar</label>
                    <select class="custom-select" id="colors" required>
                    </select>
                  </div>

                  <div class="form-group mb-3">
                    <label for="categories">Kategori</label>
                    <select class="custom-select" id="categories" required>
                    </select>
                  </div>
        
                  <div class="d-flex justify-content-evenly align-items-center">
                    <button type="button" id="delete-button" class="btn btn-danger d-block mx-auto mt-4">Hapus</button>
                    <button type="submit" class="btn btn-primary d-block mx-auto mt-4">Simpan</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  searchPage() {
    return `
      <div class="container mt-4" id="search">
        <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-8">
            <form class="form-block" id="search-form">
              <div class="input-group">
                <input type="text" class="form-control" placeholder="Cari ..." id="search-input" aria-label="Search" autocomplete>

                <div class="input-group-append">
                  <button class="btn btn-outline-primary" type="submit" aria-label="search">
                    <i class="fas fa-search"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div class="col-sm-12 col-md-6 col-lg-4 mt-3 mt-md-0">
            <ul class="nav nav-pills nav-fill" id="search-nav"></ul>
          </div>

          <div class="col-sm-12 col-md-6">
            <div class="collapse" id="filter">
              <div class="mt-3 d-flex" id="filter-input"></div>
            </div>  
          </div>
        </div>


        <div class="row my-4 post-list" id="result-container">
          <div class="col-12 loading-container">
            <div class="spinner-border text-secondary" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        </div>

        <div class="d-flex" id="load-btn"></div>
      </div>
    `;
  },

  searchUserNav(keyword = '') {
    return `
      <li class="nav-item">
        <a href="#/search-post/${keyword}" class="nav-link">Desain</a>
      </li>
      <li class="nav-item">
        <a href="#/search-user/${keyword}" class="nav-link active disabled">Pengguna</a>
      </li>
      <li class="nav-item">
        <button class="btn btn-outline-primary" data-toggle="collapse" data-target="#filter">
          <i class="fas fa-filter"></i> Filter
        </button>
      </li>
    `;
  },

  searchUserFilter() {
    return `
      <div class="w-50 mr-1">
        <label for="province">Provinsi</label>
        <select class="custom-select" id="province" required>
        </select>
      </div>

      <div class="w-50 ml-1">
        <label for="city">Kabupaten/Kota</label>
        <select class="custom-select" id="city" required>
        </select>
      </div>
    `;
  },

  searchUserResult(user) {
    return `
      <div class="col-12 col-md-6 col-lg-4 mb-3">
        <div class="card shadow">
          <a href="#/profile/${user.username}/" class="card-body d-flex align-items-center text-decoration-none">
            <div class="user-image-lg mr-4">
              <img src="${CONFIG.IMAGE_PATH.USER}/${user.image}" alt="${user.username} Profile Picture">
            </div>

            <div class="d-flex flex-column hover:text-primary">
              <span class="font-weight-bold">${user.username}</span>
              <span class="font-weight-bold text-sm">${user.city_name.split(' ').splice(1).join(' ')}</span>
              <span class="font-weight-bold text-sm">${user.province_name}</span>
            </div>
          </a>
        </div>
      </div>
    `;
  },

  searchPostNav(keyword = '') {
    return `
      <li class="nav-item">
        <a href="#/search-post/${keyword}" class="nav-link active disabled">Desain</a>
      </li>
      <li class="nav-item">
        <a href="#/search-user/${keyword}" class="nav-link">Pengguna</a>
      </li>
      <li class="nav-item">
        <button class="btn btn-outline-primary" data-toggle="collapse" data-target="#filter">
          <i class="fas fa-filter"></i> Filter
        </button>
      </li>
    `;
  },

  searchPostFilter() {
    return `
      <div class="w-50 mr-1">
        <label for="categories">Kategori</label>
        <select class="custom-select" id="categories" required>
        </select>
      </div>

      <div class="w-50 ml-1">
        <label for="colors">Warna</label>
        <select class="custom-select" id="colors" required>
        </select>
      </div>
    `;
  },

  mostLikesPostsTitle() {
    return `
      <div class="col-12">
        <h1 class="my-4">Paling Disukai</h1>
      </div>
    `;
  },

  mostLikesPosts(post, userId = null) {
    const { month, date, year } = DateHelper.parse(post.date);

    return `
      <div class="col-sm-12 col-md-6 col-lg-4 mb-4">
        <div class="card border-0 border-radius-5px overflow-hidden">
          <a href="#/post/${post.id}/" class="post-img-container border-radius-5px">
            <img src="${CONFIG.IMAGE_PATH.POST}/${post.image}" class="post-img" alt="${post.title} image">

            <!-- <div class="hover-post">
              <i class="fas fa-search" aria-label="visit ${post.title}"></i>
            </div> -->
          </a>
          
          <div class="card-body px-0 pt-2">
            <div class="d-flex align-items-center">
              <div class="d-flex align-items-center">
                <a href="#/profile/${post.username}/" class="user-image">
                  <img src="${CONFIG.IMAGE_PATH.USER}/${post.user_image}" alt="user-image">
                </a>

                <div class="d-flex flex-column ml-2">
                  <a href="#/post/${post.id}/" class="text-decoration-none hover:text-primary">${post.title}</a>

                  <a href="#/profile/${post.username}/" class="text-decoration-none hover:text-primary text-sm">${post.username}</a>
                </div>
              </div>

              <div class="d-flex align-items-center ml-auto">
                <button post-id="${post.id}" class="like border-0 p-0 mr-1 bg-transparent hover:text-primary ${post.likes.includes(userId) ? 'liked' : ''}" aria-label="${post.likes.includes(userId) ? 'batal sukai' : 'sukai'}">
                  ${post.likes.includes(userId) ? this.likedIcon() : this.likeIcon()}
                </button>

                <span class="pb-2px">${post.likes.length}<span class="sr-only"> meyukai desain ini</span></span>

                <a href="#/post/${post.id}/" class="hover:text-primary pb-2px ml-2 mr-1" aria-label="komentari desain ini">
                  <i class="far fa-comment"></i>
                </a>

                <span class="pb-2px">${post.comments.length}<span class="sr-only"> mengomentari</span></span>
                
                
                <i class="far fa-eye ml-2 mr-1"></i>
                
                <span class="pb-2px">${post.insight}<span class="sr-only"> melihat desain ini</span></span>
              </div>
            </div>
          </div>

          <!-- <div class="card-footer d-flex">
            <span class="d-block mx-auto">${date} ${month} ${year}</span>
          </div> -->
        </div>
      </div>
    `;
  },

  mostLikesPostsEmpty() {
    return `
      <div class="col-12 empty-result-container">
        <span class="h4 text-secondary text-center">Belum ada postingan yang disukai untuk saat ini.</span>
      </div>
    `;
  },

  searchPostResult(post, userId = null) {
    const { month, date, year } = DateHelper.parse(post.date);

    return `
      <div class="col-sm-12 col-md-6 col-lg-4 mb-4">
        <div class="card border-0 border-radius-5px overflow-hidden">
          <a href="#/post/${post.id}/" class="post-img-container border-radius-5px">
            <img src="${CONFIG.IMAGE_PATH.POST}/${post.image}" class="post-img" alt="${post.title} image">

            <!-- <div class="hover-post">
              <i class="fas fa-search" aria-label="visit ${post.title}"></i>
            </div> -->
          </a>
          
          <div class="card-body px-0 pt-2">
            <div class="d-flex align-items-center">
              <div class="d-flex align-items-center">
                <a href="#/profile/${post.username}/" class="user-image">
                  <img src="${CONFIG.IMAGE_PATH.USER}/${post.user_image}" alt="user-image">
                </a>

                <div class="d-flex flex-column ml-2">
                  <a href="#/profile/${post.username}/" class="text-decoration-none hover:text-primary text-sm">${post.username}</a>

                  <a href="#/post/${post.id}/" class="text-decoration-none hover:text-primary">${post.title}</a>
                </div>
              </div>

              <div class="d-flex align-items-center ml-auto">
                <button post-id="${post.id}" class="like border-0 p-0 mr-1 bg-transparent hover:text-primary ${post.likes.includes(userId) ? 'liked' : ''}" aria-label="${post.likes.includes(userId) ? 'batal sukai' : 'sukai'}">
                  ${post.likes.includes(userId) ? this.likedIcon() : this.likeIcon()}
                </button>

                <span class="pb-2px">${post.likes.length}<span class="sr-only"> meyukai desain ini</span></span>

                <a href="#/post/${post.id}/" class="hover:text-primary pb-2px ml-2 mr-1" aria-label="komentari desain ini">
                  <i class="far fa-comment"></i>
                </a>

                <span class="pb-2px">${post.comments.length}<span class="sr-only"> mengomentari</span></span>
                
                
                <i class="far fa-eye ml-2 mr-1"></i>
                
                <span class="pb-2px">${post.insight}<span class="sr-only"> melihat desain ini</span></span>
              </div>
            </div>
          </div>

          <!-- <div class="card-footer d-flex">
            <span class="d-block mx-auto">${date} ${month} ${year}</span>
          </div> -->
        </div>
      </div>
    `;
  },

  searchEmptyResult() {
    return `
      <div class="col-12 empty-result-container">
        <i class="fas fa-search h1 font-weight-bolder text-secondary" aria-label="no result illustration"></i>
        <span class="h4 text-secondary text-center">Hasil pencarian tidak ditemukan.</span>
      </div>
    `;
  },
};

export default Templates;
