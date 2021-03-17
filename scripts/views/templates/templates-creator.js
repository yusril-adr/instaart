import CONFIG from '../../global/config.js';
import DateHelper from '../../utils/date-helper.js';

const Templates = {
  hidePasswordToggler: () => `
    <i class="far fa-eye-slash"></i>
  `,

  showPassswordToggler: () => `
    <i class="far fa-eye"></i>
  `,

  header: () => `
    <div class="container">
      <nav class="navbar navbar-expand-lg navbar-light">
        <a class="navbar-brand" href="#/">
          <img src="${CONFIG.IMAGE_PATH.BASE}/logo.png" width="32" height="32" alt="Logo" class="d-inline-block align-top">
          <span class="font-redressed font-weight-bold ml-2">InstaArt</span>
        </a>

        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <form class="form-inline ml-auto my-2 my-lg-0" id="navbar-search-form">
            <div class="input-group">
              <input type="text" class="form-control" id="navbar-search-input" placeholder="Search ..." aria-label="Search" autocomplete="off" required>

              <div class="input-group-append">
                <button class="btn btn-outline-primary" type="submit" aria-label="search"><i class="fas fa-search"></i></button>
              </div>
            </div>
          </form>

          <a href="#/sign-up/" class="mt-2 mt-lg-0 ml-lg-4 btn btn-primary">Join us</a>
        </div>
      </nav>
    </div>
  `,

  loginHeader: () => `
    <div class="container">
      <nav class="navbar navbar-expand-lg navbar-light">
        <a class="navbar-brand" href="#/">
          <img src="${CONFIG.IMAGE_PATH.BASE}/logo.png" width="32" height="32" alt="Logo" class="d-inline-block align-top">
          <span class="font-redressed font-weight-bold ml-2">InstaArt</span>
        </a>

        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <form class="form-inline ml-auto my-2 my-lg-0" id="navbar-search-form">
            <div class="input-group">
              <input type="text" class="form-control" id="navbar-search-input" placeholder="Search ..." aria-label="Search" autocomplete="off" required>

              <div class="input-group-append">
                <button class="btn btn-outline-primary" type="submit" id="search" aria-label="search"><i class="fas fa-search"></i></button>
              </div>
            </div>
          </form>

          <ul class="navbar-nav mx-lg-4">
            <li class="nav-item home">
              <a class="nav-link" href="#/"><i class="fas fa-home"></i> <span class="d-lg-none">Home</span></a>
            </li>
            <li class="nav-item new-post">
              <a class="nav-link" href="#/new-post/"><i class="fas fa-plus-circle"></i> <span class="d-lg-none">New Post</span></a>
            </li>
            <li class="nav-item profile">
              <a class="nav-link" href="#/profile/"><i class="fas fa-user-circle"></i> <span class="d-lg-none">Profile</span></a>
            </li>

            <li class="nav-item">
              <a class="nav-link" href="#/sign-out/"><i class="fas fa-sign-out-alt"></i> <span class="d-lg-none">Sign out</span></a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  `,

  homepage: () => `
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
                  <input type="text" placeholder="Username or Email" class="form-control" id="identifier" autocomplete="off" required>
                </div>

                <div class="form-group">
                  <label for="password">Password</label>

                  <div class="input-group">
                    <input type="password" placeholder="Password" class="form-control" id="password" autocomplete="off" required>
    
                    <div class="input-group-append">
                      <button type="button" class="btn btn-light" id="password-toggler" aria-label="show password">
                        <i class="far fa-eye"></i>
                      </button>
                    </div>
                  </div>
                </div>
      
                <button type="submit" class="btn btn-primary d-block mx-auto">Sign in</button>
              </form>
            </div>
          </div>

          <div style="width: 320px;" class="card shadow-sm mt-3 mx-auto">
            <div class="card-body d-flex justify-content-center">
              Don't have account?
              <a href="#/sign-up/" class="ml-2 font-weight-bold text-primary">Sign up</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,

  signUpPage: () =>`
    <div class="container" id="sign-up">
      <div class="row">
        <div class="col-sm-12 col-md-6 offset-md-3">
          <div class="card shadow-sm mt-3 mx-auto">
            <div class="card-body">
              <span class="card-title d-block font-redressed font-weight-bold h1 text-center mb-3">InstaArt</span>

              <form id="signup-form">
                <div class="form-group">
                  <label for="username">Username</label>
                  <input type="text" placeholder="Username" class="form-control" id="username" autocomplete="off" required>
                </div>

                <div class="form-group">
                  <label for="email">Email</label>
                  <input type="email" placeholder="Email" class="form-control" id="email" autocomplete="off" required>
                </div>

                <div class="form-group">
                  <label for="password">Password</label>

                  <div class="input-group">
                    <input type="password" placeholder="Password" class="form-control" id="password" autocomplete="off" required>

                    <div class="input-group-append">
                      <button type="button" class="btn btn-light" aria-label="show password" id="password-toggler"><i class="far fa-eye"></i></button>
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <label for="confirm-password">Confirm Password</label>

                  <div class="input-group">
                    <input type="password" placeholder="Confirm Password" class="form-control" id="confirm-password" autocomplete="off" required>

                    <div class="input-group-append">
                      <button type="button" class="btn btn-light" id="confirm-password-toggler" aria-label="show password"><i class="far fa-eye"></i></button>
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <label for="display-name">Display name</label>
                  <input type="text" placeholder="Display name" class="form-control" id="display-name" autocomplete="off" required>
                </div>

                <div class="form-group">
                  <label for="phone-number">Phone number</label>
                  <input type="text" placeholder="Ex: 08xxx" class="form-control" id="phone-number" autocomplete="off" required>
                </div>

                <div class="form-group">
                  <label for="biodata">Bio</label>
                  <textarea class="form-control" id="biodata" rows="4" placeholder="Tell something about yourself"></textarea>
                </div>
      
                <button type="submit" class="btn btn-primary d-block mx-auto">Sign up</button>
              </form>
            </div>
          </div>

          <div class="card shadow-sm mt-3 mx-auto">
            <div class="card-body d-flex justify-content-center">
              Have an account?
              <a href="#/" class="ml-2 font-weight-bold text-primary">Sign in</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,

  profilePage: () =>`
    <div class="container" id="profile">
      <div class="row">
        <div class="col-sm-12 col-lg-10 offset-lg-1">
          <div class="card shadow-sm">
            <div class="bg-primary bg-cubes min-h-200px"></div>

            <div class="card-body position-relative d-flex flex-column align-items-center">
              <div class="user-image-lg position-absolute -top-3 bg-grey user-image-border">
                <img src="${CONFIG.IMAGE_PATH.USER}/default_user.png" alt="Profile image" class="user-image-element">
              </div>

              <div class="d-flex flex-column align-items-center mt-2rem">
                <span class="h4 text-center user-display-name"></span>
                <span class="h6 text-secondary text-center user-username"></span>

                <div id="user-button-container"></div>

                <span class="mt-3 user-bio"></span>
              </div>
            </div>
          </div>
        </div>

        <div class="col-sm-12 col-md-6 col-lg-4 offset-lg-1 mt-4">
          <div class="card shadow max-h-250px">
            <div class="card-header text-center">
              Profile
            </div>

            <ul class="list-group list-group-flush">
              <li class="list-group-item d-flex justify-content-between align-items-center">
                <span>Followers</span>
                <span class="user-followers"></span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center">
                <span>Following</span>
                <span class="user-following"></span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center">
                <span>Email</span>
                <span class="user-email"></span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center">
                <span>Phone Number</span>
                <span class="user-phone-number"></span>
              </li>
            </ul>
          </div>
        </div>

        <div class="col-sm-12 col-md-6 post-list">
          <div class="loading-container">
            <div class="spinner-border text-secondary" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,

  profileNotFound: () =>`
    <div class="empty-result-container">
      <img src="${CONFIG.IMAGE_PATH.ILLUST}/404.png" alt="404 Illustration" class="empty-img">
      <span class="text-secondary mt-2 h1">User not found.</span>
      <span class="mt-2 h6 text-secondary">
        Find best design <a href="#/" class="text-primary">Here</a>.
      </span>
    </div>
  `,

  profileNewPost: () =>`
    <a id="edit" href="#/new-post/" class="btn btn-info rounded-circle btn-float" aria-label="New post">
      <i class="fas fa-plus"></i>
    </a>
  `,

  profileEditBtn: () =>`
    <a href="#/edit-profile/" class="btn btn-outline-primary mt-2">
      <i class="far fa-edit"></i> Edit profile
    </a>
  `,

  profileFollowBtn: () =>`
    <button class="btn btn-outline-primary my-3" id="follow">Follow</button>
  `,

  profileUnfollowBtn: () =>`
    <button class="btn btn-primary my-3" id="unfollow">Unfollow</button>
  `,

  profileEmptyPostsList: () => `
    <div class="empty-result-container">
      <i class="far fa-smile-wink h1 text-secondary"></i>
      <span class="h4 text-secondary">There aren't any post right now.</span>
    </div>
  `,

  profilePost: (post) => {
    const { month, date, year } = DateHelper.parse(post.date);
    
    return `
      <div class="card shadow rounded mt-4">
        <a href="#/profile/${post.username}/" class="card-header d-flex align-items-center text-decoration-none hover:text-primary">
          <div class="user-image-sm">
            <img src="${CONFIG.IMAGE_PATH.USER}/${post.user_image}" alt="${post.username} profile picture">
          </div>

          <span class="ml-2">${post.username}</span>
        </a>

        <a href="./post/${post.id}" class="post-img-container">
          <img src="${CONFIG.IMAGE_PATH.POST}/${post.image}" class="post-img" alt="${post.title}">

          <div class="hover-post">
            <i class="fas fa-search" aria-label="visit ${post.title}"></i>
          </div>
        </a>
        
        <div class="card-body">
          <div class="d-flex align-items-center mb-2">
            <button post-id="${post.id}" class="like border-0 p-0 mr-1 bg-transparent hover:text-primary" aria-label="like this design">
              <i class="far fa-thumbs-up"></i>
            </button>

            <span class="pb-2px">${post.likes.length}<span class="sr-only"> like this design</span></span>

            <a href="#/post/${post.id}/" class="hover:text-primary pb-2px ml-2 mr-1" aria-label="comment this design">
              <i class="far fa-comment"></i>
            </a>

            <span class="pb-2px">${post.comments.length}<span class="sr-only"> commented this design</span></span>
          </div>

          <a href="#/post/${post.id}/" class="card-title text-decoration-none hover:text-primary h5">${post.title}</a>
        </div>

        <div class="card-footer d-flex">
          <span class="d-block mx-auto">${month} ${date}, ${year}</span>
        </div>
      </div>
    `;
  },
};

export default Templates;
