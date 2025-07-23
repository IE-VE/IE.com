let interviews = $(".INT")
let usd_rate = 15000

if(api_code) {
  // ini sudah login, jadi cek apakah sudah pernah beli atau belum
  let data = {
    api_code: api_code
  }

  //ambil data user
  $.post("https://cp.insideielts.com/apicode", data, (response) => {
    let response_data = JSON.parse(response)

    if(response_data.result == true) {
      $('#first_name').val(response_data.user.first_name)
      $('#last_name').val(response_data.user.last_name)
      $('#address').val(response_data.user.address)
      $('#city').val(response_data.user.city)
      $('#state').val(response_data.user.state)
      $('#postal_code').val(response_data.user.postal_code)
      $('#phone').val(response_data.user.phone)
    } else {
      window.location.replace("/index.html")
    }
  })

  $.post("https://cp.insideielts.com/api/boughtproducts", data, (response) => {
    let response_data = JSON.parse(response)

    if(response_data.result == true) {
      let transactions = response_data.transactions
      interviews.each((i, o) => {
        let productname = $(o).find('a').data('productname')
        let price = $(o).find('a').data('price')

        // loop check isi array
		if(typeof productname !== "undefined") {
			if(!transactions.includes(productname)){
			  //kalau di sini artinya belum beli
			  $(o).find('a').attr('href', 'payment.html?pn=' + productname + '&p=' + price)
			} else {
			  //kalau di sini artinya sudah beli
			  //hilangkan harga
			  $(o).find('div .' + productname + '_price').remove()
			}
		}
      })
    }
  })


} else {
  // Ini belum login, arahkan ke halaman login
  interviews.find('a').attr('href', 'login.html')
}



const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
let product_name = urlParams.get('pn')
let amount = urlParams.get('p')
$('#product_name').val(product_name)
$('#amount').val(amount)

function checkOut () {
  $('#submit_data_btn').hide()
  $('#success_div').show();

  let data = {
    api_code: api_code,
    first_name: $('#first_name').val(),
    last_name: $('#last_name').val(),
    address: $('#address').val(),
    city: $('#city').val(),
    state: $('#state').val(),
    postal_code: $('#postal_code').val(),
    phone: $('#phone').val(),
    product_name: $('#product_name').val(),
    amount: parseFloat($('#amount').val()) * usd_rate
  }

  $.post("https://cp.insideielts.com/ipayrp", data, (response) => {
    let response_data = JSON.parse(response)

    if(response_data.result == false) {
      if(response_data.ml == 1) {
        window.location.replace("/login.html")
      }
      else {
        $('#error_div').text(response_data.err)
        $('#error_div').show();
        $('#success_div').hide();
      }
    } else {
      //Show process payment button
      //Show the checkoutID
      $('#success_div').text(response_data.msg)
      $('#error_div').hide();
      $('#success_div').show();

      $('#submit_data_btn').hide();
      $('#pay_now_btn').show();

      $('#checkoutID').val(response_data.checkoutID);
      $('#signature').val(response_data.signature);
      $('#processForm').attr('action', 'https://payment.ipay88.co.id/PG/')
      // $('#processForm').attr('action', 'https://sandbox.ipay88.co.id/PG/')
    }
  })
}


//FOR Thank tou page redirection
if(product_name != null) {
  let url_pb = ''
  let product_text = ''
  switch (product_name) {
    // case 'product_1':
    //   url_pb = '/NS-INT1.html'
    //   product_text = 'NATIVE SPEAKER INTERVIEW SET #1: $13.95 (Rp. ' + parseFloat((13.95*usd_rate)) + ')'
    //   break;
    case 'product_2':
      url_pb = '/NS-INT2.html'
      product_text = 'NATIVE SPEAKER INTERVIEW SET #2: $2.95 (Rp. ' + parseFloat((2.95*usd_rate)) + ')'
      break;
    case 'product_3':
      url_pb = '/NS-INT3.html'
      product_text = 'NATIVE SPEAKER INTERVIEW SET #3: $2.95 (Rp. ' + parseFloat((2.95*usd_rate)) + ')'
      break;
    case 'int_1':
      url_pb = '/INT1.html'
      product_text = 'VIRTUAL EXAMINER RATED INTERVIEW #1: $7.95 (Rp. ' + parseFloat((7.95*usd_rate)) + ')'
      break;
    case 'int_2':
      url_pb = '/INT2.html'
      product_text = 'VIRTUAL EXAMINER RATED INTERVIEW #2: $9.95 (Rp. ' + parseFloat((9.95*usd_rate)) + ')'
      break;
    case 'int_3':
      url_pb = '/INT3.html'
      product_text = 'VIRTUAL EXAMINER RATED INTERVIEW #3: $9.95 (Rp. ' + parseFloat((9.95*usd_rate)) + ')'
      break;
    case 'int_4':
      url_pb = '/INT4.html'
      product_text = 'VIRTUAL EXAMINER RATED INTERVIEW #4: $9.95 (Rp. ' + parseFloat((9.95*usd_rate)) + ')'
      break;
    case 'int_5':
      url_pb = '/INT5.html'
      product_text = 'VIRTUAL EXAMINER RATED INTERVIEW #5: $9.95 (Rp. ' + parseFloat((9.95*usd_rate)) + ')'
      break;
    case 'int_6':
      url_pb = '/INT6.html'
      product_text = 'VIRTUAL EXAMINER RATED INTERVIEW #6: $9.95 (Rp. ' + parseFloat((9.95*usd_rate)) + ')'
      break;
    default:
      url_pb = '/Interviews.html'
  }

  $("#view_interview").attr('href', url_pb)
  $('#product_text').text('You are purchasing: ' + product_text)
}
