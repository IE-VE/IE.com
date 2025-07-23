let api_code = localStorage.getItem('api_code', '')

if(api_code) {
  $('#small-nav ul > li:last').before('<li class="login-link"><a style="color: #17c3b2; padding-left: 0px" class="main-nav-link logoutBtn" href="#">Log out</a></li>')
  $('.nav-cta').before('<div class="right-bar login-btn"><a style="color: #17c3b2" class="main-nav-link logoutBtn" href="#">Log out</a></div>')

  $('.logoutBtn').on('click', (e) => {
    e.preventDefault()

    localStorage.removeItem('api_code')
    window.location.replace('/login.html?is_logout=1')
  })
} else {

  $('#small-nav ul > li:last').before('<li class="login-link"><a style="color: #17c3b2" href="signup.html">Sign up</a></li>')
  $('#small-nav ul > li:last').before('<li class="login-link"><a style="color: #17c3b2" href="login.html">Log in</a></li>')


  const queryString = window.location.pathname

  if(queryString.indexOf("login") != -1) {
    $('.nav-cta').before('<div class="right-bar login-btn"><a class="main-nav-link" href="signup.html">Sign up</a><br><a class="main-nav-link current" href="login.html">Log in</a></div>')
  } else if (queryString.indexOf("signup") != -1) {
    $('.nav-cta').before('<div class="right-bar login-btn"><a class="main-nav-link current" href="signup.html">Sign up</a><br><a class="main-nav-link" href="login.html">Log in</a></div>')
  } else {
    $('.nav-cta').before('<div class="right-bar login-btn"><a class="main-nav-link" href="signup.html">Sign up</a><br><a class="main-nav-link" href="login.html">Log in</a></div>')
  }

}


//Additional CSS for sign up, login and logout bar
$('head').before('<style>.right-bar a.main-nav-link{color:#17c3b2 !important; padding:5px 0;} a.main-nav-link.current{color:#17c3b2 !important; padding:5px 0;border-radius: 9px;background-color: #333; font-weight: bolder;}</style>')

//To position the sign up, login and logout bar
let ve_width = $('.nav-cta')[0].offsetWidth
let right_width = $('.right-bar')[0].offsetWidth
$('.right-bar').css('right', ve_width + right_width)
