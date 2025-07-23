let upload_button = $('#upload_button')
let uploading_text = $('#uploading_text')
let recorded_audio = $('#recorded_audio')
let fd = new FormData()
let vid = document.getElementById('interview_video')
let record_div = $('#record-div')
let pause_div = $('#pause-div')


navigator.mediaDevices.getUserMedia({
    audio: true
  })
  .then(stream => {
    handlerFunction(stream)
  })

vid.onplay = function () {
  audioChunks = [];

  console.log(rec);

  if(typeof rec === 'undefined') {
    alert('Silakan muat ulang halaman dan aktifkan mikropon anda.') 
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
    audioChunks.push(e.data);
    if (rec.state == "inactive") {
      let blob = new Blob(audioChunks, {
        type: 'audio/mpeg-3'
      });
      recordedAudio.src = URL.createObjectURL(blob);
      recordedAudio.controls = true;
      // recordedAudio.autoplay = true;
      prepareData(blob)
    }
  }
}

function prepareData(audio) {
  upload_button.attr('style', 'visibility:visible')
  fd.append('audio_data', audio, 'recorded')
  fd.append('api_code', localStorage.getItem('api_code'))
  fd.append('interview_name', $('#product_name').val())
  // fd.append('interview_video_path', $($('#interview_video').find('source')[0]).attr('src'))
  fd.append('interview_video_path', $('#interview_video_mp3').val())
}

function sendData() {
  $.ajax({
    url: 'https://cp.insideielts.com/api/uploadaudio',
    type: 'POST',
    data: fd,
    processData: false,
    contentType: false,
    success: function(data) {
      data = JSON.parse(data)
      if(data.msg) {
        uploading_text.text(data.msg)
        $('#recordedAudio').attr('style', 'display:none')
      } else {
        uploading_text.text("Silakan muat ulang halaman dan coba lagi.") 
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


onAudioPlay = () => {
  $('#interview_audio')[0].play()
}

onAudioPause = () => {
  $('#interview_audio')[0].pause()
}
