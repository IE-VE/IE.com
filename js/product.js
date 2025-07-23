let vid_item_ml = $('.vid-item-ml')
let vid_item_mb = $('.vid-item-mb')

if(api_code) {
  let product_name = $('#product_name').val()
  let data = {
    api_code: api_code,
    product_name: product_name
  }
  $.post("https://cp.insideielts.com/api/checkbought", data, (response) => {
    let response_data = JSON.parse(response)

    if(response_data.result != true) {
      vid_item_mb.find('a').attr('href', 'Interviews.html?mb=1')
    }
  })


  //check already recorded
  let record_data = {
    api_code: api_code,
    product_name: product_name
  }
  $.post("https://cp.insideielts.com/api/checkrecord", record_data, (response) => {
    let response_data = JSON.parse(response)

    if(response_data.result == true) {
      $('.recorded_div').remove()
      $('.already_record_div').attr('style', 'display:block;')
    }
  })
} else {
  //Remove all href to oppyo
  vid_item_ml.find('a').attr('href', 'login.html?lf=1')
  vid_item_mb.find('a').attr('href', 'login.html?lf=1')

  vid_item_ml.find('a').removeAttr('target')
  vid_item_mb.find('a').removeAttr('target')
}
