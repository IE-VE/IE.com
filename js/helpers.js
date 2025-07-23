validateEmptyField = (text, error_div) => {
  if(!text) {
    showError(error_div, 'Field must be filled.')
    return false
  }

  return true
}

validatePasswordConfirmation = (password, password_confirmation, error_div) => {
  if(password != password_confirmation) {
    showError(error_div, 'Invalid Password Confirmation')
    return false
  }
  return true
}

validateEmail = (email, error_div) => {
  let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if(!re.test(email)) {
    showError(error_div, 'Invalid Email Format')
    return false
  }
  return true
}

showError = (error_div, error_msg) => {
  error_div.text(error_msg)
  error_div.attr('style', 'display:block')
}
