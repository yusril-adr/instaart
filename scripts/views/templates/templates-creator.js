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
          <img src="./public/images/logo.png" width="32" height="32" alt="Logo" class="d-inline-block align-top">
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
          <img src="./public/images/logo.png" width="32" height="32" alt="Logo" class="d-inline-block align-top">
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
          <img src="./public/images/illust/work.svg" alt="Illustration">
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

  signUp: () =>`
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
};

export default Templates;
