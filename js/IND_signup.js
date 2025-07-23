$('#signupForm').on('submit', (e) => {
  e.preventDefault()

  let error_div = $('#error_div')
  let success_div = $('#success_div')

  let email = $('input[name="email"]').val()
  let password = $('input[name="password"]').val()
  let password_confirmation = $('input[name="password_confirmation"]').val()

  //validation
  let validation = validateEmail(email, error_div)
  if(validation) {
    validation = validateEmptyField(email, error_div)
    if(validation) {
      validation = validatePasswordConfirmation(password, password_confirmation, error_div)
    }
  }
  //###

  if(validation) {
    error_div.attr('style', 'display:none')
    success_div.attr('style', 'display:block')
    success_div.text('Signing up your account ...')

    //start processing data
    let data = {
      email: email,
      password: password,
    }

    $.get("https://cp.insideielts.com/api/signup", data, (response) => {
      let response_data = JSON.parse(response)

      if(response_data.result == true) {
        error_div.attr('style', 'display:none')
        success_div.attr('style', 'display:block')
        success_div.html(response_data.err + '<br>Mengarahkan untuk masuk ke halaman dalam 5 detik...')  

        setTimeout(() => {
          window.location.replace("/login.html")
        }, 5000)
      } else {
        error_div.attr('style', 'display:block')
        success_div.attr('style', 'display:none')
        error_div.html(response_data.err)
      }
    })
  }

})
