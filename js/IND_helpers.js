validateEmptyField = (text, error_div) => {
  if(!text) {
    showError(error_div, 'Halaman harus di isi.') 
    return false
  }
  return true
}

validatePasswordConfirmation = (password, password_confirmation, error_div) => {
  if(password != password_confirmation) {
    showError(error_div, 'Konfirmasi kata sandi salah') 
    return false
  }
  return true
}

validateEmail = (email, error_div) => {
  let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if(!re.test(email)) {
    showError(error_div, 'Format alamat Email salah') 
    return false
  }
  return true
}

showError = (error_div, error_msg) => {
  error_div.text(error_msg)
  error_div.attr('style', 'display:block')
}
