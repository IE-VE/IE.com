let api_code = localStorage.getItem('api_code')

processForm = (form_id) => {
  $('#' + form_id).submit((e) => {
    e.preventDefault()
    if(api_code) {
      let data = {
        api_code: api_code,
        skill_id: $('#skill_id').val(),
        answers: $('input[name="answers[]"]').map(function(){return $(this).val();}).get()
      }

      $.post("https://cp.insideielts.com/api/skillchecksave", data, function(response) {
        let response_data = JSON.parse(response)

        alert(response_data.msg)

        if(response_data.result == true) {
          $('#' + form_id).find('input[type=submit]').remove()
        }
      })

    } else {
      alert('You should login first.')
    }

  })
}
