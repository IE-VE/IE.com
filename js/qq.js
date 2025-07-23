getList = () => {
  console.log("here");
  $.post(
    "https://cp.insideielts.com/api/quickquestions/list",
    {},
    (response) => {
      let response_data = JSON.parse(response);

      if (response_data.result == true) {
        let data = response_data.data;
        let html = "";

        data.forEach((o, i) => {
          if ((i + 1) % 3 == 1) html += '<div class="QQ_row">';

          if (api_code) {
            html +=
              '<div class="QQ_link"><center><a class="link-home" href="QQ.html?qid=' +
              o.id +
              '" title="' +
              o.question +
              '">' +
              o.label +
              "</a></center></div>";
          } else {
            html +=
              '<div class="QQ_link"><center><a class="link-home" href="login.html" title="' +
              o.question +
              '">' +
              o.label +
              "</a></center></div>";
          }

          if ((i + 1) % 3 == 0 || i + 1 == data.length) html += "</div>";
        });

        $(".QQ_grid").append(html);
      }
    }
  );
};

getQuestion = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let qid = urlParams.get("qid");
  $("#qid").val(qid);
  let data = {
    id: qid,
  };
  $.post(
    "https://cp.insideielts.com/api/quickquestions/one",
    data,
    (response) => {
      let response_data = JSON.parse(response);

      if (response_data.result == true) {
        let question = response_data.quick_question;

        $("#title-bar").text(question.question);
        $("#interview_video").empty();
        $("#interview_video").append(
          '<source src="QQ_vid/' +
            question.video_file_name +
            "." +
            question.file_extension +
            '" type="video/mp4" /><source src="QQ_vid/' +
            question.video_file_name +
            "." +
            question.file_extension +
            '" type="video/ogg" />Your browser does not support HTML video.'
        );
      }
    }
  );
};
