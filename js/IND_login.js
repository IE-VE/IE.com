let error_div = $('#error_div')
let success_div = $('#success_div')

const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)

let email_verified = urlParams.get('email_verified')
let is_logout = urlParams.get('is_logout')
let login_first = urlParams.get('lf')
let must_buy = urlParams.get('mb')

if(email_verified == 1) {
  success_div.attr('style', 'display:block')
  success_div.html('Email anda telah di verifikasi. Anda bisa masuk sekarang.') 

  setTimeout(() => {
    success_div.attr('style', 'display:none')
  }, 5000)
}

if(is_logout == 1) {
  success_div.attr('style', 'display:block')
  success_div.html('Anda telah keluar. Terimakasih.') 

  setTimeout(() => {
    success_div.attr('style', 'display:none')
  }, 5000)
}

if(login_first == 1) {
  error_div.attr('style', 'display:block')
  error_div.html('Silakan Log in untuk melihat Video VE ini.') 

  setTimeout(() => {
    error_div.attr('style', 'display:none')
  }, 5000)
}

if(must_buy == 1) {
  error_div.attr('style', 'display:block')
  error_div.html('Silakan bayar untuk melihat video ini.') 

  setTimeout(() => {
    error_div.attr('style', 'display:none')
  }, 5000)
}


$('#loginForm').on('submit', (e) => {
  e.preventDefault()

  let email = $('#email').val()
  let password = $('#password').val()

  let validation = validateEmptyField(email, error_div)
  if(validation) {
    validation = validateEmptyField(password, error_div)
  }

  if(validation) {
    error_div.attr('style', 'display:none')
    success_div.attr('style', 'display:block')
    success_div.text('Memverifikasi pengguna. Meneruskan masuk...') 

    let data = {
      email: email,
      password: password
    }

    $.get("https://cp.insideielts.com/api/login", data, (response) => {
      let response_data = JSON.parse(response)

      if(response_data.result == true) {
        error_div.attr('style', 'display:none')
        success_div.attr('style', 'display:block')
        success_div.html(response_data.err + '<br>Mengalihkan ulang ke halaman utama dalam 3 detik...') 

        localStorage.setItem('api_code', response_data.api_code)

        setTimeout(() => {
          window.location.replace("/IND_index.html")
        }, 3000)
      } else {
        error_div.attr('style', 'display:block')
        success_div.attr('style', 'display:none')
        error_div.html(response_data.err)
      }
    })
  }

})
