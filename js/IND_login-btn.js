let api_code = localStorage.getItem('api_code', '')

if(api_code) {
  $('#small-nav ul > li:last').before('<li class="login-link"><a style="color: #17c3b2; padding-left: 0px" class="main-nav-link logoutBtn" href="#">Keluar</a></li>')
  $('.nav-cta').before('<div class="right-bar login-btn"><a style="color: #17c3b2; margin-right: 8px" class="main-nav-link logoutBtn" href="#">Keluar</a></div>')

  $('.logoutBtn').on('click', (e) => {
    e.preventDefault()

    localStorage.removeItem('api_code')
    window.location.replace('/IND_login.html?is_logout=1')
  })
} else {

  $('#small-nav ul > li:last').before('<li class="login-link"><a style="color: #17c3b2" href="IND_signup.html">Daftar</a></li>')
  $('#small-nav ul > li:last').before('<li class="login-link"><a style="color: #17c3b2" href="IND_login.html">Masuk</a></li>')


  const queryString = window.location.pathname

  if(queryString.indexOf("login") != -1) {
    $('.nav-cta').before('<div class="right-bar login-btn"><a class="main-nav-link" style="margin-right: 8px" href="IND_signup.html">Daftar</a><br><a class="main-nav-link current" style="margin-right: 8px" href="IND_login.html">Masuk</a></div>')
  } else if (queryString.indexOf("signup") != -1) {
    $('.nav-cta').before('<div class="right-bar login-btn"><a class="main-nav-link current" style="margin-right: 8px" href="IND_signup.html">Daftar</a><br><a class="main-nav-link" style="margin-right: 8px" href="IND_login.html">Masuk</a></div>')
  } else {
    $('.nav-cta').before('<div class="right-bar login-btn"><a class="main-nav-link" style="margin-right: 8px" href="IND_signup.html">Daftar</a><br><a class="main-nav-link" style="margin-right: 8px" href="IND_login.html">Masuk</a></div>')
  }

}


//Additional CSS for sign up, login and logout bar
$('head').before('<style>.right-bar a.main-nav-link{color:#17c3b2 !important; padding:5px 0;} a.main-nav-link.current{color:#17c3b2 !important; padding:5px 0;border-radius: 9px;background-color: #333; font-weight: bolder;}</style>')

//To position the sign up, login and logout bar
let ve_width = $('.nav-cta')[0].offsetWidth
let right_width = $('.right-bar')[0].offsetWidth
$('.right-bar').css('right', ve_width + right_width)
