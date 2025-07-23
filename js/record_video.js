let upload_button = $('#upload_button')
let uploading_text = $('#uploading_text')
let recorded_video = $('#recorded_video')
let fd = new FormData()
let vid = document.getElementById('interview_video')
let record_div = $('#record-div')
let pause_div = $('#pause-div')


navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true
  })
  .then(stream => {
    handlerFunction(stream)
  })

vid.onplay = function () {
  videoChunks = [];

  if(typeof rec === 'undefined') {
    alert('Please refresh the page and turn on your microphone and video.')
  } else {
    if (rec.state === "recording") {
      record_div.attr('style', 'visibility:hidden')
      pause_div.attr('style', 'visibility:visible')
      rec.pause();
    } else if (rec.state === "paused") {
      record_div.attr('style', 'visibility:visible')
      pause_div.attr('style', 'visibility:hidden')
      rec.resume();
    } else if (rec.state === "inactive") {
      record_div.attr('style', 'visibility:visible')
      pause_div.attr('style', 'visibility:hidden')
      rec.start();
    }
    return false;
  }

}

vid.onpause = function () {
  if (rec.state === "recording") {
    record_div.attr('style', 'visibility:hidden')
    pause_div.attr('style', 'visibility:visible')
    rec.pause();
  } else if (rec.state === "paused") {
    record_div.attr('style', 'visibility:visible')
    pause_div.attr('style', 'visibility:hidden')
    rec.resume();
  }
  return false;
}

vid.onended = function () {
  record_div.attr('style', 'display:none')
  pause_div.attr('style', 'display:none')
  rec.stop();
}


function handlerFunction(stream) {
  rec = new MediaRecorder(stream);
  rec.ondataavailable = e => {
    if(fd.get('video_data') == null) {
      videoChunks.push(e.data);
      if (rec.state == "inactive") {
        let blob = new Blob(videoChunks, {
          type: 'video/mp4'
        });
        recordedVideo.src = URL.createObjectURL(blob);
        recordedVideo.controls = true;
        // recordedVideo.autoplay = true;
        prepareData(blob)
      }
    }
  }
}

function prepareData(video) {
  upload_button.attr('style', 'visibility:visible')
  $('#recordedVideo').attr('style', 'display:block;')
  fd.append('video_data', video, 'recorded')
  fd.append('api_code', localStorage.getItem('api_code'))
  fd.append('qid', $('#qid').val())
}

function sendData() {
  $.ajax({
    url: 'https://cp.insideielts.com/api/uploadvideo',
    type: 'POST',
    data: fd,
    processData: false,
    contentType: false,
    success: function(data) {
      data = JSON.parse(data)
      if(data.msg) {
        uploading_text.text(data.msg)
        $('#recordedVideo').attr('style', 'display:none')
      } else {
        uploading_text.text("Please refresh the page and try again.")
      }
    }
  })
}

upload_button.click(e => {
  sendData()
  upload_button.attr('style', 'visibility:hidden')
  uploading_text.attr('style', 'display:block')
})

$('.list-item').attr('style', 'align-items:flex-start')



onVideoPlay = () => {
  $('#interview_video')[0].play()
}

onVideoPause = () => {
  $('#interview_video')[0].pause()
}
